"use client";

import { useEffect, useState } from "react";

type AvailabilityStatus = "available" | "limited" | "sold_out";

type AvailabilitySlot = {
  date: string;
  seats: number;
  status: AvailabilityStatus;
};

type AvailabilityCalendarProps = {
  tourSlug: string;
};

const statusLabels: Record<AvailabilityStatus, string> = {
  available: "Available",
  limited: "Limited",
  sold_out: "Sold out",
};

const statusClasses: Record<AvailabilityStatus, string> = {
  available: "bg-green-100 text-green-800",
  limited: "bg-yellow-100 text-yellow-800",
  sold_out: "bg-red-100 text-red-800",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function AvailabilityCalendar({ tourSlug }: AvailabilityCalendarProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadAvailability() {
      setLoading(true);
      const response = await fetch(`/api/availability?tourSlug=${tourSlug}`);
      const data = (await response.json()) as { slots?: AvailabilitySlot[] };

      if (active) {
        setSlots(data.slots ?? []);
        setLoading(false);
      }
    }

    loadAvailability();

    return () => {
      active = false;
    };
  }, [tourSlug]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Availability calendar
          </h2>
          <p className="text-gray-600">
            Pick one of the upcoming dates or request your own private date in the booking form.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="rounded-xl bg-gray-100 p-5 text-gray-600">
              Loading dates...
            </div>
          ) : slots.length > 0 ? (
            slots.map((slot) => (
              <div key={slot.date} className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{formatDate(slot.date)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {slot.seats > 0 ? `${slot.seats} seats left` : "No seats left"}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[slot.status]}`}
                  >
                    {statusLabels[slot.status]}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-gray-100 p-5 text-gray-600">
              Dates are flexible. Send a request and we will confirm availability.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
