import ReviewForm from "../components/ReviewForm";

type Review = {
  id: string;
  name: string;
  country: string | null;
  tour: string | null;
  rating: number;
  text: string;
  created_at: string;
};

async function loadReviews() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/reviews`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [] as Review[];
    }

    const data = (await response.json()) as { reviews?: Review[] };
    return data.reviews ?? [];
  } catch {
    return [] as Review[];
  }
}

function stars(rating: number) {
  return "★★★★★".slice(0, rating);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export default async function ReviewsPage() {
  const reviews = await loadReviews();

  return (
    <main className="bg-white pt-24">
      <section className="bg-gray-100 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Traveler Reviews</h1>
          <p className="text-gray-600 text-lg">
            Stories from guests who explored Kyrgyzstan with Journey Kyrgyzstan.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <article key={review.id} className="rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{review.name}</h2>
                    <p className="text-sm text-gray-500">
                      {[review.country, review.tour].filter(Boolean).join(" • ")}
                    </p>
                  </div>
                  <p className="text-green-700 font-semibold">{stars(review.rating)}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.text}</p>
                <p className="text-xs text-gray-400 mt-4">{formatDate(review.created_at)}</p>
              </article>
            ))
          ) : (
            <div className="md:col-span-2 rounded-xl bg-gray-100 p-6 text-gray-600">
              Reviews will appear here after approval.
            </div>
          )}
        </div>
      </section>

      <section className="py-16 max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Write a review</h2>
          <p className="text-gray-600">
            Share a few words about your trip. New reviews are checked before publishing.
          </p>
        </div>
        <ReviewForm />
      </section>
    </main>
  );
}
