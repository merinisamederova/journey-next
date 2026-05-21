import { redirect } from "next/navigation";
import {
  createAdminSession,
  hasAdminSession,
  isAdminAuthConfigured,
  isAdminPassword,
} from "../../lib/adminAuth";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
};

function safeNext(value: string | undefined) {
  if (!value || !value.startsWith("/admin") || value.startsWith("/admin/login")) {
    return "/admin/tours";
  }

  return value;
}

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  const next = safeNext(String(formData.get("next") ?? ""));

  if (!isAdminPassword(password)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  await createAdminSession();
  redirect(next);
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const next = safeNext(params?.next);

  if (await hasAdminSession()) {
    redirect(next);
  }

  return (
    <main className="min-h-screen bg-gray-100 pt-24">
      <section className="max-w-md mx-auto px-6 py-12">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Admin
          </p>
          <h1 className="text-3xl font-bold mt-2">Log in</h1>
          <p className="text-gray-600 mt-3">
            Enter the admin password to manage bookings, reviews and availability.
          </p>

          {!isAdminAuthConfigured() && (
            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
              Add <span className="font-semibold">ADMIN_PASSWORD</span> in Vercel
              environment variables, then redeploy.
            </div>
          )}

          {params?.error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Wrong password. Please try again.
            </div>
          )}

          <form action={login} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                name="password"
                type="password"
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
                placeholder="Admin password"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={!isAdminAuthConfigured()}
            >
              Log in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
