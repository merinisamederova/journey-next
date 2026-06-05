import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AdminNav from "../../AdminNav";
import { hasAdminSession, requireAdmin } from "../../../lib/adminAuth";
import { isTourStorageConfigured } from "../../../lib/tourStorage";
import { tours as existingTours } from "../../../data/tours";

type TourStatus = "draft" | "published";

const defaultHeroImage = "/2.jpg";
const reservedTourSlugs = new Set([
  ...existingTours.map((tour) => tour.slug),
  "14-days-kyrgyzstan",
  "summits-of-kyrgyzstan",
]);

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

function clean(value: FormDataEntryValue | null, maxLength = 1000) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function lines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function commaList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function createTour(formData: FormData) {
  "use server";

  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const title = clean(formData.get("title"), 160);
  const slug = slugify(clean(formData.get("slug"), 120) || title);
  const subtitle = clean(formData.get("subtitle"), 500);
  const heroImage = clean(formData.get("hero_image"), 300) || defaultHeroImage;
  const mapQuery = clean(formData.get("map_query"), 300);
  const about = lines(clean(formData.get("about"), 2500));
  const highlights = lines(clean(formData.get("highlights"), 1500));
  const activities = commaList(clean(formData.get("activities"), 1000));
  const services = commaList(clean(formData.get("services"), 1000));
  const note = clean(formData.get("note"), 800);
  const status = clean(formData.get("status"), 20) as TourStatus;

  const days = [1, 2, 3, 4, 5]
    .map((index) => {
      const dayTitle = clean(formData.get(`day_${index}_title`), 160);
      const dayImage = clean(formData.get(`day_${index}_image`), 300) || heroImage;
      const points = lines(clean(formData.get(`day_${index}_points`), 2000));

      if (!dayTitle || points.length === 0) {
        return null;
      }

      return {
        title: dayTitle,
        image: dayImage,
        points,
      };
    })
    .filter(Boolean);

  if (!title || !slug || !subtitle || about.length === 0 || days.length === 0) {
    redirect("/admin/tours/new?error=missing");
  }

  if (reservedTourSlugs.has(slug)) {
    redirect("/admin/tours/new?error=reserved");
  }

  const config = getSupabaseConfig();

  if (!config) {
    redirect("/admin/tours/new?error=supabase");
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/tours`, {
    method: "POST",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      title,
      slug,
      subtitle,
      hero_image: heroImage,
      map_query: mapQuery || null,
      about,
      highlights,
      days,
      activities,
      services,
      note: note || null,
      status: status === "published" ? "published" : "draft",
      updated_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    redirect(`/admin/tours/new?error=${response.status === 409 ? "duplicate" : "save"}`);
  }

  revalidatePath("/admin/tours");
  revalidatePath("/tours");
  revalidatePath(`/tours/${slug}`);
  redirect("/admin/tours?created=1");
}

type NewTourPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function errorMessage(error: string | undefined) {
  const messages: Record<string, string> = {
    missing: "Title, slug, subtitle, overview and at least one day are required.",
    supabase: "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    duplicate: "A tour with this slug already exists. Choose a different slug.",
    reserved: "This slug is already used by an existing tour page. Choose a different slug.",
    save: "The tour could not be saved. Check the tours table in Supabase.",
  };

  return error ? messages[error] ?? messages.save : "";
}

export default async function NewTourPage({ searchParams }: NewTourPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const error = errorMessage(params?.error);

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Create tour</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Fill in the tour template. If an image field is empty, the page will
            reuse the hero image or the default tour photo.
          </p>
        </div>

        <AdminNav current="/admin/tours" />

        {!isTourStorageConfigured() && (
          <div className="mb-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-900">
            Supabase is not configured, so new tours cannot be saved yet. Run
            <span className="font-semibold"> supabase/tours.sql</span> and add
            the Supabase environment variables.
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <form action={createTour} className="space-y-6">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Main information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
                <input
                  name="title"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Ala-Archa Day Tour"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Slug
                <input
                  name="slug"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="ala-archa-day-tour"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Short description
              <textarea
                name="subtitle"
                required
                rows={3}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="A short 3-4 sentence description for the top of the tour page."
              />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Hero image path or URL
                <input
                  name="hero_image"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="/2.jpg"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Google Maps query
                <input
                  name="map_query"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Ala-Archa National Park, Kyrgyzstan"
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Content</h2>
            <label className="block text-sm font-medium text-gray-700">
              Overview paragraphs
              <textarea
                name="about"
                required
                rows={5}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={"One paragraph per line.\nThe second paragraph can include price or included services."}
              />
            </label>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Highlights
              <textarea
                name="highlights"
                rows={4}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder={"One highlight per line.\nPrivate transport from Bishkek\nLocal guide\nMountain views"}
              />
            </label>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Itinerary</h2>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((index) => (
                <fieldset key={index} className="rounded-lg border border-gray-200 p-4">
                  <legend className="px-2 text-sm font-semibold text-gray-700">
                    Day or step {index}
                  </legend>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                      <input
                        name={`day_${index}_title`}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder={`Day ${index} - Route title`}
                      />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                      Image path or URL
                      <input
                        name={`day_${index}_image`}
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                        placeholder="/3.jpg"
                      />
                    </label>
                  </div>

                  <label className="mt-4 block text-sm font-medium text-gray-700">
                    Points
                    <textarea
                      name={`day_${index}_points`}
                      rows={4}
                      className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                      placeholder={"One point per line.\nMorning departure from Bishkek.\nScenic stops and lunch.\nReturn or overnight stay."}
                    />
                  </label>
                </fieldset>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Services and publishing</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-medium text-gray-700">
                Activities
                <input
                  name="activities"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Hiking, Culture, Mountain Views"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Services
                <input
                  name="services"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                  placeholder="Guide, Driver, Gas, Lunch"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-medium text-gray-700">
              Note
              <textarea
                name="note"
                rows={3}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Optional internal or public note about price, season or included services."
              />
            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <label className="block text-sm font-medium text-gray-700">
                Status
                <select
                  name="status"
                  defaultValue="draft"
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>

              <button
                type="submit"
                className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Save tour
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
