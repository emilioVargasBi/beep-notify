import { getContainer } from "./container";
import { ToastOptions, BeepType } from "./types";
import { playSound } from "./sound";

export function toast({
  message,
  type = "info",
  position = "bottom-right",
  duration = null,
  sound = false,
  options,
}: ToastOptions): void {

  const borderColor: Record<BeepType, string> = {
    success: "var(--color-border-success)",
    error: "var(--color-border-error)",
    info: "var(--color-border-info)",
    warning: "var(--color-border-warning)",
    danger: "var(--color-border-danger)",
  };

  // Crear contenedor si no existe
  const container = getContainer(position);
  const positionName = container.style.top && container.style.top !== "" ? "top" : "bottom";
  // Crear notificación
  const notif = document.createElement("div");
  notif.className = `beep-notification ${type} ${positionName}`;
  notif.style.borderLeft = `7px solid ${borderColor[type] || "#000000"}`;
  notif.style.pointerEvents = "auto";

  // Contenedor interno flex: icono a la izquierda, texto a la derecha
  const inner = document.createElement("div");
  inner.className = "beep-inner";

  // Icono
  const iconSpan = document.createElement("span");
  iconSpan.className = "beep-icon";
  iconSpan.innerHTML = getIconSVG(type);

  // Texto
  const textSpan = document.createElement("div");
  textSpan.className = "beep-text";

  // botón de cerrar
  if (options?.closeButton) {
    const closeBtn = document.createElement("span");
    closeBtn.className = "beep-close";
    closeBtn.innerHTML = "x";

    closeBtn.addEventListener("click", () => {
      notif.classList.add("fade-out");
      notif.addEventListener("animationend", () => notif.remove(), {
        once: true,
      });
    });

    inner.appendChild(closeBtn);
  }

  if (options && options.html) {
    textSpan.innerHTML = message;
  } else {
    textSpan.textContent = message;
  }

  // Montamos todo
  inner.appendChild(iconSpan);
  inner.appendChild(textSpan);
  notif.appendChild(inner);

  // **Agregar notificación al contenedor**
  container.appendChild(notif);

  // Sonido
  if (sound) {
    playSound();
  }

  let timeoutId: NodeJS.Timeout;
  let startTime: number;
  let remaining: number = duration ?? 0;
  let totalDuration = duration ?? 0;
  let totalElapsed: number = 0;
  let progressBar: HTMLDivElement;
  let progressInterval: NodeJS.Timeout;
  let counterInterval: NodeJS.Timeout;

  if (duration) {
    function startTimer() {
      startTime = Date.now();

      timeoutId = setTimeout(() => {
        notif.classList.add("fade-out");
        notif.addEventListener("animationend", () => notif.remove(), {
          once: true,
        });
      }, remaining);

      // barra de progreso
      progressBar = document.createElement("div");
      progressBar.className = "beep-progress";
      progressBar.style.width = "100%";
      notif.appendChild(progressBar);

      if (options?.showProgressBar) {
        progressInterval = setInterval(() => {
          const currentElapsed = totalElapsed + (Date.now() - startTime);
          const progress = Math.max(
            0,
            ((totalDuration - currentElapsed) / totalDuration) * 100,
          );
          progressBar.style.width = progress + "%";
        }, 50);

        counterInterval = setInterval(() => {
          const currentElapsed = totalElapsed + (Date.now() - startTime);
          const timeLeft = Math.max(0, totalDuration - currentElapsed);

          if (timeLeft <= 0) {
            clearInterval(counterInterval);
          }
        }, 100);
      }
    }

    function pauseTimer() {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
      clearInterval(counterInterval);

      const elapsedThisSession = Date.now() - startTime;
      totalElapsed += elapsedThisSession;
      remaining -= elapsedThisSession;
    }

    function resumeTimer() {
      startTime = Date.now();

      timeoutId = setTimeout(() => {
        notif.classList.add("fade-out");
        notif.addEventListener("animationend", () => notif.remove(), {
          once: true,
        });
      }, remaining);

      if (options?.showProgressBar) {
        progressInterval = setInterval(() => {
          const currentElapsed = totalElapsed + (Date.now() - startTime);
          const progress = Math.max(
            0,
            ((totalDuration - currentElapsed) / totalDuration) * 100,
          );
          progressBar.style.width = progress + "%";
        }, 50);

        counterInterval = setInterval(() => {
          const currentElapsed = totalElapsed + (Date.now() - startTime);
          const timeLeft = Math.max(0, totalDuration - currentElapsed);

          if (timeLeft <= 0) {
            clearInterval(counterInterval);
          }
        }, 100);
      }
    }

    startTimer();

    if (options?.stopOnHover) {
      notif.addEventListener("mouseenter", pauseTimer);
      notif.addEventListener("mouseleave", resumeTimer);
    }
  }
}

// Función de iconos
function getIconSVG(type: BeepType): string {
  switch (type) {
    case "success":
      return `<svg style="color:#65a30d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`;
    case "error":
    case "danger":
      return `<svg style="color:#dc2626" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M6 18L18 6"/></svg>`;
    case "info":
      return `<svg style="color:#0284c7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>`;
    case "warning":
      return `<svg style="color:#ea580c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 22h20L12 2z"/><line x1="12" y1="8" x2="12" y2="14"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>`;
    default:
      return "";
  }
}
