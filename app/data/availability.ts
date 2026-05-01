export type AvailabilityStatus = "available" | "limited" | "sold_out";

export type AvailabilitySlot = {
  tourSlug: string;
  date: string;
  seats: number;
  status: AvailabilityStatus;
};

export const availabilitySlots: AvailabilitySlot[] = [
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-06-10",
    seats: 6,
    status: "available",
  },
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-06-24",
    seats: 3,
    status: "limited",
  },
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-07-08",
    seats: 0,
    status: "sold_out",
  },
  {
    tourSlug: "song-kul",
    date: "2026-06-14",
    seats: 4,
    status: "available",
  },
  {
    tourSlug: "song-kul",
    date: "2026-07-02",
    seats: 2,
    status: "limited",
  },
  {
    tourSlug: "kel-suu",
    date: "2026-06-18",
    seats: 5,
    status: "available",
  },
  {
    tourSlug: "kel-suu",
    date: "2026-07-16",
    seats: 2,
    status: "limited",
  },
  {
    tourSlug: "song-kul-chon-kemin",
    date: "2026-06-21",
    seats: 6,
    status: "available",
  },
  {
    tourSlug: "song-kul-chon-kemin",
    date: "2026-07-05",
    seats: 0,
    status: "sold_out",
  },
];

export function getAvailability(tourSlug: string) {
  return availabilitySlots
    .filter((slot) => slot.tourSlug === tourSlug)
    .sort((a, b) => a.date.localeCompare(b.date));
}
