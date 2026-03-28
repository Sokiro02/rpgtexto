-- Progreso del jugador
create table public.player_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  player_name text,
  current_node text default 'start',
  stats jsonb default '{"vida":100,"mana":80,"oro":10,"experiencia":0}',
  inventory jsonb default '["Daga oxidada","Capa raída"]',
  visited_nodes jsonb default '[]',
  partidas_jugadas int default 0,
  updated_at timestamp default now(),
  unique(user_id)
);

-- Logros
create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  ending_hero boolean default false,
  ending_dark boolean default false,
  ending_dead boolean default false,
  ending_exile boolean default false,
  items_collected jsonb default '[]',
  nodes_visited jsonb default '[]',
  partidas_jugadas int default 0,
  updated_at timestamp default now(),
  unique(user_id)
);

-- Habilita RLS
alter table public.player_progress enable row level security;
alter table public.achievements enable row level security;

-- Políticas: cada usuario solo ve y edita sus propios datos
create policy "own progress" on public.player_progress
  for all using (auth.uid() = user_id);
create policy "own achievements" on public.achievements
  for all using (auth.uid() = user_id);
