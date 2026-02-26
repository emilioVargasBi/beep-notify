function x(n = "bottom-right") {
  let e = document.querySelector(
    `.beep-container[data-position="${n}"]`
  );
  if (!e) {
    switch (e = document.createElement("div"), e.className = "beep-container", e.setAttribute("data-position", n), e.style.zIndex = "9999", n) {
      case "top-right":
        e.style.top = "1rem", e.style.right = "2rem";
        break;
      case "top-left":
        e.style.top = "1rem", e.style.left = "2rem";
        break;
      case "bottom-right":
        e.style.bottom = "1rem", e.style.right = "2rem";
        break;
      case "bottom-left":
        e.style.bottom = "1rem", e.style.left = "2rem";
        break;
      case "top-center":
        e.style.top = "1rem", e.style.left = "50%", e.style.transform = "translateX(-50%)";
        break;
      case "bottom-center":
        e.style.bottom = "1rem", e.style.left = "50%", e.style.transform = "translateX(-50%)";
        break;
    }
    document.body.appendChild(e);
  }
  return e;
}
function k(n = !0) {
  if (!n) return;
  new Audio("/sounds/beep1.m4a").play().catch((b) => console.error("Error al reproducir el sonido:", b));
}
function I({
  message: n,
  type: e = "info",
  position: b = "bottom-right",
  duration: p = null,
  sound: E = !1,
  options: i
}) {
  const C = {
    success: "var(--color-border-success)",
    error: "var(--color-border-error)",
    info: "var(--color-border-info)",
    warning: "var(--color-border-warning)",
    danger: "var(--color-border-danger)"
  }, h = x(b), w = h.style.top && h.style.top !== "" ? "top" : "bottom", t = document.createElement("div");
  t.className = `beep-notification ${e} ${w}`, t.style.borderLeft = `7px solid ${C[e] || "#000000"}`, t.style.pointerEvents = "auto";
  const d = document.createElement("div");
  d.className = "beep-inner";
  const m = document.createElement("span");
  m.className = "beep-icon", m.innerHTML = N(e);
  const u = document.createElement("div");
  if (u.className = "beep-text", i?.closeButton) {
    const v = document.createElement("span");
    v.className = "beep-close", v.innerHTML = "x", v.addEventListener("click", () => {
      t.classList.add("fade-out"), t.addEventListener("animationend", () => t.remove(), {
        once: !0
      });
    }), d.appendChild(v);
  }
  i && i.html ? u.innerHTML = n : u.textContent = n, d.appendChild(m), d.appendChild(u), t.appendChild(d), h.appendChild(t), E && k();
  let o, a, c = p ?? 0, r = p ?? 0, s = 0, f, L, y;
  if (p != null) {
    let v = function() {
      a = Date.now(), o = setTimeout(() => {
        t.classList.add("fade-out"), t.addEventListener("animationend", () => t.remove(), {
          once: !0
        });
      }, c), f = document.createElement("div"), f.className = "beep-progress", f.style.width = "100%", t.appendChild(f), i?.showProgressBar && (L = setInterval(() => {
        const l = s + (Date.now() - a), g = Math.max(
          0,
          (r - l) / r * 100
        );
        f.style.width = g + "%";
      }, 50), y = setInterval(() => {
        const l = s + (Date.now() - a);
        Math.max(0, r - l) <= 0 && clearInterval(y);
      }, 100));
    }, T = function() {
      clearTimeout(o), clearInterval(L), clearInterval(y);
      const l = Date.now() - a;
      s += l, c -= l;
    }, B = function() {
      a = Date.now(), o = setTimeout(() => {
        t.classList.add("fade-out"), t.addEventListener("animationend", () => t.remove(), {
          once: !0
        });
      }, c), i?.showProgressBar && (L = setInterval(() => {
        const l = s + (Date.now() - a), g = Math.max(
          0,
          (r - l) / r * 100
        );
        f.style.width = g + "%";
      }, 50), y = setInterval(() => {
        const l = s + (Date.now() - a);
        Math.max(0, r - l) <= 0 && clearInterval(y);
      }, 100));
    };
    v(), i?.stopOnHover && (t.addEventListener("mouseenter", T), t.addEventListener("mouseleave", B));
  }
}
function N(n) {
  switch (n) {
    case "success":
      return '<svg style="color:#65a30d" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    case "error":
    case "danger":
      return '<svg style="color:#dc2626" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M6 18L18 6"/></svg>';
    case "info":
      return '<svg style="color:#0284c7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="1" fill="currentColor"/></svg>';
    case "warning":
      return '<svg style="color:#ea580c" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 22h20L12 2z"/><line x1="12" y1="8" x2="12" y2="14"/><circle cx="12" cy="18" r="1" fill="currentColor"/></svg>';
    default:
      return "";
  }
}
function M({
  message: n,
  type: e = "info",
  position: b = "bottom-right",
  duration: p,
  acceptText: E = "Aceptar",
  rejectText: i = "Cancelar",
  html: C = !1,
  options: h,
  onAccept: w = () => {
  },
  onReject: t = () => {
  },
  onTimeout: d = () => {
  }
}) {
  const m = x(b), u = m.style.bottom && m.style.bottom !== "" ? "top" : "bottom", o = document.createElement("div");
  o.className = `beep-notification ${e} ${u}`;
  const a = document.createElement("div");
  C ? a.innerHTML = n : a.textContent = n, o.appendChild(a);
  const c = document.createElement("div");
  c.className = "beep-actions";
  const r = document.createElement("button");
  r.textContent = E, r.className = "beep-accept";
  const s = document.createElement("button");
  s.textContent = i, s.className = "beep-reject", h?.reverseButtons ? (c.appendChild(r), c.appendChild(s)) : (c.appendChild(s), c.appendChild(r)), o.appendChild(c), m.appendChild(o), r.addEventListener("click", () => {
    o.remove(), w();
  }), s.addEventListener("click", () => {
    o.remove(), t();
  }), p && setTimeout(() => {
    o.classList.add("fade-out"), o.addEventListener("animationend", () => o.remove(), { once: !0 }), d();
  }, p);
}
const D = {
  toast: I,
  action: M,
  playSound: k
};
export {
  D as default
};
