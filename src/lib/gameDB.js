import { isSupabaseAvailable, supabase } from "./supabase";

export async function signInWithGoogle() {
  if (!isSupabaseAvailable) return null;
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
  return true;
}

export async function signOut() {
  if (!isSupabaseAvailable) return null;
  await supabase.auth.signOut();
  return true;
}

export async function getUser() {
  if (!isSupabaseAvailable) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function saveProgress(
  userId,
  playerName,
  currentNode,
  stats,
  inventory,
  visitedNodes
) {
  if (!isSupabaseAvailable) return null;
  await supabase.from("player_progress").upsert(
    {
      user_id: userId,
      player_name: playerName,
      current_node: currentNode,
      stats,
      inventory,
      visited_nodes: visitedNodes,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

export async function loadProgress(userId) {
  if (!isSupabaseAvailable) return null;
  const { data } = await supabase
    .from("player_progress")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function saveAchievements(userId, achievements) {
  if (!isSupabaseAvailable) return null;
  await supabase.from("achievements").upsert(
    {
      user_id: userId,
      ...achievements,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

export async function loadAchievements(userId) {
  if (!isSupabaseAvailable) return null;
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function incrementPartidas(userId) {
  if (!isSupabaseAvailable) return 0;
  const [progress, achievements] = await Promise.all([
    loadProgress(userId),
    loadAchievements(userId),
  ]);

  const partidasJugadas = Math.max(
    (progress?.partidas_jugadas ?? 0) + 1,
    (achievements?.partidas_jugadas ?? 0) + 1
  );

  await Promise.all([
    supabase.from("player_progress").upsert(
      {
        user_id: userId,
        player_name: progress?.player_name ?? null,
        current_node: progress?.current_node ?? "start",
        stats: progress?.stats ?? {
          vida: 100,
          mana: 80,
          oro: 10,
          experiencia: 0,
        },
        inventory: progress?.inventory ?? ["Daga oxidada", "Capa raída"],
        visited_nodes: progress?.visited_nodes ?? [],
        partidas_jugadas: partidasJugadas,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    ),
    saveAchievements(userId, {
      ending_hero: achievements?.ending_hero ?? false,
      ending_dark: achievements?.ending_dark ?? false,
      ending_dead: achievements?.ending_dead ?? false,
      ending_exile: achievements?.ending_exile ?? false,
      items_collected: achievements?.items_collected ?? [],
      nodes_visited: achievements?.nodes_visited ?? [],
      partidas_jugadas: partidasJugadas,
    }),
  ]);

  return partidasJugadas;
}

export async function getRanking() {
  if (!isSupabaseAvailable) return [];
  const [{ data: achievements }, { data: progress }] = await Promise.all([
    supabase
      .from("achievements")
      .select(
        "user_id, partidas_jugadas, nodes_visited, ending_hero, ending_dark, ending_dead, ending_exile"
      ),
    supabase.from("player_progress").select("user_id, player_name"),
  ]);

  const progressByUser = new Map(
    (progress || []).map((entry) => [entry.user_id, entry.player_name])
  );

  return (achievements || [])
    .map((entry) => ({
      ...entry,
      player_name: progressByUser.get(entry.user_id) || "Sin nombre",
    }))
    .sort((a, b) => (b.partidas_jugadas || 0) - (a.partidas_jugadas || 0))
    .slice(0, 10);
}
