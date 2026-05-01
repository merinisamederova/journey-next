import { NextResponse } from "next/server";
import { getAvailability } from "../../data/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tourSlug = searchParams.get("tourSlug");

  if (!tourSlug) {
    return NextResponse.json(
      { error: "tourSlug is required." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    slots: getAvailability(tourSlug),
  });
}
