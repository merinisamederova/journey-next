import AdminNav from "./AdminNav";
import { requireAdmin } from "../lib/adminAuth";
import { tours } from "../data/tours";
import { availabilitySlots } from "../data/availability";

const adminSections = [
  {
    href: "/admin/tours",
    title: "Tours",
    description: "Review tour pages, structured tour data and public routes.",
  },
  {
    href: "/admin/bookings",
    title: "Bookings",
    description: "Manage customer requests, statuses, notes and WhatsApp contact.",
  },
  {
    href: "/admin/availability",
    title: "Availability",
    description: "Check configured tour dates and database connection status.",
  },
  {
    href: "/admin/reviews",
    title: "Reviews",
    description: "Moderate traveler reviews before they appear on the website.",
  },
];

export default async function AdminDashboardPage() {
  await requireAdmin();

  const hasSupabase =
    Boolean(process.env.SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">Dashboard</h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            Internal control panel for managing tour content, booking requests,
            availability and customer reviews.
          </p>
        </div>

        <AdminNav current="/admin" />

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Structured tours</p>
            <p className="mt-2 text-3xl font-bold">{tours.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Demo dates</p>
            <p className="mt-2 text-3xl font-bold">{availabilitySlots.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Database</p>
            <p
              className={`mt-3 text-xl font-bold ${
                hasSupabase ? "text-green-700" : "text-yellow-700"
              }`}
            >
              {hasSupabase ? "Supabase connected" : "Supabase not configured"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {adminSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="text-xl font-bold">{section.title}</h2>
              <p className="mt-2 text-gray-600">{section.description}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
