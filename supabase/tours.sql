create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text not null,
  hero_image text not null default '/2.jpg',
  map_query text,
  about jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  days jsonb not null default '[]'::jsonb,
  activities jsonb not null default '[]'::jsonb,
  services jsonb not null default '[]'::jsonb,
  note text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tours_status_check
    check (status in ('draft', 'published'))
);

create index if not exists tours_status_created_at_idx
  on public.tours (status, created_at desc);

create index if not exists tours_slug_idx
  on public.tours (slug);
