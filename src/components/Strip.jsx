import { useEffect, useRef } from "react";

const SPEED = 55;      // px/s en temps normal
const SLOW = 10;       // px/s quand la souris est sur la bande
const EASE = 4;        // vitesse de transition entre les deux (plus grand = plus vif)

// Image manquante : on garde le fond dégradé
const hideOnError = (e) => { e.currentTarget.style.visibility = "hidden"; };

// Bande d'images qui défile en boucle et ralentit en douceur au survol
export default function Strip({ shots }) {
  const strip = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    let x = 0, speed = SPEED, target = SPEED, raf = 0, last = 0, visible = false;

    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      speed += (target - speed) * Math.min(1, dt * EASE);
      // la liste est doublée : on boucle après une moitié (écart compris)
      const half = el.scrollWidth / 2 + gap / 2;
      x = (x + speed * dt) % half;
      el.style.transform = `translate3d(${-x}px, 0, 0)`;
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
    const onVis = () => (document.hidden ? stop() : start());
    const slow = () => { target = SLOW; };
    const fast = () => { target = SPEED; };

    io.observe(strip.current);
    document.addEventListener("visibilitychange", onVis);
    strip.current.addEventListener("pointerenter", slow);
    strip.current.addEventListener("pointerleave", fast);
    const s = strip.current;
    return () => {
      stop(); io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      s.removeEventListener("pointerenter", slow);
      s.removeEventListener("pointerleave", fast);
    };
  }, []);

  return (
    <div className="strip" ref={strip}>
      <div className="strip-track" ref={track}>
        {[...shots, ...shots].map((s, i) => (
          <div className="shot" key={i} aria-hidden={i >= shots.length}>
            <img src={s.src} alt="" loading="lazy" onError={hideOnError} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
