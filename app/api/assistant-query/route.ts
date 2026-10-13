import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "../../lib/rateLimit";

type AssistantQueryRequest = {
  query?: string;
  page?: string;
};

function clean(value: unknown, maxLength = 300) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeQuery(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 300);
}

function detectLanguage(value: string) {
  return /[А-Яа-яЁё]/.test(value) ? "ru" : "en";
}

async function saveAssistantQuery({
  query,
  normalizedQuery,
  language,
  page,
}: {
  query: string;
  normalizedQuery: string;
  language: string;
  page: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return {
      status: "not_configured",
    };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/assistant_queries`, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      query,
      normalized_query: normalizedQuery,
      language,
      page: page || null,
    }),
  });

  if (!response.ok) {
    return {
      status: "failed",
      error: await response.text(),
    };
  }

  return {
    status: "saved",
  };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(`assistant-query:${ip}`, 60, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: true, status: "rate_limited" });
  }

  let body: AssistantQueryRequest;

  try {
    body = (await request.json()) as AssistantQueryRequest;
  } catch {
    return NextResponse.json({ ok: true, status: "invalid_body" });
  }

  const query = clean(body.query);
  const normalizedQuery = normalizeQuery(query);
  const page = clean(body.page, 120);

  if (!query || normalizedQuery.length < 2) {
    return NextResponse.json({ ok: true, status: "empty" });
  }

  const storage = await saveAssistantQuery({
    query,
    normalizedQuery,
    language: detectLanguage(query),
    page,
  });

  if (storage.status === "failed") {
    console.warn("Could not save assistant query", storage);
  }

  return NextResponse.json({ ok: true, storage });
}
