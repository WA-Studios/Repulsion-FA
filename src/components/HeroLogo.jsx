import { useEffect, useRef } from "react";

const MAX_TILT = 12; // degrés

// Logo qui flotte, s'incline vers la souris et reçoit un reflet doré
export default function HeroLogo({ alt }) {
  const tilt = useRef(null);

  useEffect(() => {
    const el = tilt.current;
    const hero = el?.closest(".hero");
    if (!hero || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // -1 … 1 selon la position de la souris par rapport au centre du logo
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
        el.style.setProperty("--ry", `${x * MAX_TILT}deg`);
        el.style.setProperty("--rx", `${-y * MAX_TILT}deg`);
        el.style.setProperty("--gx", `${-x * 30}px`);
        el.style.setProperty("--gy", `${-y * 30}px`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      ["--rx", "--ry", "--gx", "--gy"].forEach((v) => el.style.removeProperty(v));
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="hero-logo">
      <div className="hero-tilt" ref={tilt}>
        <img src="/media/logo.webp" alt={alt} />
        <span className="hero-shine" aria-hidden="true" />
      </div>
    </div>
  );
}
