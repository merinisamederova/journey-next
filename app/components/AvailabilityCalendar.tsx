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

const tourDurations: Record<string, number> = {
  "issyk-kul-3-days": 3,
  "kel-suu": 3,
  "song-kul": 4,
  "song-kul-chon-kemin": 3,
  "14-days-kyrgyzstan": 14,
  "summits-of-kyrgyzstan": 3,
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

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function getConsecutiveDateKeys(startDate: string, days: number) {
  const start = new Date(`${startDate}T00:00:00`);

  return Array.from({ length: days }, (_, index) => dateKey(addDays(start, index)));
}

function januaryAfter(date: Date) {
  const year = date.getMonth() === 0 ? date.getFullYear() : date.getFullYear() + 1;
  return new Date(year, 0, 1);
}

function buildMonthRange(startKey: string, endKey: string) {
  const [startYear, startMonth] = startKey.split("-").map(Number);
  const [endYear, endMonth] = endKey.split("-").map(Number);
  const months: string[] = [];
  let cursor = new Date(startYear, startMonth - 1, 1);
  const end = new Date(endYear, endMonth - 1, 1);

  while (cursor <= end) {
    months.push(monthKey(cursor));
    cursor = addMonths(cursor, 1);
  }

  return months;
}

export default function AvailabilityCalendar({ tourSlug }: AvailabilityCalendarProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(monthKey(new Date()));
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAvailability() {
      setLoading(true);
      const response = await fetch(`/api/availability?tourSlug=${tourSlug}`);
      const data = (await response.json()) as { slots?: AvailabilitySlot[] };

      if (active) {
        const nextSlots = data.slots ?? [];
        setSlots(nextSlots);
        if (nextSlots.length > 0) {
          setCurrentMonth(monthKey(new Date(`${nextSlots[0].date}T00:00:00`)));
        }
        setLoading(false);
      }
    }

    loadAvailability();

    return () => {
      active = false;
    };
  }, [tourSlug]);

  const selectedDateKeys = new Set(
    selectedStartDate
      ? getConsecutiveDateKeys(selectedStartDate, tourDurations[tourSlug] ?? 1)
      : [],
  );
  const slotMonthKeys = Array.from(
    new Set(slots.map((slot) => monthKey(new Date(`${slot.date}T00:00:00`)))),
  ).sort();
  const today = new Date();
  const firstMonth = slotMonthKeys[0] ?? monthKey(today);
  const januaryLimit = monthKey(januaryAfter(today));
  const lastSlotMonth = slotMonthKeys[slotMonthKeys.length - 1];
  const lastMonth =
    lastSlotMonth && lastSlotMonth > januaryLimit ? lastSlotMonth : januaryLimit;
  const monthKeys = buildMonthRange(firstMonth, lastMonth);
  const currentMonthIndex = monthKeys.indexOf(currentMonth);
  const canGoToPrevious = currentMonthIndex > 0;
  const canGoToNext = currentMonthIndex >= 0 && currentMonthIndex < monthKeys.length - 1;
  const duration = tourDurations[tourSlug] ?? 1;
  const visibleMonthIndex = currentMonthIndex === -1 ? 0 : currentMonthIndex;
  const visibleMonthKeys = monthKeys.slice(visibleMonthIndex, visibleMonthIndex + 3);
  const selectedEndDate = selectedStartDate
    ? getConsecutiveDateKeys(selectedStartDate, duration).at(-1)
    : null;

  const changeMonth = (direction: "previous" | "next") => {
    const fallbackIndex = currentMonthIndex === -1 ? 0 : currentMonthIndex;
    const nextIndex =
      direction === "previous"
        ? Math.max(0, fallbackIndex - 1)
        : Math.min(monthKeys.length - 1, fallbackIndex + 1);
    setCurrentMonth(monthKeys[nextIndex]);
  };

  const selectStartDate = (date: Date) => {
    setSelectedStartDate(dateKey(date));
  };

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
            Dates
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Availability calendar
          </h2>
          <p className="text-gray-600">
            Pick one of the upcoming dates or request your own private date in the booking form.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-6 shadow-sm">
          <aside className="rounded-lg bg-white p-5 border border-gray-100">
            <p className="text-sm font-semibold text-green-700 mb-2">
              Selected travel window
            </p>
            <h3 className="text-xl font-bold mb-3">
              {duration} {duration === 1 ? "day" : "days"}
            </h3>
            {selectedStartDate && selectedEndDate ? (
              <p className="text-sm text-gray-600 leading-relaxed">
                {formatDate(selectedStartDate)} - {formatDate(selectedEndDate)}
              </p>
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose a start date and the full tour period will be highlighted.
              </p>
            )}
          </aside>

          <div className="min-w-0">
          {loading ? (
            <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
              Loading dates...
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => changeMonth("previous")}
                  disabled={!canGoToPrevious}
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <h3 className="text-base font-bold text-center">
                  {monthLabel(currentMonth)}
                </h3>

                <button
                  type="button"
                  onClick={() => changeMonth("next")}
                  disabled={!canGoToNext}
                  className="rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleMonthKeys.map((visibleMonth) => (
                  <div
                    key={visibleMonth}
                    className="rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <h4 className="text-sm font-bold text-center mb-3">
                      {monthLabel(visibleMonth)}
                    </h4>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-500 mb-1.5">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {buildMonthDays(visibleMonth).map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="h-8" />;
                        }

                        const key = dateKey(day);
                        const isSelected = selectedDateKeys.has(key);

                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => selectStartDate(day)}
                            className={`h-8 rounded-md border flex items-center justify-center text-xs font-bold transition ${
                              isSelected
                                ? "border-green-300 bg-green-100 text-green-900"
                                : "border-gray-100 bg-gray-50 text-gray-600 hover:border-green-300 hover:bg-green-50"
                            }`}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
