import AdminNav from "../AdminNav";
import { requireAdmin } from "../../lib/adminAuth";

type AssistantQuery = {
  id: string;
  query: string;
  normalized_query: string;
  language: string | null;
  page: string | null;
  created_at: string;
};

type PopularQuery = {
  query: string;
  normalizedQuery: string;
  count: number;
  language: string;
  lastAskedAt: string;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

async function loadAssistantQueries() {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      queries: [] as AssistantQuery[],
      error: "Supabase env vars are missing.",
    };
  }

  const params = new URLSearchParams({
    select: "id,query,normalized_query,language,page,created_at",
    order: "created_at.desc",
    limit: "1000",
  });

  const response = await fetch(`${config.supabaseUrl}/rest/v1/assistant_queries?${params}`, {
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      queries: [] as AssistantQuery[],
      error: await response.text(),
    };
  }

  return {
    queries: (await response.json()) as AssistantQuery[],
    error: "",
  };
}

function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function buildPopularQueries(queries: AssistantQuery[]) {
  const grouped = new Map<string, PopularQuery>();

  for (const query of queries) {
    const key = query.normalized_query || query.query.toLowerCase();
    const current = grouped.get(key);

    if (!current) {
      grouped.set(key, {
        query: query.query,
        normalizedQuery: key,
        count: 1,
        language: query.language ?? "unknown",
        lastAskedAt: query.created_at,
      });
      continue;
    }

    current.count += 1;

    if (new Date(query.created_at) > new Date(current.lastAskedAt)) {
      current.query = query.query;
      current.lastAskedAt = query.created_at;
      current.language = query.language ?? current.language;
    }
  }

  return Array.from(grouped.values()).sort((left, right) => {
    if (right.count !== left.count) {
      return right.count - left.count;
    }

    return new Date(right.lastAskedAt).getTime() - new Date(left.lastAskedAt).getTime();
  });
}

function languageLabel(language: string | null) {
  const labels: Record<string, string> = {
    en: "English",
    ru: "Russian",
    unknown: "Unknown",
  };

  return labels[language ?? "unknown"] ?? language;
}

export default async function AdminAssistantPage() {
  await requireAdmin();
  const { queries, error } = await loadAssistantQueries();
  const popularQueries = buildPopularQueries(queries);
  const russianQueries = queries.filter((query) => query.language === "ru").length;
  const englishQueries = queries.filter((query) => query.language === "en").length;

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Assistant Requests</h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            See what travelers ask the AI assistant most often, spot missing topics
            and improve tour content around real questions.
          </p>
        </div>

        <AdminNav current="/admin/assistant" />

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tracked questions</p>
            <p className="mt-2 text-3xl font-bold">{queries.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Unique questions</p>
            <p className="mt-2 text-3xl font-bold">{popularQueries.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Russian</p>
            <p className="mt-2 text-3xl font-bold">{russianQueries}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">English</p>
            <p className="mt-2 text-3xl font-bold">{englishQueries}</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
            <p className="mt-2 text-sm">
              Make sure the <code>assistant_queries</code> table exists in Supabase.
            </p>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <section className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Popular questions</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Grouped by normalized wording from the last 1000 assistant questions.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="py-3 pr-4">Question</th>
                    <th className="py-3 pr-4">Count</th>
                    <th className="py-3 pr-4">Language</th>
                    <th className="py-3">Last asked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {popularQueries.slice(0, 50).map((query) => (
                    <tr key={query.normalizedQuery}>
                      <td className="py-4 pr-4 font-medium text-gray-900">{query.query}</td>
                      <td className="py-4 pr-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          {query.count}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-gray-600">
                        {languageLabel(query.language)}
                      </td>
                      <td className="py-4 text-gray-600">{formatCreatedAt(query.lastAskedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {popularQueries.length === 0 && !error && (
              <div className="rounded-xl bg-gray-50 p-6 text-gray-600">
                No assistant questions have been tracked yet.
              </div>
            )}
          </section>

          <section className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Recent questions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest raw requests sent by visitors.
            </p>

            <div className="mt-5 space-y-3">
              {queries.slice(0, 25).map((query) => (
                <article key={query.id} className="rounded-lg border border-gray-200 p-4">
                  <p className="font-medium text-gray-900">{query.query}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>{formatCreatedAt(query.created_at)}</span>
                    <span>•</span>
                    <span>{languageLabel(query.language)}</span>
                    {query.page && (
                      <>
                        <span>•</span>
                        <span>{query.page}</span>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {queries.length === 0 && !error && (
              <div className="mt-5 rounded-xl bg-gray-50 p-6 text-gray-600">
                No recent assistant questions yet.
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
