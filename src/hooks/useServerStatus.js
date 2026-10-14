import { useEffect, useState } from "react";
import { SITE } from "../config.js";

// Joueurs en ligne via l'API publique FiveM. null = compteur masqué.
export default function useServerStatus() {
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (!SITE.cfxCode) return;
    let alive = true;
    fetch(`https://servers-frontend.fivem.net/api/servers/single/${SITE.cfxCode}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => alive && setStatus({
        online: true,
        players: j.Data.clients ?? 0,
        max: j.Data.sv_maxclients ?? SITE.maxPlayers,
      }))
      .catch(() => alive && setStatus({ online: false, players: 0, max: SITE.maxPlayers }));
    return () => { alive = false; };
  }, []);
  return status;
}
