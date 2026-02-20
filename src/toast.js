export function toast({ message, type = "info", duration = 3000, sound = true, options }) {
    // Crear contenedor si no existe
    let container = document.querySelector(".beep-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "beep-container";
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = 9999;
        container.style.pointerEvents = "none"; // permite que las notificaciones tengan interacción
        document.body.appendChild(container);
    }

    // Crear notificación
    const notif = document.createElement("div");
    notif.className = `beep-notification ${type}`;
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

    // Remover después de duration con animación
    setTimeout(() => {
        notif.classList.add('fade-out');
        notif.addEventListener('animationend', () => notif.remove(), { once: true });
    }, duration);
}

// Función de iconos
function getIconSVG(type) {
    switch(type) {
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