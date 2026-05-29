import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/availability", label: "Availability" },
  { href: "/admin/reviews", label: "Reviews" },
];

type AdminNavProps = {
  current?: string;
};

export default function AdminNav({ current }: AdminNavProps) {
  return (
    <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <nav className="flex flex-wrap gap-2">
          {adminLinks.map((link) => {
            const isActive = current === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <a
          href="/admin/logout"
          className="text-sm font-semibold text-gray-600 hover:text-black"
        >
          Log out
        </a>
      </div>
    </div>
  );
}
