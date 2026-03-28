import { createElement } from "react";
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

export default function ItemCometa({ item, onComplete }) {
  const itemIcon = createElement(getItemIcon(item));

  return (
    <div
      className="item-cometa"
      onAnimationEnd={onComplete}
      style={{
        position: "fixed",
        left: "68%",
        top: "56%",
        zIndex: 20,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        minWidth: "140px",
        padding: "14px 16px",
        borderRadius: "12px",
        border: "1px solid rgba(240,192,64,0.65)",
        background: "rgba(24,12,2,0.82)",
        color: "#f8e4a4",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          lineHeight: 1,
          filter: "drop-shadow(0 0 10px rgba(240,192,64,0.75))",
        }}
      >
        {itemIcon}
      </div>
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "12px",
          letterSpacing: "1px",
          color: "#f0d080",
        }}
      >
        {item}
      </div>
    </div>
  );
}
