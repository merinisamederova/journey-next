create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  tour text,
  rating integer not null default 5,
  text text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reviews_rating_check
    check (rating between 1 and 5),
  constraint reviews_status_check
    check (status in ('pending', 'approved', 'rejected'))
);

create index if not exists reviews_status_created_at_idx
  on public.reviews (status, created_at desc);
