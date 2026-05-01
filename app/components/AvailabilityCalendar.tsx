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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

function buildMonthDays(key: string) {
  const [year, month] = key.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingEmptyDays = firstDay.getDay();
  const cells: Array<Date | null> = Array.from({ length: leadingEmptyDays }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month - 1, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
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

  const slotsByDate = new Map(slots.map((slot) => [slot.date, slot]));
  const monthKeys = Array.from(
    new Set(slots.map((slot) => monthKey(new Date(`${slot.date}T00:00:00`)))),
  ).sort();
  const visibleMonths = monthKeys.length > 0 ? monthKeys : [monthKey(new Date())];

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

        <div className="grid lg:grid-cols-2 gap-6">
          {loading ? (
            <div className="rounded-xl bg-gray-100 p-5 text-gray-600">
              Loading dates...
            </div>
          ) : slots.length > 0 ? (
            visibleMonths.map((key) => (
              <div key={key} className="rounded-xl border border-gray-200 p-4 md:p-5">
                <h3 className="text-lg font-bold mb-4">{monthLabel(key)}</h3>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-500 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {buildMonthDays(key).map((day, index) => {
                    if (!day) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const slot = slotsByDate.get(dateKey(day));
                    const isAvailable = slot?.status === "available";
                    const isLimited = slot?.status === "limited";
                    const isSoldOut = slot?.status === "sold_out";

                    return (
                      <div
                        key={dateKey(day)}
                        className={`aspect-square rounded-lg border flex flex-col items-center justify-center text-sm transition ${
                          isAvailable
                            ? "border-green-300 bg-green-100 text-green-900"
                            : isLimited
                              ? "border-yellow-300 bg-yellow-100 text-yellow-900"
                              : isSoldOut
                                ? "border-red-300 bg-red-100 text-red-900"
                                : "border-gray-100 bg-gray-50 text-gray-400"
                        }`}
                        title={slot ? `${formatDate(slot.date)} - ${statusLabels[slot.status]}` : ""}
                      >
                        <span className="font-bold">{day.getDate()}</span>
                        {slot && (
                          <span className="hidden sm:block text-[10px] leading-tight">
                            {slot.seats > 0 ? `${slot.seats} seats` : "full"}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-gray-100 p-5 text-gray-600">
              Dates are flexible. Send a request and we will confirm availability.
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-6 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-400" />
            Available
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            Limited
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            Sold out
          </span>
        </div>
      </div>
    </section>
  );
}
