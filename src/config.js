// ============================================================
//  CONFIG DU SITE — modifie seulement ce fichier
// ============================================================
export const SITE = {
  name: "Repulsion FA",              // nom du serveur (affiché partout)
  shortName: "REPULSION",            // grand mot en fond du haut de page
  tagline: "Serveur GTA V Roleplay · Francophone",
  discord: "https://discord.gg/HrKCcbgXZR",
  // Code cfx.re du serveur (ex: "abc123" dans cfx.re/join/abc123).
  // Laisse vide pour masquer le compteur de joueurs.
  cfxCode: "",
  maxPlayers: 64,                    // utilisé si l'API ne répond pas
  // Vidéo de fond du haut de page (muette, en boucle). Dépose le fichier dans
  // public/media/ puis mets son chemin, ex: "/media/hero.mp4". Vide = pas de vidéo.
  heroVideo: "",
};

// Bandeau de chiffres sous le haut de page — À REMPLACER par tes vrais chiffres
export const STATS = [
  { value: SITE.maxPlayers, label: "Places en ville" },
  { value: 30, suffix: "+", label: "Métiers et activités" },
  { value: 100, suffix: " %", label: "Scripts maison" },
  { value: 24, suffix: "h/24", label: "Serveur ouvert" },
];

export const joinUrl = SITE.cfxCode
  ? `fivem://connect/cfx.re/join/${SITE.cfxCode}`
  : SITE.discord;
