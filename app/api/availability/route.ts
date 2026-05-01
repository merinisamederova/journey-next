import { NextResponse } from "next/server";
import { getAvailability } from "../../data/availability";

type SupabaseAvailabilityRow = {
  tour_slug: string;
  date: string;
  seats: number;
  status: "available" | "limited" | "sold_out";
};

async function getSupabaseAvailability(tourSlug: string) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  const params = new URLSearchParams({
    select: "tour_slug,date,seats,status",
    tour_slug: `eq.${tourSlug}`,
    order: "date.asc",
  });

  const response = await fetch(`${supabaseUrl}/rest/v1/availability?${params}`, {
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = (await response.json()) as SupabaseAvailabilityRow[];

  return rows.map((row) => ({
    tourSlug: row.tour_slug,
    date: row.date,
    seats: row.seats,
    status: row.status,
  }));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tourSlug = searchParams.get("tourSlug");

  if (!tourSlug) {
    return NextResponse.json(
      { error: "tourSlug is required." },
      { status: 400 },
    );
  }

  try {
    const supabaseSlots = await getSupabaseAvailability(tourSlug);

    return NextResponse.json({
      source: supabaseSlots ? "supabase" : "local",
      slots: supabaseSlots ?? getAvailability(tourSlug),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not load availability from Supabase.",
        details: error instanceof Error ? error.message : "Unknown error",
        slots: getAvailability(tourSlug),
        source: "local_fallback",
      },
      { status: 200 },
    );
  }
}
