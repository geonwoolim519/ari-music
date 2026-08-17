import { useEffect, useRef } from "react";

type DragScrollOptions = {
  pageSnap?: boolean;
};

const DRAG_THRESHOLD = 10;

export function useDragScroll<T extends HTMLElement>(options: DragScrollOptions = {}) {
  const ref = useRef<T>(null);
  const pageSnap = options.pageSnap ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const state = {
      pointerId: null as number | null,
      pressed: false,
      dragging: false,
      ignoreClick: false,
      startX: 0,
      startY: 0,
      startScroll: 0,
    };

    const finish = () => {
      if (state.pointerId != null && el.hasPointerCapture(state.pointerId)) {
        el.releasePointerCapture(state.pointerId);
      }
      state.pressed = false;
      state.dragging = false;
      state.pointerId = null;
      el.style.removeProperty("scroll-snap-type");
      delete el.dataset.dragging;
    };

    const snapToPage = () => {
      const page = el.clientWidth;
      if (page <= 0) return;
      const delta = el.scrollLeft - state.startScroll;
      const fromPage = Math.round(state.startScroll / page);
      const threshold = Math.min(40, page * 0.1);
      let toPage = fromPage;
      if (delta > threshold) toPage = fromPage + 1;
      else if (delta < -threshold) toPage = fromPage - 1;
      const maxPage = Math.max(0, Math.round((el.scrollWidth - page) / page));
      toPage = Math.min(maxPage, Math.max(0, toPage));
      el.scrollTo({ left: toPage * page, behavior: "smooth" });
    };

    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (!pageSnap && event.pointerType === "touch") return;
      state.pointerId = event.pointerId;
      state.pressed = true;
      state.dragging = false;
      state.ignoreClick = false;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.startScroll = el.scrollLeft;
    };

    const move = (event: PointerEvent) => {
      if (!state.pressed || event.pointerId !== state.pointerId) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;

      if (!state.dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          finish();
          return;
        }
        state.dragging = true;
        state.ignoreClick = true;
        el.setPointerCapture(event.pointerId);
        el.style.setProperty("scroll-snap-type", "none", "important");
        el.dataset.dragging = "true";
      }

      event.preventDefault();
      el.scrollLeft = state.startScroll - dx;
    };

    const up = (event: PointerEvent) => {
      if (event.pointerId !== state.pointerId) return;
      const wasDragging = state.dragging;
      finish();
      if (pageSnap && wasDragging) snapToPage();
    };

    const click = (event: MouseEvent) => {
      if (!state.ignoreClick) return;
      event.preventDefault();
      event.stopPropagation();
      state.ignoreClick = false;
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move, { passive: false });
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
    };
  }, [pageSnap]);

  return ref;
}
