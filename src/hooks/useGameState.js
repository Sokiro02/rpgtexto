import { useEffect, useRef, useState } from "react";
import {
  getMuted,
  playGameMusic,
  playIntroMusic,
  setMuted as setAudioMuted,
  stopAll,
} from "../audio/audioManager";
import { STORY } from "../data/story";

const DEFAULT_STATS = { vida: 100, mana: 80, oro: 10, experiencia: 0 };
const DEFAULT_INVENTORY = ["Daga oxidada", "Capa raída"];

export function useGameState() {
  const [screen, setScreen] = useState("intro");
  const [playerName, setPlayerName] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState("start");
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [inventory, setInventory] = useState(DEFAULT_INVENTORY);
  const [history, setHistory] = useState(["start"]);
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

  const applyNode = (node, choiceStatChanges = {}) => {
    if (!node) return;

    setStats((prev) => ({
      vida: Math.max(
        0,
        Math.min(100, prev.vida + (choiceStatChanges.vida || 0) + (node.statChanges.vida || 0))
      ),
      mana: Math.max(
        0,
        Math.min(100, prev.mana + (choiceStatChanges.mana || 0) + (node.statChanges.mana || 0))
      ),
      oro: Math.max(0, prev.oro + (choiceStatChanges.oro || 0) + (node.statChanges.oro || 0)),
      experiencia:
        prev.experiencia +
        (choiceStatChanges.experiencia || 0) +
        (node.statChanges.experiencia || 0),
    }));

    if (node.newItem) {
      setInventory((prev) => (prev.includes(node.newItem) ? prev : [...prev, node.newItem]));
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
    setHistory((prev) => [...prev, node.id]);
  };

  const goToName = () => {
    setScreen("name");
  };

  const startGame = (name) => {
    setPlayerName(name);
    setScreen("game");
    setCurrentNodeId("start");
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

    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextNode = STORY[choice.nextId];
    if (!nextNode) return;

    applyNode(nextNode, choice.statChanges || {});
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
