create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour text not null,
  tour_slug text,
  name text not null,
  contact text not null,
  preferred_date date,
  people integer,
  message text,
  status text not null default 'new',
  manager_notes text,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings
  add column if not exists manager_notes text;

alter table public.bookings
  add column if not exists updated_at timestamptz not null default now();

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

create index if not exists bookings_status_idx
  on public.bookings (status);

create index if not exists bookings_tour_slug_idx
  on public.bookings (tour_slug);
