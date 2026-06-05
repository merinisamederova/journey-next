import type { TourContent, TourDay } from "../data/tours";

type SupabaseTour = {
  slug: string;
  title: string;
  subtitle: string;
  hero_image: string;
  map_query: string | null;
  about: unknown;
  highlights: unknown;
  days: unknown;
  activities: unknown;
  services: unknown;
  note: string | null;
  status: "draft" | "published";
  created_at: string;
};

export type AdminTour = TourContent & {
  status: "draft" | "published";
  createdAt: string;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

function arrayOfStrings(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function arrayOfDays(value: unknown): TourDay[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((day) => {
      if (!day || typeof day !== "object") {
        return null;
      }

      const item = day as Record<string, unknown>;
      const title = typeof item.title === "string" ? item.title.trim() : "";
      const image = typeof item.image === "string" && item.image.trim() ? item.image.trim() : "/2.jpg";
      const points = arrayOfStrings(item.points);

      if (!title || points.length === 0) {
        return null;
      }

      return { title, image, points };
    })
    .filter((day): day is TourDay => Boolean(day));
}

function toTour(row: SupabaseTour): AdminTour {
  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    heroImage: row.hero_image || "/2.jpg",
    mapQuery: row.map_query ?? undefined,
    about: arrayOfStrings(row.about),
    highlights: arrayOfStrings(row.highlights),
    days: arrayOfDays(row.days),
    activities: arrayOfStrings(row.activities),
    services: arrayOfStrings(row.services),
    note: row.note ?? undefined,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function isTourStorageConfigured() {
  return Boolean(getSupabaseConfig());
}

export async function loadAdminTours() {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      tours: [] as AdminTour[],
      error: "Supabase env vars are missing.",
    };
  }

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
  });

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/tours?${params}`, {
      headers: {
        apikey: config.supabaseServiceRoleKey,
        Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        tours: [] as AdminTour[],
        error: await response.text(),
      };
    }

    return {
      tours: ((await response.json()) as SupabaseTour[]).map(toTour),
      error: "",
    };
  } catch (error) {
    return {
      tours: [] as AdminTour[],
      error: error instanceof Error ? error.message : "Could not load tours.",
    };
  }
}

export async function loadPublishedTours() {
  const config = getSupabaseConfig();

  if (!config) {
    return [] as TourContent[];
  }

  const params = new URLSearchParams({
    select: "*",
    status: "eq.published",
    order: "created_at.desc",
  });

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/tours?${params}`, {
      headers: {
        apikey: config.supabaseServiceRoleKey,
        Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    return ((await response.json()) as SupabaseTour[]).map(toTour);
  } catch {
    return [];
  }
}

export async function loadPublishedTour(slug: string) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    select: "*",
    slug: `eq.${slug}`,
    status: "eq.published",
    limit: "1",
  });

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/tours?${params}`, {
      headers: {
        apikey: config.supabaseServiceRoleKey,
        Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const rows = (await response.json()) as SupabaseTour[];
    return rows[0] ? toTour(rows[0]) : null;
  } catch {
    return null;
  }
}
