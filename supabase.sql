create table public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  name text not null,
  phone text,
  item text,
  amount bigint not null default 0,
  payment bigint not null default 0,
  date date default current_date,
  created_at timestamptz not null default now()
);

alter table public.debts enable row level security;

create policy "users can view own debts" on public.debts
for select using (auth.uid() = user_id);

create policy "users can insert own debts" on public.debts
for insert with check (auth.uid() = user_id);

create policy "users can update own debts" on public.debts
for update using (auth.uid() = user_id);

create policy "users can delete own debts" on public.debts
for delete using (auth.uid() = user_id);
