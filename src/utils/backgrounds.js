export const LOCATION_BACKGROUNDS = {
  "Ruinas del Templo de Valdris": "/bg-ruinas-templo-valdris.webp",
  "Interior del Templo": "/bg-interior-templo.webp",
  "Bosque de Keth": "/bg-bosque-keth.webp",
  "Cruce de Caminos": "/bg-cruce-caminos.webp",
  "Bosque de Keth – Emboscada": "/bg-bosque-emboscada.webp",
  "Altar del Dragón Durmiente": "/bg-altar-dragon-durmiente.webp",
  "Pueblo de Keth": "/bg-pueblo-keth.webp",
  "Catacumbas del Este – Entrada": "/bg-catacumbas-entrada.webp",
  "Claro del Bosque": "/bg-claro-bosque..webp",
  "Altar del Poder Antiguo": "/bg-altar-poder-antiguo.webp",
  "Cámara del Ritual Oscuro": "/bg-camara-ritual-oscuro.webp",
  "Salón del Alcalde – Pueblo de Keth": "/bg-salon-alcalde-keth.webp",
  "Sala del Campeón – Catacumbas": "/bg-sala-campeon-catacumbas.webp",
  "Pico del Abismo – Guarida de Valdrix": "/bg-pico-abismo-guarida-valdrix.webp",
  "Pueblo de Keth – Día de la Victoria": "/bg-pueblo-keth-victoria..webp",
  "Trono de Obsidiana – Pico del Abismo": "/bg-trono-obsidiana..webp",
  "Pico del Abismo – El Último Sello": "/bg-pico-abismo-ultimo-sello.webp",
  "Camino sin nombre – Al borde de Valdris": "/bg-camino-sin-nombre.webp",
};

export const ATMOSPHERE_FALLBACK_BACKGROUNDS = {
  dark: "/bg-ruinas-templo-valdris.webp",
  mystic: "/bg-altar-poder-antiguo.webp",
  battle: "/bg-sala-campeon-catacumbas.webp",
  calm: "/bg-pueblo-keth.webp",
  danger: "/bg-pico-abismo-guarida-valdrix.webp",
};

export function getBgForLocation(location, atmosphere = "dark") {
  return (
    LOCATION_BACKGROUNDS[location] ||
    ATMOSPHERE_FALLBACK_BACKGROUNDS[atmosphere] ||
    ATMOSPHERE_FALLBACK_BACKGROUNDS.dark
  );
}
