import { NextResponse } from "next/server";

type ReviewRequest = {
  name?: string;
  country?: string;
  tour?: string;
  rating?: string | number;
  text?: string;
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({
      source: "local",
      reviews: [
        {
          id: "demo-1",
          name: "Zainab",
          country: "UAE",
          tour: "Private Kyrgyzstan Trip",
          rating: 5,
          text: "A wonderful trip with kind guides, beautiful places and very smooth planning.",
          created_at: new Date().toISOString(),
        },
      ],
    });
  }

  const params = new URLSearchParams({
    select: "id,name,country,tour,rating,text,created_at",
    status: "eq.approved",
    order: "created_at.desc",
    limit: "50",
  });

  const response = await fetch(`${config.supabaseUrl}/rest/v1/reviews?${params}`, {
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not load reviews.", details: await response.text() },
      { status: 500 },
    );
  }

  return NextResponse.json({
    source: "supabase",
    reviews: await response.json(),
  });
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json(
      { error: "Review storage is not configured." },
      { status: 503 },
    );
  }

  const body = (await request.json()) as ReviewRequest;
  const name = clean(body.name, 100);
  const country = clean(body.country, 100);
  const tour = clean(body.tour, 150);
  const text = clean(body.text, 1200);
  const rating = Number(body.rating ?? 5);

  if (!name || !text || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Name, review text and rating from 1 to 5 are required." },
      { status: 400 },
    );
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/reviews`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name,
      country: country || null,
      tour: tour || null,
      rating,
      text,
      status: "pending",
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not save review.", details: await response.text() },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: "pending",
  });
}
