export default function StatBar({
  label,
  value,
  max = 100,
  color,
  labelColor = "#d0b070",
  valueColor = "#f0c040",
}) {
  const isAlert = (label.includes("VIDA") || label.includes("MANA")) && value <= 35;

  return (
    <div
      style={{
        marginBottom: "12px",
        padding: "8px 10px",
        background: isAlert ? "rgba(120,18,18,0.18)" : "rgba(201,147,58,0.08)",
        border: isAlert
          ? "1px solid rgba(220,70,70,0.45)"
          : "1px solid rgba(201,147,58,0.16)",
        borderRadius: "4px",
        animation: isAlert ? "statPulseRed 1.2s ease-in-out infinite" : "none",
        boxShadow: isAlert ? "0 0 16px rgba(180,30,30,0.18)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
          color: labelColor,
          marginBottom: "6px",
          fontFamily: "'Cinzel', serif",
          letterSpacing: "0.5px",
          textShadow: "0 0 8px rgba(240,192,64,0.18)",
        }}
      >
        <span>{label}</span>
        <span style={{ color: isAlert ? "#ff9a8f" : valueColor }}>
          {value}
          {max !== Infinity ? `/${max}` : ""}
        </span>
      </div>
      {max !== Infinity && (
        <div
          style={{
            height: "8px",
            background: "#1a1a1a",
            borderRadius: "999px",
            overflow: "hidden",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.45)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(value / max) * 100}%`,
              background: isAlert ? "#d94b43" : color,
              borderRadius: "999px",
              transition: "width 0.8s ease",
              boxShadow: `0 0 10px ${isAlert ? "#d94b43" : color}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
