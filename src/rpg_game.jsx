import { useEffect, useRef, useState } from "react";
import ChoiceList from "./components/ChoiceList";
import IntroScreen from "./components/IntroScreen";
import ItemCometa from "./components/ItemCometa";
import NameScreen from "./components/NameScreen";
import NarrativePanel from "./components/NarrativePanel";
import Sidebar from "./components/Sidebar";
import { atmosphereColors } from "./constants/theme";
import { useGameState } from "./hooks/useGameState";
import {
  ATMOSPHERE_FALLBACK_BACKGROUNDS,
  LOCATION_BACKGROUNDS,
  getBgForLocation,
} from "./utils/backgrounds";
import { preloadImages } from "./utils/preloader";

function AtmosphereScene({ atmosphere, location }) {
  const backgroundImage = getBgForLocation(location, atmosphere);

  const overlayByAtmosphere = {
    battle: "rgba(10, 6, 4, 0.64)",
    danger: "rgba(12, 5, 5, 0.68)",
    dark: "rgba(0,0,0,0.48)",
    mystic: "rgba(0,0,0,0.46)",
    calm: "rgba(0,0,0,0.42)",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <img
        src={backgroundImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        width="1920"
        height="1080"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayByAtmosphere[atmosphere] || "rgba(0,0,0,0.45)",
        }}
      />
    </div>
  );
}

export default function RPGGame() {
  const game = useGameState();
  const storyRef = useRef(null);
  const [isCompactLayout, setIsCompactLayout] = useState(() => window.innerWidth <= 960);
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 960);

  useEffect(() => {
    const syncLayout = () => {
      const compact = window.innerWidth <= 960;
      setIsCompactLayout(compact);
      setSidebarOpen((prev) => {
        if (compact) return false;
        return prev;
      });
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);
    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollTop = 0;
    }
  }, [game.currentNode?.id]);

  useEffect(() => {
    preloadImages([
      ...Object.values(LOCATION_BACKGROUNDS),
      ...Object.values(ATMOSPHERE_FALLBACK_BACKGROUNDS),
    ]);
  }, []);

  if (game.screen === "intro") {
    return <IntroScreen onStart={game.goToName} />;
  }

  if (game.screen === "name") {
    return <NameScreen onSubmit={game.startGame} />;
  }

  const colors = atmosphereColors[game.atmosphere] || atmosphereColors.dark;
  const isHotAtmosphere =
    game.currentNode?.atmosphere === "battle" || game.currentNode?.atmosphere === "danger";
  const narrativeTextColor = isHotAtmosphere ? "#f4e7c8" : "#d8bc8c";
  const narrationShadow = isHotAtmosphere
    ? "0 2px 10px rgba(0,0,0,0.88), 0 0 16px rgba(0,0,0,0.38)"
    : "0 1px 4px rgba(0,0,0,0.62)";

  const handleChoose = async (choice, index) => {
    await game.makeChoice(choice, index);
    if (isCompactLayout) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        transition: "background 1.4s ease",
        fontFamily: "'Crimson Text', serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AtmosphereScene atmosphere={game.atmosphere} location={game.location} />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse2   { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes statPulseRed {
          0%, 100% { box-shadow: 0 0 10px rgba(160,20,20,0.12), inset 0 0 0 rgba(255,90,90,0); }
          50% { box-shadow: 0 0 24px rgba(210,35,35,0.34), inset 0 0 16px rgba(255,90,90,0.12); }
        }
        @keyframes itemGlow { 0%{box-shadow:0 0 12px #f0c040} 100%{box-shadow:0 0 0 rgba(240,192,64,0)} }
        @keyframes itemCometaSequence {
          0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          14%  { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          28%  { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          56%  { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          72%  { transform: translate(calc(-50% - 22vw), calc(-50% - 12vh)) scale(0.82); opacity: 1; }
          100% { transform: translate(calc(-50% - 60vw), calc(-50% - 40vh)) scale(0.2); opacity: 0; }
        }
        @keyframes itemCometaPulse {
          0%,100% { box-shadow: 0 0 12px rgba(240,192,64,0.5), 0 0 24px rgba(240,192,64,0.15); }
          50% { box-shadow: 0 0 30px rgba(240,192,64,0.95), 0 0 42px rgba(240,192,64,0.35); }
        }
        @keyframes itemCometaTrail {
          0%,54% { opacity: 0; transform: translateY(-50%) scaleX(0.15) skewY(0deg); }
          70% { opacity: 0.95; transform: translateY(-50%) scaleX(0.85) skewY(-10deg); }
          100% { opacity: 0; transform: translateY(-50%) scaleX(1.85) skewY(-14deg); }
        }
        .choice-btn { transition: all 0.25s ease !important; }
        .choice-btn:hover:not(:disabled) { background: rgba(255,255,255,0.07) !important; border-color: ${colors.accent} !important; transform: translateX(6px) !important; padding-left: 22px !important; }
        .choice-btn.selected { opacity: 0.5; transform: translateX(10px) !important; }
        .item-cometa {
          animation: itemCometaSequence 3.6s cubic-bezier(0.22, 0.7, 0.2, 1) forwards, itemCometaPulse 1.8s ease-in-out;
          box-shadow: 0 0 18px rgba(240,192,64,0.6);
          overflow: visible;
        }
        .item-cometa::after {
          content: "";
          position: absolute;
          left: 72%;
          top: 50%;
          width: 260px;
          height: 24px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(255,248,196,0.95), rgba(240,192,64,0.75) 22%, rgba(240,192,64,0.35) 58%, transparent 100%);
          filter: blur(2px);
          animation: itemCometaTrail 3.6s ease forwards;
          pointer-events: none;
          border-radius: 999px;
        }
        .item-cometa::before {
          content: "";
          position: absolute;
          left: 76%;
          top: 50%;
          width: 180px;
          height: 10px;
          transform-origin: left center;
          background: linear-gradient(90deg, rgba(255,255,230,0.9), rgba(255,224,120,0.45), transparent);
          filter: blur(6px);
          animation: itemCometaTrail 3.6s ease forwards;
          pointer-events: none;
          border-radius: 999px;
        }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a1a1a; border-radius: 2px; }
      `}</style>

      {game.newItemAnimation && (
        <ItemCometa
          item={game.newItemAnimation}
          onComplete={() => game.clearNewItemAnimation()}
        />
      )}

      <div
        style={{
          background: "linear-gradient(135deg, #2a1a00, #3d2200)",
          borderBottom: "2px solid #c9933a",
          boxShadow: "0 2px 20px rgba(201,147,58,0.4)",
          padding: isCompactLayout ? "12px 14px" : "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 10,
          gap: isCompactLayout ? "10px" : "14px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minWidth: 0,
            flex: 1,
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? "Ocultar panel del aventurero" : "Mostrar panel del aventurero"}
            style={{
              background: "linear-gradient(180deg, rgba(73,43,8,0.95), rgba(43,22,2,0.95))",
              border: "1px solid rgba(201,147,58,0.85)",
              color: "#f8e4a4",
              minWidth: "42px",
              height: "42px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              cursor: "pointer",
              fontSize: "20px",
              boxShadow: "0 0 18px rgba(201,147,58,0.28), inset 0 0 12px rgba(0,0,0,0.25)",
              textShadow: "0 0 10px rgba(240,192,64,0.45)",
              transform: sidebarOpen ? "scaleX(-1)" : "none",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              flexShrink: 0,
            }}
          >
            ➳
          </button>
          <div
            style={{
              minWidth: 0,
              display: "flex",
              alignItems: "baseline",
              gap: isCompactLayout ? "6px" : "10px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                color: "#f0c040",
                fontSize: isCompactLayout ? "13px" : "14px",
                letterSpacing: isCompactLayout ? "2px" : "3px",
                textShadow: "0 0 12px rgba(240,192,64,0.35)",
                flexShrink: 0,
              }}
            >
              VALDRIS
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#f0d080",
              fontSize: isCompactLayout ? "11px" : "12px",
              letterSpacing: isCompactLayout ? "1px" : "2px",
              whiteSpace: "nowrap",
            }}
          >
            📍 {game.location}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          maxHeight: isCompactLayout ? "none" : "calc(100vh - 57px)",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {isCompactLayout && sidebarOpen && (
          <button
            type="button"
            aria-label="Cerrar panel"
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.48)",
              border: "none",
              padding: 0,
              zIndex: 3,
              cursor: "pointer",
            }}
          />
        )}

        <div
          style={{
            width: isCompactLayout ? "min(280px, 82vw)" : sidebarOpen ? "220px" : "0px",
            minWidth: isCompactLayout ? "min(280px, 82vw)" : sidebarOpen ? "220px" : "0px",
            background: "linear-gradient(180deg, #1e1000, #2a1500)",
            borderRight: sidebarOpen ? "2px solid #8b5e1a" : "none",
            padding: sidebarOpen ? "20px 16px" : "0",
            overflowY: "auto",
            boxShadow: "inset -12px 0 24px rgba(0,0,0,0.18)",
            position: isCompactLayout ? "absolute" : "relative",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 4,
            transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            opacity: sidebarOpen ? 1 : 0,
            pointerEvents: sidebarOpen ? "auto" : "none",
            transition:
              "transform 0.28s ease, opacity 0.28s ease, width 0.28s ease, min-width 0.28s ease, padding 0.28s ease",
          }}
        >
          <Sidebar
            stats={game.stats}
            inventory={game.inventory}
            playerName={game.playerName}
            muted={game.muted}
            onToggleMuted={game.toggleMuted}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen((prev) => !prev)}
            colors={colors}
            newItem={game.highlightedInventoryItem}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            minWidth: 0,
          }}
          ref={storyRef}
        >
          <div style={{ flex: 1, padding: isCompactLayout ? "22px 18px 18px" : "32px 40px" }}>
            <div
              style={{
                position: "absolute",
                left: isCompactLayout ? "20%" : sidebarOpen ? "220px" : "48px",
                top: "80px",
                width: isCompactLayout ? "220px" : "300px",
                height: isCompactLayout ? "220px" : "300px",
                background: colors.glow,
                borderRadius: "50%",
                filter: "blur(80px)",
                pointerEvents: "none",
                transition: "background 2s ease",
                opacity: 0.5,
              }}
            />

            <div
              style={{
                "--narrative-font-size": isCompactLayout ? "16px" : "17px",
                "--narrative-line-height": isCompactLayout ? "1.8" : "1.9",
                "--narrative-text-color": narrativeTextColor,
                "--narrative-shadow": narrationShadow,
              }}
            >
              <NarrativePanel
                narration={game.currentNode.narration}
                newItem={game.currentNode.newItem}
                visible={game.narrationVisible}
                colors={colors}
              />
            </div>
          </div>

          <div
            style={{
              padding: isCompactLayout ? "20px 18px 28px" : "24px 40px 32px",
              borderTop: `1px solid ${colors.accent}22`,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(5px)",
              opacity: game.choicesVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            {game.currentNode.isEnding ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "16px",
                  maxWidth: "700px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: colors.accent,
                    fontSize: "13px",
                    letterSpacing: "3px",
                  }}
                >
                  FIN DE LA HISTORIA
                </div>
                <button
                  onClick={game.restartGame}
                  style={{
                    background: `rgba(${colors.accent === "#8b1a1a" ? "139,26,26" : colors.accent === "#4a1a8b" ? "74,26,139" : "26,107,58"},0.2)`,
                    border: `1px solid ${colors.accent}`,
                    color: "#e0c090",
                    padding: "14px 36px",
                    fontSize: "15px",
                    fontFamily: "'Cinzel', serif",
                    letterSpacing: "3px",
                    cursor: "pointer",
                    borderRadius: "2px",
                    transition: "all 0.3s ease",
                  }}
                >
                  ↩ COMENZAR NUEVA PARTIDA
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "#F0C040",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    marginBottom: "16px",
                  }}
                >
                  ¿QUÉ HARÁS?
                </div>
                <ChoiceList
                  choices={game.currentNode.choices}
                  stats={game.stats}
                  inventory={game.inventory}
                  onChoose={handleChoose}
                  loading={game.transitioning}
                  selectedChoice={game.selectedChoice}
                  colors={colors}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
