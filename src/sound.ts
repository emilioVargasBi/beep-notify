export function playSound(sound: boolean = true): void {
  if (!sound) return;

  const audio = new Audio('/sounds/beep1.m4a'); // ruta desde la raíz del servidor
  audio.play().catch(err => console.error("Error al reproducir el sonido:", err));
}