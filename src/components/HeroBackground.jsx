import { useCallback, useEffect, useRef, useState } from "react";
import { SITE } from "../config.js";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
// Pas de vidéo pour qui a activé l'économie de données
const saveData = () => navigator.connection?.saveData === true;

// Identifiant d'une vidéo YouTube (watch?v=, youtu.be/, shorts/, embed/), sinon null
function youtubeId(url) {
  const m = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

const YT_ORIGIN = "https://www.youtube-nocookie.com";

// Lecteur YouTube muet, en boucle, sans contrôles, qui couvre tout le fond.
// Piloté par messages : il n'apparaît qu'une fois la lecture vraiment lancée
// (sinon on garde l'image de fond) et repart tout seul s'il se met en pause.
function YouTubeBackground({ id, onReady, ready }) {
  const frame = useRef(null);
  const params = new URLSearchParams({
    autoplay: "1", mute: "1", loop: "1", playlist: id, controls: "0",
    playsinline: "1", rel: "0", disablekb: "1", modestbranding: "1", iv_load_policy: "3",
    enablejsapi: "1", origin: window.location.origin,
  });

  useEffect(() => {
    const post = (msg) => frame.current?.contentWindow?.postMessage(JSON.stringify(msg), YT_ORIGIN);
    const send = (func) => post({ event: "command", func, args: [] });

    // Le lecteur n'écoute pas tout de suite : on se signale jusqu'à sa réponse
    let tries = 0;
    const ping = setInterval(() => {
      if (++tries > 40) clearInterval(ping);
      post({ event: "listening" });
    }, 250);

    const onMessage = (e) => {
      if (e.origin !== YT_ORIGIN || e.source !== frame.current?.contentWindow) return;
      let data;
      try { data = JSON.parse(e.data); } catch { return; }
      if (data.event === "onReady") { clearInterval(ping); send("mute"); send("playVideo"); }
      const state = data.info?.playerState;
      if (state === 1) onReady();                        // lecture en cours
      if (state === 2 || state === 0) send("playVideo"); // pause ou fin : on relance
    };
    window.addEventListener("message", onMessage);
    return () => { clearInterval(ping); window.removeEventListener("message", onMessage); };
  }, [onReady]);

  return (
    <iframe
      ref={frame}
      className={`hero-yt ${ready ? "ready" : ""}`}
      src={`${YT_ORIGIN}/embed/${id}?${params}`}
      title="Vidéo de fond"
      allow="autoplay; encrypted-media"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
}

// Fond du haut de page : image + vidéo en boucle (si SITE.heroVideo est rempli,
// fichier .mp4 ou lien YouTube) + grand mot en contour en parallaxe.
export default function HeroBackground() {
  const word = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const markReady = useCallback(() => setVideoReady(true), []);
  const showVideo = Boolean(SITE.heroVideo) && !reduced() && !saveData();
  const ytId = showVideo ? youtubeId(SITE.heroVideo) : null;

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
        {ytId && <YouTubeBackground id={ytId} ready={videoReady} onReady={markReady} />}
        {showVideo && !ytId && (
          <video
            className={`hero-video ${videoReady ? "ready" : ""}`}
            src={SITE.heroVideo}
            autoPlay muted loop playsInline preload="auto"
            aria-hidden="true"
            onPlaying={markReady}
          />
        )}
      </div>
      <div className="hero-word" aria-hidden="true">
        <span ref={word}>{SITE.shortName}</span>
      </div>
    </>
  );
}
