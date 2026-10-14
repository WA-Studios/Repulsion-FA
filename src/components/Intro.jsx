import { useEffect, useState } from "react";

const KEY = "repulsion-intro-vue";
const LENGTH = 1000; // durée de l'intro avant le fondu de sortie (ms)
const FADE = 450;    // durée du fondu de sortie (ms)

// Décidé une seule fois, avant le premier rendu : intro seulement
// à la première page vue de la visite (sessionStorage).
const shouldPlay = (() => {
  if (typeof window === "undefined") return false;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem(KEY)) return false;
    sessionStorage.setItem(KEY, "1");
  } catch { /* stockage bloqué : on joue l'intro quand même */ }
  return true;
})();

// Les animations du haut de page attendent la fin de l'intro
if (shouldPlay) document.documentElement.style.setProperty("--intro-delay", `${LENGTH}ms`);

// Écran d'intro : le R apparaît, puis la couronne tombe dessus
export default function Intro() {
  const [phase, setPhase] = useState(shouldPlay ? "play" : "done");

  // play → (1 s ou clic) → leave → (fondu) → done
  useEffect(() => {
    if (phase === "done") { document.body.style.overflow = ""; return; }
    document.body.style.overflow = "hidden";
    const t = phase === "play"
      ? setTimeout(() => setPhase("leave"), LENGTH)
      : setTimeout(() => setPhase("done"), FADE);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`intro ${phase === "leave" ? "intro-leave" : ""}`}
      aria-hidden="true"
      onClick={() => setPhase("leave")}
    >
      <div className="intro-logo">
        <img className="intro-r" src="/media/logo.webp" alt="" />
        <img className="intro-crown" src="/media/logo.webp" alt="" />
        <span className="intro-flash" />
      </div>
    </div>
  );
}
