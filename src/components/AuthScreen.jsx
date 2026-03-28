import { signInWithGoogle } from "../lib/gameDB";

export default function AuthScreen({ onContinueGuest }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, rgba(42,26,0,0.8), #050304 72%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Crimson Text', serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          width: "min(520px, 100%)",
          padding: "40px 32px",
          border: "1px solid rgba(201,147,58,0.38)",
          background: "rgba(14,8,3,0.82)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.45), inset 0 0 40px rgba(201,147,58,0.05)",
          borderRadius: "10px",
          textAlign: "center",
          color: "#f0d080",
        }}
      >
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "14px",
            letterSpacing: "4px",
            color: "#c9933a",
            marginBottom: "16px",
          }}
        >
          VALDRIS
        </div>
        <h1
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            margin: "0 0 16px",
            color: "#f8e4a4",
            letterSpacing: "3px",
            textShadow: "0 0 22px rgba(240,192,64,0.18)",
          }}
        >
          Entra al mundo olvidado
        </h1>
        <p
          style={{
            margin: "0 0 28px",
            color: "#d8bc8c",
            fontSize: "19px",
            lineHeight: 1.8,
          }}
        >
          Inicia sesión para guardar tu progreso y aparecer en el ranking.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <button
            type="button"
            onClick={() => signInWithGoogle()}
            style={{
              background: "linear-gradient(135deg, #4d2c00, #7c4b08)",
              color: "#fff0c9",
              border: "1px solid rgba(240,192,64,0.48)",
              borderRadius: "4px",
              padding: "15px 20px",
              cursor: "pointer",
              fontFamily: "'Cinzel', serif",
              letterSpacing: "1.2px",
              fontSize: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            Entrar con Google
          </button>
          <button
            type="button"
            onClick={onContinueGuest}
            style={{
              background: "rgba(201,147,58,0.08)",
              color: "#f0d080",
              border: "1px solid rgba(201,147,58,0.28)",
              borderRadius: "4px",
              padding: "14px 20px",
              cursor: "pointer",
              fontFamily: "'Cinzel', serif",
              letterSpacing: "1.2px",
              fontSize: "14px",
            }}
          >
            Jugar sin cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
