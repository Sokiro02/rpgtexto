import { useState } from "react";

export default function NameScreen({ onSubmit }) {
  const [nameInput, setNameInput] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060408",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Crimson Text', serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .name-input:focus { outline: none; border-color: #c0392b !important; box-shadow: 0 0 20px rgba(192,57,43,0.4) !important; }
        .start-btn:hover:not(:disabled) { background: rgba(139,26,26,0.5) !important; transform: scale(1.02); }
      `}</style>
      <div
        style={{
          textAlign: "center",
          animation: "fadeIn 0.8s ease forwards",
          padding: "40px 20px",
          maxWidth: "500px",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>🗡️</div>
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            color: "#c0392b",
            fontSize: "28px",
            letterSpacing: "4px",
            marginBottom: "16px",
          }}
        >
          ¿QUIÉN ERES?
        </h2>
        <p
          style={{
            color: "#8b7355",
            fontSize: "16px",
            marginBottom: "40px",
            fontStyle: "italic",
          }}
        >
          Las nieblas de Valdris envuelven tu mente. Recuerdas solo una cosa... tu
          nombre.
        </p>
        <input
          className="name-input"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && nameInput.trim() && onSubmit(nameInput.trim())}
          placeholder="Escribe tu nombre..."
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #3a2a1a",
            color: "#e0c090",
            padding: "14px 20px",
            fontSize: "18px",
            fontFamily: "'Crimson Text', serif",
            width: "100%",
            borderRadius: "2px",
            marginBottom: "24px",
            boxSizing: "border-box",
            textAlign: "center",
            letterSpacing: "2px",
            transition: "all 0.3s ease",
          }}
        />
        <button
          className="start-btn"
          onClick={() => nameInput.trim() && onSubmit(nameInput.trim())}
          disabled={!nameInput.trim()}
          style={{
            background: "rgba(139,26,26,0.3)",
            border: "1px solid #8b1a1a",
            color: nameInput.trim() ? "#e0c090" : "#5a4a3a",
            padding: "14px 40px",
            fontSize: "15px",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "3px",
            cursor: nameInput.trim() ? "pointer" : "default",
            borderRadius: "2px",
            transition: "all 0.3s ease",
          }}
        >
          FORJAR MI DESTINO
        </button>
      </div>
    </div>
  );
}
