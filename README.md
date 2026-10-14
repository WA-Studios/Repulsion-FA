# Repulsion-FA

Site du serveur GTA V RP **Repulsion FA** (FiveM) — React + Vite, prêt pour Vercel.

## Lancer en local

```bash
npm install
npm run dev
```

## Modifier

- `src/config.js` — nom, lien Discord, code cfx.re
- `src/pages/Home.jsx` — textes de l'accueil
- `src/pages/Reglement.jsx` — règlement et documentation
- `public/media/` — logo et images (`banner.webp`, `shot-1.webp` à `shot-6.webp`)

## Vercel

Importer le dépôt sur vercel.com : le preset **Vite** est détecté tout seul
(build `npm run build`, dossier `dist`). `vercel.json` gère les routes (`/reglement`).
