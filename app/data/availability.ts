export type TourRunStatus = "planned" | "in_progress" | "completed";

export type AvailabilitySlot = {
  tourSlug: string;
  date: string;
  status: TourRunStatus;
};

export const availabilitySlots: AvailabilitySlot[] = [
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-06-10",
    status: "planned",
  },
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-06-24",
    status: "planned",
  },
  {
    tourSlug: "issyk-kul-3-days",
    date: "2026-07-08",
    status: "planned",
  },
  {
    tourSlug: "song-kul",
    date: "2026-06-14",
    status: "planned",
  },
  {
    tourSlug: "song-kul",
    date: "2026-07-02",
    status: "planned",
  },
  {
    tourSlug: "kel-suu",
    date: "2026-06-18",
    status: "planned",
  },
  {
    tourSlug: "kel-suu",
    date: "2026-07-16",
    status: "planned",
  },
  {
    tourSlug: "song-kul-chon-kemin",
    date: "2026-06-21",
    status: "planned",
  },
  {
    tourSlug: "song-kul-chon-kemin",
    date: "2026-07-05",
    status: "planned",
  },
  {
    tourSlug: "14-days-kyrgyzstan",
    date: "2026-06-05",
    status: "planned",
  },
  {
    tourSlug: "14-days-kyrgyzstan",
    date: "2026-07-03",
    status: "planned",
  },
  {
    tourSlug: "14-days-kyrgyzstan",
    date: "2026-08-07",
    status: "planned",
  },
];

export function getAvailability(tourSlug: string) {
  return availabilitySlots
    .filter((slot) => slot.tourSlug === tourSlug)
    .sort((a, b) => a.date.localeCompare(b.date));
}
