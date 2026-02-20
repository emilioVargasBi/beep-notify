export function getContainer() {
    let container = document.querySelector(".beep-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "beep-container";
        container.style.position = "fixed";
        container.style.top = "20px";
        container.style.right = "20px";
        container.style.zIndex = 9999;
        document.body.appendChild(container);
    }

    return container;
}