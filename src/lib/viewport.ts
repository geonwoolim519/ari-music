function appHeight() {
  const viewport = window.visualViewport;
  if (!viewport) return window.innerHeight;
  return viewport.height + viewport.offsetTop;
}

export function syncAppHeight() {
  document.documentElement.style.setProperty(
    "--app-height",
    `${Math.round(appHeight())}px`,
  );
}

export function bindAppHeight() {
  syncAppHeight();
  const viewport = window.visualViewport;
  viewport?.addEventListener("resize", syncAppHeight);
  viewport?.addEventListener("scroll", syncAppHeight);
  window.addEventListener("orientationchange", syncAppHeight);
  window.addEventListener("resize", syncAppHeight);
}
