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
};

export const joinUrl = SITE.cfxCode
  ? `fivem://connect/cfx.re/join/${SITE.cfxCode}`
  : SITE.discord;
