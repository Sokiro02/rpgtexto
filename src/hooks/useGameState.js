import { useEffect, useRef, useState } from "react";
import {
  getMuted,
  playGameMusic,
  playIntroMusic,
  setMuted as setAudioMuted,
  stopAll,
} from "../audio/audioManager";
import { STORY } from "../data/story";
import {
  incrementPartidas,
  loadAchievements,
  loadProgress,
  saveAchievements,
  saveProgress,
} from "../lib/gameDB";
import { getBgForLocation } from "../utils/backgrounds";

const DEFAULT_STATS = { vida: 100, mana: 80, oro: 10, experiencia: 0 };
const DEFAULT_INVENTORY = ["Daga oxidada", "Capa raída"];
const DEFAULT_ACHIEVEMENTS = {
  ending_hero: false,
  ending_dark: false,
  ending_dead: false,
  ending_exile: false,
  items_collected: [],
  nodes_visited: [],
  partidas_jugadas: 0,
};

const uniqueValues = (values) => Array.from(new Set(values));

const normalizeStats = (stats) => ({
  vida: typeof stats?.vida === "number" ? stats.vida : DEFAULT_STATS.vida,
  mana: typeof stats?.mana === "number" ? stats.mana : DEFAULT_STATS.mana,
  oro: typeof stats?.oro === "number" ? stats.oro : DEFAULT_STATS.oro,
  experiencia:
    typeof stats?.experiencia === "number"
      ? stats.experiencia
      : DEFAULT_STATS.experiencia,
});

const normalizeAchievements = (achievements) => ({
  ...DEFAULT_ACHIEVEMENTS,
  ...achievements,
  items_collected: Array.isArray(achievements?.items_collected)
    ? achievements.items_collected
    : [],
  nodes_visited: Array.isArray(achievements?.nodes_visited)
    ? achievements.nodes_visited
    : [],
  partidas_jugadas:
    typeof achievements?.partidas_jugadas === "number"
      ? achievements.partidas_jugadas
      : 0,
});

export function useGameState(user) {
  const [screen, setScreen] = useState("intro");
  const [playerName, setPlayerName] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);
  const [history, setHistory] = useState(["start"]);
  const [visitedNodes, setVisitedNodes] = useState(["start"]);
  const [achievements, setAchievements] = useState(DEFAULT_ACHIEVEMENTS);
  const [narrationVisible, setNarrationVisible] = useState(false);
  const [choicesVisible, setChoicesVisible] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [muted, setMuted] = useState(getMuted());
  const [newItemAnimation, setNewItemAnimation] = useState(null);
  const [highlightedInventoryItem, setHighlightedInventoryItem] = useState(null);
  const highlightTimeoutRef = useRef(null);

  const currentNode = STORY[currentNodeId];
  const atmosphere = currentNode?.atmosphere;
  const location = currentNode?.location;

  useEffect(() => {
    if (screen === "intro" || screen === "name") {
      playIntroMusic();
      return;
    }

    if (screen === "game") {
      playGameMusic();
    }
  }, [screen]);

  useEffect(
    () => () => {
      stopAll();
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    let cancelled = false;

    const hydrateAchievements = async () => {
      if (!user?.id) {
        if (!cancelled) {
          setAchievements(DEFAULT_ACHIEVEMENTS);
        }
        return;
      }

      const data = await loadAchievements(user.id);
      if (!cancelled) {
        setAchievements(normalizeAchievements(data));
      }
    };

    void hydrateAchievements();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const applyNode = async (node, choiceStatChanges = {}, options = {}) => {
    if (!node) return;

    const nextStats = {
      vida: Math.max(
        0,
        Math.min(100, stats.vida + (choiceStatChanges.vida || 0) + (node.statChanges.vida || 0))
      ),
      mana: Math.max(
        0,
        Math.min(100, stats.mana + (choiceStatChanges.mana || 0) + (node.statChanges.mana || 0))
      ),
      oro: Math.max(0, stats.oro + (choiceStatChanges.oro || 0) + (node.statChanges.oro || 0)),
      experiencia:
        stats.experiencia +
        (choiceStatChanges.experiencia || 0) +
        (node.statChanges.experiencia || 0),
    };
    const nextInventory = node.newItem
      ? uniqueValues([...inventory, node.newItem])
      : inventory;
    const nextVisitedNodes = uniqueValues([...(visitedNodes || []), node.id]);
    const nextHistory = [...history, node.id];
    const nextAchievements = {
      ...achievements,
      items_collected: uniqueValues([
        ...(achievements.items_collected || []),
        ...nextInventory,
      ]),
      nodes_visited: uniqueValues([
        ...(achievements.nodes_visited || []),
        ...nextVisitedNodes,
      ]),
    };

    setStats(nextStats);
    setInventory(nextInventory);
    setVisitedNodes(nextVisitedNodes);
    setHistory(nextHistory);

    if (node.newItem) {
      setNewItemAnimation(node.newItem);
      setHighlightedInventoryItem(node.newItem);
      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
      }
      highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedInventoryItem((current) => (current === node.newItem ? null : current));
        highlightTimeoutRef.current = null;
      }, 1500);
    }

    setCurrentNodeId(node.id);
    setAchievements(nextAchievements);

    if (user?.id && options.persist !== false) {
      await saveProgress(
        user.id,
        options.playerName || playerName,
        node.id,
        nextStats,
        nextInventory,
        nextVisitedNodes
      );
    }

    if (user?.id && node.isEnding) {
      const endingKey = node.id;
      const endingFlags = {
        ending_hero: endingKey === "ending_hero" || nextAchievements.ending_hero,
        ending_dark: endingKey === "ending_dark" || nextAchievements.ending_dark,
        ending_dead: endingKey === "ending_dead" || nextAchievements.ending_dead,
        ending_exile: endingKey === "ending_exile" || nextAchievements.ending_exile,
      };

      const persistedAchievements = {
        ...nextAchievements,
        ...endingFlags,
      };

      setAchievements(persistedAchievements);
      await saveAchievements(user.id, persistedAchievements);
    }

    return {
      nextStats,
      nextInventory,
      nextVisitedNodes,
      nextAchievements,
    };
  };

  const goToName = () => {
    setScreen("name");
  };

  const startGame = async (name) => {
    let nextPlayerName = name;
    let nextNodeId = "start";
    let nextStats = DEFAULT_STATS;
    let nextInventory = DEFAULT_INVENTORY;
    let nextVisitedNodes = ["start"];
    let nextHistory = ["start"];
    let nextAchievements = achievements;

    if (user?.id) {
      const [progress, storedAchievements] = await Promise.all([
        loadProgress(user.id),
        loadAchievements(user.id),
      ]);

      if (progress) {
        nextPlayerName = progress.player_name || name;
        nextNodeId = progress.current_node || "start";
        nextStats = normalizeStats(progress.stats);
        nextInventory = Array.isArray(progress.inventory)
          ? progress.inventory
          : DEFAULT_INVENTORY;
        nextVisitedNodes = uniqueValues([
          ...(Array.isArray(progress.visited_nodes) ? progress.visited_nodes : []),
          nextNodeId,
        ]);
        nextHistory = nextVisitedNodes;
      } else {
        const partidasJugadas = await incrementPartidas(user.id);
        nextAchievements = normalizeAchievements(storedAchievements);
        nextAchievements.partidas_jugadas = partidasJugadas;
        await saveProgress(
          user.id,
          name,
          "start",
          DEFAULT_STATS,
          DEFAULT_INVENTORY,
          ["start"]
        );
      }

      if (storedAchievements || !progress) {
        nextAchievements = {
          ...normalizeAchievements(storedAchievements),
          partidas_jugadas:
            nextAchievements.partidas_jugadas ||
            normalizeAchievements(storedAchievements).partidas_jugadas,
        };
      }
    } else {
      nextAchievements = DEFAULT_ACHIEVEMENTS;
    }

    setPlayerName(nextPlayerName);
    setScreen("game");
    setCurrentNodeId(nextNodeId);
    setStats(nextStats);
    setInventory(nextInventory);
    setVisitedNodes(nextVisitedNodes);
    setHistory(nextHistory);
    setAchievements(nextAchievements);
    setNarrationVisible(false);
    setChoicesVisible(false);
    setTimeout(() => setNarrationVisible(true), 150);
    setTimeout(() => setChoicesVisible(true), 700);
  };

  const makeChoice = async (choice, index) => {
    if (transitioning) return;
    setSelectedChoice(index);
    setNarrationVisible(false);
    setChoicesVisible(false);
    setTransitioning(true);

    const nextNode = STORY[choice.nextId];
    if (!nextNode) return;

    if (nextNode.location) {
      const img = new Image();
      img.src = getBgForLocation(nextNode.location, nextNode.atmosphere);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    await applyNode(nextNode, choice.statChanges || {});
    setSelectedChoice(null);
    setTransitioning(false);
    setTimeout(() => setNarrationVisible(true), 100);
    setTimeout(() => setChoicesVisible(true), 700);
  };

  const restartGame = () => {
    setCurrentNodeId("start");
    setStats(DEFAULT_STATS);
    setInventory(DEFAULT_INVENTORY);
    setHistory(["start"]);
    setVisitedNodes(["start"]);
    setNewItemAnimation(null);
    setHighlightedInventoryItem(null);
    setNarrationVisible(false);
    setChoicesVisible(false);
    setTimeout(() => setNarrationVisible(true), 150);
    setTimeout(() => setChoicesVisible(true), 700);
  };

  const toggleMuted = () => {
    const nextMuted = !muted;
    setAudioMuted(nextMuted);
    setMuted(nextMuted);
  };

  return {
    screen,
    playerName,
    currentNode,
    stats,
    inventory,
    history,
    visitedNodes,
    achievements,
    narrationVisible,
    choicesVisible,
    selectedChoice,
    atmosphere,
    location,
    transitioning,
    muted,
    newItemAnimation,
    highlightedInventoryItem,
    goToName,
    startGame,
    applyNode,
    makeChoice,
    restartGame,
    toggleMuted,
    clearNewItemAnimation: () => setNewItemAnimation(null),
  };
}
