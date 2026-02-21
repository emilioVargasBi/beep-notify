import beepSound from './assets/sounds/beep1.m4a';

export function playSound(sound = true) {
  if (!sound) return;

  const audio = new Audio(beepSound);
  audio.play();
}