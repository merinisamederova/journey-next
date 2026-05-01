create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  tour_slug text not null,
  date date not null,
  seats integer not null default 0,
  status text not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint availability_status_check
    check (status in ('available', 'limited', 'sold_out')),
  constraint availability_unique_tour_date
    unique (tour_slug, date)
);

create index if not exists availability_tour_slug_date_idx
  on public.availability (tour_slug, date);

insert into public.availability (tour_slug, date, seats, status)
values
  ('issyk-kul-3-days', '2026-06-10', 6, 'available'),
  ('issyk-kul-3-days', '2026-06-24', 3, 'limited'),
  ('issyk-kul-3-days', '2026-07-08', 0, 'sold_out'),
  ('song-kul', '2026-06-14', 4, 'available'),
  ('song-kul', '2026-07-02', 2, 'limited'),
  ('kel-suu', '2026-06-18', 5, 'available'),
  ('kel-suu', '2026-07-16', 2, 'limited'),
  ('song-kul-chon-kemin', '2026-06-21', 6, 'available'),
  ('song-kul-chon-kemin', '2026-07-05', 0, 'sold_out'),
  ('14-days-kyrgyzstan', '2026-06-05', 4, 'available'),
  ('14-days-kyrgyzstan', '2026-07-03', 2, 'limited'),
  ('14-days-kyrgyzstan', '2026-08-07', 6, 'available')
on conflict (tour_slug, date) do update
set
  seats = excluded.seats,
  status = excluded.status,
  updated_at = now();
