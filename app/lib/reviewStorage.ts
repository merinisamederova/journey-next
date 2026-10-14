export type Review = {
  id: string;
  name: string;
  country: string | null;
  tour: string | null;
  rating: number;
  text: string;
  created_at: string;
};

export function getReviewStorageConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

// Only call from server components and route handlers: credentials stay on the server.
export async function loadApprovedReviews(): Promise<{
  source: "local" | "supabase";
  reviews: Review[];
}> {
  const config = getReviewStorageConfig();

  if (!config) {
    return {
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
    };
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
    throw new Error(`Could not load approved reviews (HTTP ${response.status}).`);
  }

  return {
    source: "supabase",
    reviews: (await response.json()) as Review[],
  };
}
