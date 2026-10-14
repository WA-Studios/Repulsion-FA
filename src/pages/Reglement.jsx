import { useEffect, useState } from "react";
import { SITE } from "../config.js";

// Remplace ces règles par les tiennes
const SECTIONS = [
  {
    id: "general", title: "Général", rules: [
      ["Respect", "aucun propos discriminatoire, harcèlement ou insulte hors RP."],
      ["Âge minimum", "16 ans pour jouer sur le serveur."],
      ["Micro obligatoire", "et de qualité correcte."],
      ["Triche interdite", "mods menu, exploits de bugs et macros = ban définitif."],
    ],
  },
  {
    id: "roleplay", title: "Roleplay", rules: [
      ["No HRP", "reste dans ton personnage, utilise /ooc avec modération."],
      ["Fear RP", "ton personnage tient à sa vie : sous la menace d'une arme, tu obtempères."],
      ["No Powergaming", "pas d'actions impossibles ou forcées sur les autres joueurs."],
      ["No Metagaming", "n'utilise pas en jeu des infos obtenues hors RP (stream, Discord…)."],
      ["Pretium Doloris", "après une mort RP, tu oublies les circonstances de la scène."],
    ],
  },
  {
    id: "combat", title: "Combat & illégal", rules: [
      ["No RDM / VDM", "aucune agression sans raison RP valable."],
      ["Braquages", "nombre minimum de policiers en service requis (voir Discord)."],
      ["Zones safe", "hôpital, commissariat et spawn : aucune action illégale."],
    ],
    note: "En cas de doute sur une situation, ouvre un ticket sur le Discord avant d'agir.",
  },
  {
    id: "staff", title: "Staff & sanctions", rules: [
      [null, "Les décisions du staff s'appliquent immédiatement ; une contestation se fait par ticket, jamais en jeu."],
      [null, "Échelle : avertissement → kick → ban temporaire → ban définitif, selon la gravité."],
      [null, "Tout clip utile à un rapport doit être conservé 48 h."],
    ],
  },
  {
    id: "documentation", title: "Documentation", rules: [
      ["Se connecter", `lance FiveM, puis clique « Se connecter en jeu » sur l'accueil, ou cherche ${SITE.name} dans la liste des serveurs.`],
      ["Touches utiles", "F1 menu personnel, F2 inventaire, F3 téléphone, T chat."],
      ["Métiers", "rends-toi au Pôle emploi (marqué sur la carte) pour choisir un premier job."],
      ["Support", "un bug ou un souci ? Ouvre un ticket dans le salon dédié du Discord."],
    ],
  },
];

export default function Reglement() {
  const [active, setActive] = useState(SECTIONS[0].id);

  // Sommaire qui suit la lecture
  useEffect(() => {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.isIntersecting && setActive(en.target.id));
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".rule-sec").forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <main className="page doc">
      <aside className="toc">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? "active" : ""}>{s.title}</a>
        ))}
      </aside>

      <div className="doc-body">
        <span className="eyebrow">Règlement</span>
        <h1>Les règles de la <span className="grad">ville</span>.</h1>
        <p>En te connectant, tu acceptes ce règlement. Il est court exprès : lis-le en entier.</p>

        {SECTIONS.map((s, i) => (
          <section className="rule-sec" id={s.id} key={s.id}>
            <h2><b>{String(i + 1).padStart(2, "0")}</b> {s.title}</h2>
            <ol>
              {s.rules.map(([label, text], j) => (
                <li key={j}>{label ? <><strong>{label}</strong> — {text}</> : text}</li>
              ))}
            </ol>
            {s.note && <div className="note">{s.note}</div>}
          </section>
        ))}
      </div>
    </main>
  );
}
