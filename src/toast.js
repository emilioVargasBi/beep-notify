import { getContainer } from "./container.js";

export function toast({ message, type = "info", duration = 3000, sound = true, options }) {
    const borderColor = {
        "success": "#065F46",
        "error": "#B91C1C",
        "info": "#1E40AF",
        "warning": "#78350F",
        "danger": "#B91C1C"
    };

    // Crear contenedor si no existe
    const container = getContainer(options?.position);
    // Crear notificación
    const notif = document.createElement("div");
    notif.className = `beep-notification ${type}`;
    notif.style.borderLeft = `7px solid ${borderColor[type] || '#000000'}`;
    notif.style.pointerEvents = "auto"; // importante si hay botones

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
        const audio = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=');
        audio.play();
    }

    let timeoutId;
    let startTime;
    let remaining = duration;

    function startTimer() {
        startTime = Date.now();

        timeoutId = setTimeout(() => {
            notif.classList.add('fade-out');
            notif.addEventListener('animationend', () => notif.remove(), { once: true });
        }, remaining);
    }

    function pauseTimer() {
        clearTimeout(timeoutId);
        remaining -= Date.now() - startTime;
    }

    function resumeTimer() {
        startTimer();
    }

    if (duration) {
        startTimer();

        if (options?.stopOnHover) {
            notif.addEventListener('mouseenter', pauseTimer);
            notif.addEventListener('mouseleave', resumeTimer);
        }
    }
}

// Función de iconos
function getIconSVG(type) {
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