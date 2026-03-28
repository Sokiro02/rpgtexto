import { useState } from "react";

const getChoiceRequirementStatus = (choice, inventory, stats) => {
  if (!choice.requires) {
    return { blocked: false, missingItem: null, missingStat: null };
  }

  if (choice.requires.item && !inventory.includes(choice.requires.item)) {
    return {
      blocked: true,
      missingItem: choice.requires.item,
      missingStat: null,
    };
  }

  if (choice.requires.stat) {
    const currentValue = stats[choice.requires.stat] ?? 0;
    if (currentValue < choice.requires.min) {
      return {
        blocked: true,
        missingItem: null,
        missingStat: { stat: choice.requires.stat, min: choice.requires.min },
      };
    }
  }

  return { blocked: false, missingItem: null, missingStat: null };
};

const getChoiceRequirementMessage = (requirement) => {
  if (requirement.missingItem) {
    return `Para esta opción necesitas: ${requirement.missingItem}`;
  }

  if (requirement.missingStat) {
    return `Para esta opción necesitas ${requirement.missingStat.min} de ${requirement.missingStat.stat}`;
  }

  return "";
};

export default function ChoiceList({
  choices,
  stats,
  inventory,
  onChoose,
  loading,
  selectedChoice,
  colors,
}) {
  const [hoveredRequirementHint, setHoveredRequirementHint] = useState(null);
  const isHotAtmosphere = colors.bg === "#140806" || colors.bg === "#140405";
  const choiceTextColor = isHotAtmosphere ? "#f1e3bf" : "#d7bb8b";
  const narrationShadow = isHotAtmosphere
    ? "0 2px 10px rgba(0,0,0,0.88), 0 0 16px rgba(0,0,0,0.38)"
    : "0 1px 4px rgba(0,0,0,0.62)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "700px" }}>
      {choices.map((choice, i) => {
        const requirement = getChoiceRequirementStatus(choice, inventory, stats);
        const isBlocked = requirement.blocked;
        const requirementMessage = getChoiceRequirementMessage(requirement);
        const hintKey = `${i}`;

        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              className={`choice-btn${selectedChoice === i ? " selected" : ""}`}
              onClick={() => !isBlocked && onChoose(choice, i)}
              onMouseEnter={() => isBlocked && setHoveredRequirementHint(hintKey)}
              onMouseLeave={() =>
                setHoveredRequirementHint((current) =>
                  current === hintKey ? null : current
                )
              }
              onFocus={() => isBlocked && setHoveredRequirementHint(hintKey)}
              onBlur={() =>
                setHoveredRequirementHint((current) =>
                  current === hintKey ? null : current
                )
              }
              title={isBlocked ? requirementMessage : ""}
              disabled={loading || isBlocked}
              style={{
                background: isBlocked
                  ? "rgba(30,18,14,0.52)"
                  : isHotAtmosphere
                    ? "rgba(24,16,12,0.38)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${isBlocked ? "rgba(240,192,64,0.18)" : `${colors.accent}33`}`,
                color: choiceTextColor,
                padding: "14px 16px",
                textAlign: "left",
                fontSize: "15px",
                fontFamily: "'Crimson Text', serif",
                cursor: isBlocked ? "not-allowed" : loading ? "default" : "pointer",
                borderRadius: "2px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                opacity: isBlocked ? 0.35 : loading ? 0.5 : 1,
                textShadow: narrationShadow,
              }}
            >
              <span
                style={{
                  color: colors.accent,
                  fontFamily: "'Cinzel', serif",
                  fontSize: "12px",
                  minWidth: "20px",
                }}
              >
                {["I", "II", "III", "IV"][i]}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                {isBlocked && <span style={{ color: "#f0c040" }}>🔒</span>}
                <span>{choice.text}</span>
                {requirement.missingStat && (
                  <span style={{ color: "#d9534f", fontSize: "13px" }}>
                    (requiere {requirement.missingStat.min} {requirement.missingStat.stat})
                  </span>
                )}
              </span>
            </button>
            {isBlocked && hoveredRequirementHint === hintKey && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "rgba(18,10,5,0.92)",
                  border: "1px solid rgba(240,192,64,0.4)",
                  color: "#f3dfb0",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: "0.4px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                }}
              >
                {requirementMessage}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
