import { useEffect, useRef } from "react";

const DENSITY = 1 / 14000; // particules par pixel² d'écran
const MAX = 90;

// Paillettes dorées qui montent doucement dans le haut de page.
// S'arrête quand le haut de page n'est plus visible ou que l'onglet est caché.
export default function GoldParticles() {
  const canvas = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, dpr = 1, parts = [], raf = 0, visible = true, last = 0;

    const spawn = (anyY) => ({
      x: Math.random() * w,
      y: anyY ? Math.random() * h : h + 10,
      r: 0.6 + Math.random() * 1.8,
      vy: 8 + Math.random() * 22,          // px / s vers le haut
      sway: 6 + Math.random() * 14,        // amplitude du balancement
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      alpha: 0.25 + Math.random() * 0.6,
    });

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(MAX, Math.round(w * h * DENSITY));
      parts = Array.from({ length: n }, () => spawn(true));
    };

    const draw = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000 || 0);
      last = t;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of parts) {
        p.y -= p.vy * dt;
        p.phase += p.speed * dt;
        if (p.y < -10) Object.assign(p, spawn(false));
        const x = p.x + Math.sin(p.phase) * p.sway;
        // disparaît en approchant du haut
        const fade = Math.min(1, p.y / (h * 0.35));
        const a = p.alpha * fade * (0.7 + 0.3 * Math.sin(p.phase * 3));
        const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(255, 224, 138, ${a})`);
        g.addColorStop(1, "rgba(217, 154, 30, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      visible ? start() : stop();
    });
    const onVis = () => (document.hidden ? stop() : start());

    resize();
    io.observe(cv);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas className="hero-particles" ref={canvas} aria-hidden="true" />;
}
