import { useEffect, useRef, useState } from "react";

const DURATION = 1600; // ms
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const fmt = (n) => n.toLocaleString("fr-FR");

// Nombre qui monte de 0 à sa valeur la première fois qu'il arrive à l'écran
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    let raf = 0;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / DURATION);
        setN(Math.round(easeOut(p) * value));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return <strong ref={ref}>{fmt(n)}{suffix}</strong>;
}

export default function Stats({ items }) {
  return (
    <section className="stats-band">
      <div className="page">
        <div className="stats reveal">
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
