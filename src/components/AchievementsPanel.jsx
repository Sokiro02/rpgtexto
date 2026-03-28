const ACHIEVEMENTS = [
  { icon: "🏆", label: "Héroe de Valdris", key: "ending_hero" },
  { icon: "👑", label: "Amo de Valdris", key: "ending_dark" },
  { icon: "⚰️", label: "El Sacrificio Eterno", key: "ending_dead" },
  { icon: "🚶", label: "El Exilio", key: "ending_exile" },
  { icon: "📦", label: "Coleccionista", rule: (a) => (a.items_collected || []).length >= 5 },
  { icon: "🗺️", label: "Explorador", rule: (a) => (a.nodes_visited || []).length >= 10 },
  { icon: "🎮", label: "Veterano", rule: (a) => (a.partidas_jugadas || 0) >= 3 },
];

export default function AchievementsPanel({ achievements }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          color: "#f0c040",
          fontSize: "18px",
          letterSpacing: "2px",
          marginBottom: "18px",
        }}
      >
        Logros
      </div>
      <div style={{ display: "grid", gap: "12px" }}>
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = achievement.rule
            ? achievement.rule(achievements)
            : Boolean(achievements?.[achievement.key]);

          return (
            <div
              key={achievement.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "6px",
                border: unlocked
                  ? "1px solid rgba(240,192,64,0.42)"
                  : "1px solid rgba(160,160,160,0.15)",
                background: unlocked
                  ? "rgba(201,147,58,0.12)"
                  : "rgba(255,255,255,0.03)",
                color: unlocked ? "#f7df95" : "#9a9485",
                boxShadow: unlocked ? "0 0 22px rgba(240,192,64,0.12)" : "none",
              }}
            >
              <span style={{ fontSize: "22px", filter: unlocked ? "drop-shadow(0 0 10px rgba(240,192,64,0.35))" : "grayscale(1)" }}>
                {achievement.icon}
              </span>
              <span style={{ flex: 1, fontFamily: "'Cinzel', serif", fontSize: "13px", letterSpacing: "1px" }}>
                {achievement.label}
              </span>
              {!unlocked && <span style={{ color: "#7d776b" }}>🔒</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
