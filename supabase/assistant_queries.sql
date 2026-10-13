create table if not exists public.assistant_queries (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  normalized_query text not null,
  language text,
  page text,
  created_at timestamptz not null default now()
);

create index if not exists assistant_queries_created_at_idx
  on public.assistant_queries (created_at desc);

create index if not exists assistant_queries_normalized_query_idx
  on public.assistant_queries (normalized_query);

create index if not exists assistant_queries_language_idx
  on public.assistant_queries (language);
