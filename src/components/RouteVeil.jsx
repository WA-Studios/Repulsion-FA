import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Voile doré qui s'efface à chaque changement de page (pas au premier chargement)
export default function RouteVeil() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setN((x) => x + 1);
  }, [pathname]);

  if (!n) return null;
  return <div className="route-veil" key={n} aria-hidden="true" onAnimationEnd={() => setN(0)} />;
}
