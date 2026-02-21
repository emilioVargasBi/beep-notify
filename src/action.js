import { getContainer } from "./container.js";

export function action({
    message,
    type = "info",
    acceptText = "Aceptar",
    rejectText = "Cancelar",
    duration = null,
    html = false,
    options = null,
    onAccept = () => {},
    onReject = () => {},
    onTimeout = () => {}
}) {
    const container = getContainer(options?.position);
    const position = container.style.bottom && container.style.bottom !== "" ? "top" : "bottom";

    const notif = document.createElement("div");
    notif.className = `beep-notification ${type} ${position}`;

    // Contenido
    const content = document.createElement("div");
    html ? content.innerHTML = message : content.textContent = message;
    notif.appendChild(content);

    // Botones
    const actions = document.createElement("div");
    actions.className = "beep-actions";

    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = acceptText;
    acceptBtn.className = "beep-accept";

    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = rejectText;
    rejectBtn.className = "beep-reject";

    if (!options?.reverseButtons) {
        actions.appendChild(rejectBtn);
        actions.appendChild(acceptBtn);
    } else {
        actions.appendChild(acceptBtn);
        actions.appendChild(rejectBtn);
    }
    notif.appendChild(actions);

    container.appendChild(notif);

    // Eventos
    acceptBtn.addEventListener("click", () => {
        notif.remove();
        onAccept();
    });

    rejectBtn.addEventListener("click", () => {
        notif.remove();
        onReject();
    });

    if (duration) {
        // Remover después de duration
    setTimeout(() => {
        notif.classList.add('fade-out');
        notif.addEventListener('animationend', () => notif.remove(), { once: true });
        onTimeout();
    }, duration);
    }
}