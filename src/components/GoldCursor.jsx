import { useEffect, useRef } from "react";

const FOLLOW = 0.18; // part du chemin parcourue à chaque image (traînée douce)
const HOT = "a, button, .card, .step, .shot";

// Halo doré qui suit la souris (ordinateur uniquement)
export default function GoldCursor() {
  const glow = useRef(null);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = glow.current;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;

    const frame = () => {
      x += (tx - x) * FOLLOW;
      y += (ty - y) * FOLLOW;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      // s'arrête une fois arrivé, repart au prochain mouvement
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(frame) : 0;
    };
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      if (x < 0) { x = e.clientX; y = e.clientY; } // première apparition : pas de glissade
      tx = e.clientX; ty = e.clientY;
      el.classList.add("on");
      el.classList.toggle("hot", Boolean(e.target.closest?.(HOT)));
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => el.classList.remove("on");
    const onDown = () => el.classList.add("press");
    const onUp = () => el.classList.remove("press");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return <div className="gold-cursor" ref={glow} aria-hidden="true" />;
}
