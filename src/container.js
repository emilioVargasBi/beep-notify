export function getContainer(position = 'bottom-right') {
    let container = document.querySelector(`.beep-container[data-position="${position}"]`);

    if (!container) {
        container = document.createElement("div");
        container.className = "beep-container";
        container.setAttribute('data-position', position);
        container.style.zIndex = 9999;

        switch(position) {
            case "top-right":
                container.style.top = "1rem";
                container.style.right = "2rem";
                break;
            case "top-left":
                container.style.top = "1rem";
                container.style.left = "2rem";
                break;
            case "bottom-right":
                container.style.bottom = "1rem";
                container.style.right = "2rem";
                break;
            case "bottom-left":
                container.style.bottom = "1rem";
                container.style.left = "2rem";
                break;
            case "top-center":
                container.style.top = "1rem";
                container.style.left = "50%";
                container.style.transform = "translateX(-50%)";
                break;
            case "bottom-center":
                container.style.bottom = "1rem";
                container.style.left = "50%";
                container.style.transform = "translateX(-50%)";
                break;
        }

        document.body.appendChild(container);

    }

    return container;
}