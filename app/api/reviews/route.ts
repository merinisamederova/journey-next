import { NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "../../lib/rateLimit";
import { getReviewStorageConfig, loadApprovedReviews } from "../../lib/reviewStorage";

type ReviewRequest = {
  name?: string;
  country?: string;
  tour?: string;
  rating?: string | number;
  text?: string;
  website?: string;
};

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function GET() {
  try {
    return NextResponse.json(await loadApprovedReviews());
  } catch (error) {
    console.error("Could not load reviews API", error);
    return NextResponse.json(
      { error: "Could not load reviews." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const config = getReviewStorageConfig();
  const ip = getClientIp(request);

  if (!config) {
    return NextResponse.json(
      { error: "Review storage is not configured." },
      { status: 503 },
    );
  }

  if (isRateLimited(`review:${ip}`, 3, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many review submissions. Please try again later." },
      { status: 429 },
    );
  }

  let body: ReviewRequest;

  try {
    body = (await request.json()) as ReviewRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (clean(body.website)) {
    return NextResponse.json({ ok: true, status: "pending" });
  }

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
