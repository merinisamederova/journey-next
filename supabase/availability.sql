create table if not exists public.availability (
  id uuid primary key default gen_random_uuid(),
  tour_slug text not null,
  date date not null,
  status text not null default 'planned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint availability_unique_tour_date
    unique (tour_slug, date)
);

alter table public.availability
  add column if not exists status text not null default 'planned';

update public.availability
set status = 'planned'
where status in ('available', 'limited', 'sold_out');

alter table public.availability
  alter column status set default 'planned';

alter table public.availability
  drop constraint if exists availability_status_check;

alter table public.availability
  add constraint availability_status_check
    check (status in ('planned', 'in_progress', 'completed'));

create index if not exists availability_tour_slug_date_idx
  on public.availability (tour_slug, date);

insert into public.availability (tour_slug, date, status)
values
  ('issyk-kul-3-days', '2026-06-10', 'planned'),
  ('issyk-kul-3-days', '2026-06-24', 'planned'),
  ('issyk-kul-3-days', '2026-07-08', 'planned'),
  ('song-kul', '2026-06-14', 'planned'),
  ('song-kul', '2026-07-02', 'planned'),
  ('kel-suu', '2026-06-18', 'planned'),
  ('kel-suu', '2026-07-16', 'planned'),
  ('song-kul-chon-kemin', '2026-06-21', 'planned'),
  ('song-kul-chon-kemin', '2026-07-05', 'planned'),
  ('14-days-kyrgyzstan', '2026-06-05', 'planned'),
  ('14-days-kyrgyzstan', '2026-07-03', 'planned'),
  ('14-days-kyrgyzstan', '2026-08-07', 'planned')
on conflict (tour_slug, date) do update
set
  status = excluded.status,
  updated_at = now();
