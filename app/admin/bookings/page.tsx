import { revalidatePath } from "next/cache";

type BookingStatus =
  | "new"
  | "contacted"
  | "waiting_payment"
  | "confirmed"
  | "cancelled"
  | "completed";

type Booking = {
  id: string;
  tour: string;
  tour_slug: string | null;
  name: string;
  contact: string;
  preferred_date: string | null;
  people: number | null;
  message: string | null;
  status: BookingStatus;
  manager_notes?: string | null;
  source: string;
  created_at: string;
};

const statuses: BookingStatus[] = [
  "new",
  "contacted",
  "waiting_payment",
  "confirmed",
  "cancelled",
  "completed",
];

function getSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
}

function isAdmin(token: string) {
  const adminToken = process.env.ADMIN_ACCESS_TOKEN;
  return Boolean(adminToken) && token === adminToken;
}

async function loadBookings() {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      bookings: [] as Booking[],
      error: "Supabase env vars are missing.",
    };
  }

  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: "100",
  });

  const response = await fetch(`${config.supabaseUrl}/rest/v1/bookings?${params}`, {
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      bookings: [] as Booking[],
      error: await response.text(),
    };
  }

  return {
    bookings: (await response.json()) as Booking[],
    error: "",
  };
}

async function updateBooking(formData: FormData) {
  "use server";

  const token = String(formData.get("token") ?? "");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const managerNotes = String(formData.get("manager_notes") ?? "").trim();

  if (!isAdmin(token) || !id || !statuses.includes(status as BookingStatus)) {
    return;
  }

  const config = getSupabaseConfig();

  if (!config) {
    return;
  }

  await fetch(`${config.supabaseUrl}/rest/v1/bookings?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      apikey: config.supabaseServiceRoleKey,
      Authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      status,
      manager_notes: managerNotes || null,
      updated_at: new Date().toISOString(),
    }),
  });

  revalidatePath("/admin/bookings");
}

function formatDate(date: string | null) {
  if (!date) {
    return "Flexible";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatCreatedAt(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

function statusClass(status: BookingStatus) {
  const classes: Record<BookingStatus, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    waiting_payment: "bg-orange-100 text-orange-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-gray-200 text-gray-800",
  };

  return classes[status];
}

type AdminBookingsPageProps = {
  searchParams?: Promise<{
    token?: string;
  }>;
};

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const params = await searchParams;
  const token = params?.token ?? "";
  const adminTokenConfigured = Boolean(process.env.ADMIN_ACCESS_TOKEN);
  const canView = isAdmin(token);
  const { bookings, error } = canView
    ? await loadBookings()
    : { bookings: [] as Booking[], error: "" };

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Bookings</h1>
          <p className="text-gray-600 mt-3 max-w-3xl">
            View tour requests, open WhatsApp, update status and keep manager
            notes.
          </p>
        </div>

        {!adminTokenConfigured && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-5 text-yellow-900">
            Add <span className="font-semibold">ADMIN_ACCESS_TOKEN</span> to
            Vercel environment variables, then redeploy.
          </div>
        )}

        {adminTokenConfigured && !canView && (
          <div className="rounded-xl bg-white p-6 shadow-sm max-w-xl">
            <h2 className="text-xl font-bold mb-3">Admin access required</h2>
            <p className="text-gray-600 mb-4">
              Open this page with your admin token:
            </p>
            <code className="block rounded-lg bg-gray-100 p-3 text-sm break-all">
              /admin/bookings?token=YOUR_ADMIN_ACCESS_TOKEN
            </code>
          </div>
        )}

        {canView && (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Total requests</p>
                <p className="text-3xl font-bold mt-2">{bookings.length}</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">New</p>
                <p className="text-3xl font-bold mt-2">
                  {bookings.filter((booking) => booking.status === "new").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-3xl font-bold mt-2">
                  {bookings.filter((booking) => booking.status === "confirmed").length}
                </p>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-5 text-red-700 mb-6">
                {error}
              </div>
            )}

            <div className="grid gap-5">
              {bookings.map((booking) => (
                <article key={booking.id} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h2 className="text-xl font-bold">{booking.name}</h2>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(booking.status)}`}>
                          {booking.status.replace("_", " ")}
                        </span>
                      </div>

                      <p className="font-semibold text-gray-900">{booking.tour}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created {formatCreatedAt(booking.created_at)}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                        <p>
                          <span className="text-gray-500">Contact:</span>{" "}
                          <span className="font-medium">{booking.contact}</span>
                        </p>
                        <p>
                          <span className="text-gray-500">Date:</span>{" "}
                          <span className="font-medium">{formatDate(booking.preferred_date)}</span>
                        </p>
                        <p>
                          <span className="text-gray-500">People:</span>{" "}
                          <span className="font-medium">{booking.people ?? "Not specified"}</span>
                        </p>
                        <p>
                          <span className="text-gray-500">Source:</span>{" "}
                          <span className="font-medium">{booking.source}</span>
                        </p>
                      </div>

                      {booking.message && (
                        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
                          {booking.message}
                        </p>
                      )}
                    </div>

                    <div className="lg:w-80">
                      <a
                        href={`https://wa.me/${booking.contact.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-green-700"
                      >
                        Open WhatsApp
                      </a>

                      <form action={updateBooking} className="mt-4 space-y-3">
                        <input type="hidden" name="token" value={token} />
                        <input type="hidden" name="id" value={booking.id} />

                        <label className="block text-sm font-medium text-gray-700">
                          Status
                          <select
                            name="status"
                            defaultValue={booking.status}
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status.replace("_", " ")}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="block text-sm font-medium text-gray-700">
                          Manager notes
                          <textarea
                            name="manager_notes"
                            defaultValue={booking.manager_notes ?? ""}
                            rows={3}
                            className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
                            placeholder="Internal note"
                          />
                        </label>

                        <button
                          type="submit"
                          className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black"
                        >
                          Save changes
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}

              {bookings.length === 0 && !error && (
                <div className="rounded-xl bg-white p-6 shadow-sm text-gray-600">
                  No bookings yet.
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
