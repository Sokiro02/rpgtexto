import { createElement } from "react";
import StatBar from "./StatBar";
import { ITEM_ICONS } from "../constants/theme";

const getItemIcon = (itemName) => {
  const normalized = itemName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const [key, icon] of Object.entries(ITEM_ICONS)) {
    if (key === "default") continue;
    const keywords = key.split(",").map((keyword) =>
      keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return icon;
    }
  }

  return ITEM_ICONS.default;
};

export default function Sidebar({
  stats,
  inventory,
  playerName,
  muted,
  onToggleMuted,
  isOpen,
  onToggle,
  colors,
  newItem,
  user,
  onOpenAchievements,
  onOpenRanking,
  onSignOut,
}) {
  void onToggle;
  void colors;

  return (
    <div
      aria-hidden={!isOpen}
      data-toggle-handler={typeof onToggle === "function" ? "1" : "0"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div
        style={{
          padding: "12px 10px",
          background: "rgba(201,147,58,0.08)",
          border: "1px solid rgba(201,147,58,0.22)",
          borderRadius: "4px",
          boxShadow: "inset 0 0 14px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f0c040",
            fontSize: "11px",
            letterSpacing: "2px",
            marginBottom: "8px",
            textShadow: "0 0 10px rgba(240,192,64,0.6)",
          }}
        >
          AVENTURERO
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          {user?.user_metadata?.avatar_url && (
            <img
              src={user.user_metadata.avatar_url}
              alt={playerName}
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "999px",
                border: "1px solid rgba(240,192,64,0.38)",
                objectFit: "cover",
              }}
            />
          )}
          <div
            style={{
              color: "#f0d080",
              fontFamily: "'Cinzel', serif",
              fontSize: "14px",
              letterSpacing: "1px",
              wordBreak: "break-word",
            }}
          >
            {playerName}
            {!user && (
              <div style={{ fontSize: "11px", color: "#b69258", marginTop: "4px" }}>
                Invitado
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "#d8b56a",
            fontFamily: "'Cinzel', serif",
          }}
        >
          <span>NIVEL</span>
          <span style={{ color: "#f0c040" }}>⚡ {stats.experiencia} XP</span>
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f0c040",
            fontSize: "11px",
            letterSpacing: "2px",
            marginBottom: "12px",
            textShadow: "0 0 10px rgba(240,192,64,0.6)",
          }}
        >
          ATRIBUTOS
        </div>
        <StatBar
          label="❤️ VIDA"
          value={stats.vida}
          max={100}
          color="#c0392b"
          labelColor="#d8b56a"
          valueColor="#f0c040"
        />
        <StatBar
          label="💙 MANA"
          value={stats.mana}
          max={100}
          color="#2980b9"
          labelColor="#d8b56a"
          valueColor="#f0c040"
        />
        <div
          style={{
            height: "1px",
            background: "rgba(201,147,58,0.24)",
            margin: "10px 0 12px",
          }}
        />
        <div
          style={{
            padding: "10px 12px",
            background: "rgba(201,147,58,0.08)",
            border: "1px solid rgba(201,147,58,0.18)",
            borderRadius: "4px",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.14)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              color: "#d8b56a",
              fontFamily: "'Cinzel', serif",
              marginBottom: "6px",
            }}
          >
            <span>🪙 ORO</span>
            <span style={{ color: "#f0c040", fontSize: "14px" }}>{stats.oro}</span>
          </div>
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f0c040",
            fontSize: "11px",
            letterSpacing: "2px",
            marginBottom: "10px",
            textShadow: "0 0 10px rgba(240,192,64,0.6)",
          }}
        >
          AMBIENTACIÓN
        </div>
        <button
          type="button"
          onClick={onToggleMuted}
          aria-label={muted ? "Activar ambientación" : "Silenciar ambientación"}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            background: "rgba(201,147,58,0.12)",
            border: "1px solid rgba(201,147,58,0.35)",
            borderLeft: "3px solid #c9933a",
            color: "#f0d080",
            padding: "10px 12px",
            borderRadius: "2px",
            fontFamily: "'Cinzel', serif",
            fontSize: "12px",
            letterSpacing: "1px",
            cursor: "pointer",
            boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
          }}
        >
          <span>{muted ? "Audio apagado" : "Audio encendido"}</span>
          <span
            style={{
              fontSize: "16px",
              color: muted ? "#d0a864" : "#f8e4a4",
            }}
          >
            {muted ? "🔇" : "🔊"}
          </span>
        </button>
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f0c040",
            fontSize: "11px",
            letterSpacing: "2px",
            marginBottom: "10px",
            textShadow: "0 0 10px rgba(240,192,64,0.6)",
          }}
        >
          REGISTROS
        </div>
        <div style={{ display: "grid", gap: "10px" }}>
          <button
            type="button"
            onClick={onOpenAchievements}
            style={{
              width: "100%",
              background: "rgba(201,147,58,0.12)",
              border: "1px solid rgba(201,147,58,0.35)",
              borderLeft: "3px solid #c9933a",
              color: "#f0d080",
              padding: "10px 12px",
              borderRadius: "2px",
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "1px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Logros
          </button>
          <button
            type="button"
            onClick={onOpenRanking}
            style={{
              width: "100%",
              background: "rgba(201,147,58,0.12)",
              border: "1px solid rgba(201,147,58,0.35)",
              borderLeft: "3px solid #c9933a",
              color: "#f0d080",
              padding: "10px 12px",
              borderRadius: "2px",
              fontFamily: "'Cinzel', serif",
              fontSize: "12px",
              letterSpacing: "1px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Ranking
          </button>
          {user && (
            <button
              type="button"
              onClick={onSignOut}
              style={{
                width: "100%",
                background: "rgba(139,26,26,0.16)",
                border: "1px solid rgba(201,86,86,0.28)",
                borderLeft: "3px solid #b74a4a",
                color: "#f0d080",
                padding: "10px 12px",
                borderRadius: "2px",
                fontFamily: "'Cinzel', serif",
                fontSize: "12px",
                letterSpacing: "1px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#f0c040",
            fontSize: "11px",
            letterSpacing: "2px",
            marginBottom: "10px",
            textShadow: "0 0 10px rgba(240,192,64,0.6)",
          }}
        >
          INVENTARIO
        </div>
        {inventory.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: "12px",
              color: "#f0d080",
              padding: "5px 8px",
              marginBottom: "4px",
              background: "rgba(201,147,58,0.12)",
              borderRadius: "2px",
              borderLeft: "3px solid #c9933a",
              animation:
                item === newItem
                  ? "itemGlow 1.5s ease, fadeInUp 0.5s ease"
                  : i === inventory.length - 1
                    ? "fadeInUp 0.5s ease"
                    : "none",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                color: "#f0c040",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "18px",
              }}
            >
              {createElement(getItemIcon(item))}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
