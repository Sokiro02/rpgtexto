const introAudio = new Audio("/medieval-menu.mp3");
introAudio.loop = true;
introAudio.volume = 0.4;

const gameAudio = new Audio("/medieval-game.mp3");
gameAudio.loop = true;
gameAudio.volume = 0.35;

let muted = gameAudio.muted;

const syncMutedState = () => {
  introAudio.muted = muted;
  gameAudio.muted = muted;
};

export function playIntroMusic() {
  syncMutedState();
  gameAudio.pause();
  gameAudio.currentTime = 0;
  void introAudio.play().catch(() => {});
}

export function playGameMusic() {
  syncMutedState();
  introAudio.pause();
  introAudio.currentTime = 0;
  void gameAudio.play().catch(() => {});
}

export function stopAll() {
  introAudio.pause();
  introAudio.currentTime = 0;
  gameAudio.pause();
  gameAudio.currentTime = 0;
}

export function setMuted(value) {
  muted = value;
  syncMutedState();
}

export function getMuted() {
  return muted;
}
