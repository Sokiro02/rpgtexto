export default function NarrativePanel({ narration, newItem, visible, colors }) {
  void colors;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease",
      }}
    >
      <div
        style={{
          fontSize: "var(--narrative-font-size)",
          lineHeight: "var(--narrative-line-height)",
          color: "var(--narrative-text-color)",
          maxWidth: "700px",
          position: "relative",
          textShadow: "var(--narrative-shadow)",
        }}
      >
        {narration
          .split("\n")
          .filter(Boolean)
          .map((para, i) => (
            <p
              key={i}
              style={{
                marginBottom: "20px",
                animation: `fadeInUp 0.6s ease ${i * 0.15}s both`,
                fontStyle: i === 0 ? "italic" : "normal",
              }}
            >
              {para}
            </p>
          ))}
      </div>

      {newItem && (
        <div
          style={{
            display: "inline-block",
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.4)",
            borderRadius: "4px",
            padding: "8px 16px",
            marginBottom: "24px",
            color: "#d4af37",
            fontSize: "14px",
            animation: "fadeInUp 0.5s ease 0.5s both",
          }}
        >
          ✨ Objeto obtenido: <strong>{newItem}</strong>
        </div>
      )}
    </div>
  );
}
