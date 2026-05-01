import { revalidatePath } from "next/cache";

type ReviewStatus = "pending" | "approved" | "rejected";

type Review = {
  id: string;
  name: string;
  country: string | null;
  tour: string | null;
  rating: number;
  text: string;
  status: ReviewStatus;
  created_at: string;
};

const statuses: ReviewStatus[] = ["pending", "approved", "rejected"];

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

function isAdmin(token: string) {
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;
  return Boolean(adminToken) && token === adminToken;
}

async function loadReviews() {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      reviews: [] as Review[],
      error: "Supabase env vars are missing.",
    };
  }

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: "100",
  });

  const response = await fetch(`${config.supabaseUrl}/rest/v1/reviews?${params}`, {
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      reviews: [] as Review[],
      error: await response.text(),
    };
  }

  return {
    reviews: (await response.json()) as Review[],
    error: "",
  };
}

async function updateReview(formData: FormData) {
  "use server";

  const token = String(formData.get("token") ?? "");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!isAdmin(token) || !id || !statuses.includes(status as ReviewStatus)) {
    return;
  }

  const config = getSupabaseConfig();

  if (!config) {
    return;
  }

  await fetch(`${config.supabaseUrl}/rest/v1/reviews?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status,
      updated_at: new Date().toISOString(),
    }),
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

function statusClass(status: ReviewStatus) {
  const classes: Record<ReviewStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return classes[status];
}

type AdminReviewsPageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function AdminReviewsPage({
  searchParams,
}: AdminReviewsPageProps) {
  const params = await searchParams;
  const token = params?.token ?? "";
  const adminTokenConfigured = Boolean(process.env.ADMIN_ACCESS_TOKEN);
  const canView = isAdmin(token);
  const { reviews, error } = canView
    ? await loadReviews()
    : { reviews: [] as Review[], error: "" };

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Reviews</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Moderate traveler reviews before they appear on the public reviews page.
          </p>
        </div>

        {!adminTokenConfigured && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-5 text-yellow-900">
            Add <span className="font-semibold">ADMIN_ACCESS_TOKEN</span> to Vercel environment variables.
          </div>
        )}

        {adminTokenConfigured && !canView && (
          <div className="rounded-xl bg-white p-6 shadow-sm max-w-xl">
            <h2 className="text-xl font-bold mb-3">Admin access required</h2>
            <code className="block rounded-lg bg-gray-100 p-3 text-sm break-all">
              /admin/reviews?token=YOUR_ADMIN_ACCESS_TOKEN
            </code>
          </div>
        )}

        {canView && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold mt-2">
                  {reviews.filter((review) => review.status === "pending").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-3xl font-bold mt-2">
                  {reviews.filter((review) => review.status === "approved").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-3xl font-bold mt-2">
                  {reviews.filter((review) => review.status === "rejected").length}
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-700 mb-6">
                {error}
              </div>
            )}

            <div className="grid gap-5">
              {reviews.map((review) => (
                <article key={review.id} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-xl font-bold">{review.name}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(review.status)}`}>
                          {review.status}
                        </span>
                        <span className="text-green-700 font-semibold">
                          {"★★★★★".slice(0, review.rating)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {[review.country, review.tour].filter(Boolean).join(" • ")}
                      </p>
                      <p className="mt-4 text-gray-700 leading-relaxed">{review.text}</p>
                    </div>

                    <form action={updateReview} className="lg:w-64 space-y-3">
                      <input type="hidden" name="token" value={token} />
                      <input type="hidden" name="id" value={review.id} />
                      <select
                        name="status"
                        defaultValue={review.status}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black"
                      >
                        Save status
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
