import { useMemo } from "react";

const createIntroParticles = () =>
  Array.from({ length: 20 }, (_, index) => ({
    id: index,
    background: `rgba(255,${100 + Math.random() * 155},${Math.random() * 50},${0.3 + Math.random() * 0.7})`,
    boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `flicker ${2 + Math.random() * 3}s ease-in-out infinite`,
    animationDelay: `${Math.random() * 3}s`,
  }));

export default function IntroScreen({ onStart }) {
  const introParticles = useMemo(() => createIntroParticles(), []);

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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes flicker { 0%,100%{opacity:1} 50%{opacity:0.85} 92%{opacity:0.95} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse   { 0%,100%{box-shadow:0 0 20px rgba(139,26,26,0.4)} 50%{box-shadow:0 0 40px rgba(139,26,26,0.8)} }
        .intro-btn:hover { background: rgba(139,26,26,0.3) !important; border-color: #c0392b !important; transform: scale(1.02); }
      `}</style>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, #1a0408 0%, #060208 70%)",
        }}
      />
      {introParticles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            background: particle.background,
            borderRadius: "50%",
            boxShadow: particle.boxShadow,
            top: particle.top,
            left: particle.left,
            animation: particle.animation,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          animation: "fadeIn 1.5s ease forwards",
          padding: "40px 20px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            marginBottom: "10px",
            animation: "float 4s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(139,26,26,0.8))",
          }}
        >
          ⚔️
        </div>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            color: "#c0392b",
            margin: "0 0 8px",
            letterSpacing: "6px",
            textShadow: "0 0 30px rgba(192,57,43,0.8)",
            animation: "flicker 4s ease-in-out infinite",
          }}
        >
          VALDRIS
        </h1>
        <p
          style={{
            color: "#8b7355",
            fontStyle: "italic",
            fontSize: "18px",
            marginBottom: "50px",
            letterSpacing: "3px",
          }}
        >
          Crónicas del Mundo Olvidado
        </p>
        <p
          style={{
            color: "#a08060",
            fontSize: "16px",
            maxWidth: "420px",
            lineHeight: "1.8",
            marginBottom: "50px",
          }}
        >
          Un mundo de oscuridad y magia antigua te aguarda. Cada decisión forjará tu
          destino. ¿Tienes el valor de adentrarte en las sombras?
        </p>
        <button
          className="intro-btn"
          onClick={onStart}
          style={{
            background: "rgba(139,26,26,0.2)",
            border: "1px solid #8b1a1a",
            color: "#e0c090",
            padding: "16px 48px",
            fontSize: "16px",
            fontFamily: "'Cinzel', serif",
            letterSpacing: "3px",
            cursor: "pointer",
            borderRadius: "2px",
            transition: "all 0.3s ease",
            animation: "pulse 3s ease-in-out infinite",
          }}
        >
          COMENZAR AVENTURA
        </button>
      </div>
    </div>
  );
}
