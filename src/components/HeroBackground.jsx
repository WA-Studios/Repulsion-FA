import { useEffect, useRef, useState } from "react";
import { SITE } from "../config.js";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
// Pas de vidéo pour qui a activé l'économie de données
const saveData = () => navigator.connection?.saveData === true;

// Fond du haut de page : image + vidéo en boucle (si SITE.heroVideo est rempli)
// + grand mot en contour qui défile plus lentement que la page (parallaxe).
export default function HeroBackground() {
  const word = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const showVideo = Boolean(SITE.heroVideo) && !reduced() && !saveData();

  useEffect(() => {
    const el = word.current;
    if (!el || reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return; // haut de page plus visible
      el.style.transform = `translate3d(${y * -0.15}px, ${y * 0.45}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="hero-bg">
        {showVideo && (
          <video
            className={`hero-video ${videoReady ? "ready" : ""}`}
            src={SITE.heroVideo}
            autoPlay muted loop playsInline preload="auto"
            aria-hidden="true"
            onPlaying={() => setVideoReady(true)}
          />
        )}
      </div>
      <div className="hero-word" aria-hidden="true">
        <span ref={word}>{SITE.shortName}</span>
      </div>
    </>
  );
}
