import { Link } from "react-router-dom";
import { SITE, STATS, joinUrl } from "../config.js";
import useServerStatus from "../hooks/useServerStatus.js";
import useReveal from "../hooks/useReveal.js";
import Card from "../components/Card.jsx";
import TypedTitle from "../components/TypedTitle.jsx";
import HeroLogo from "../components/HeroLogo.jsx";
import GoldParticles from "../components/GoldParticles.jsx";
import Stats from "../components/Stats.jsx";
import Strip from "../components/Strip.jsx";
import HeroBackground from "../components/HeroBackground.jsx";
import { StatusDot } from "../components/Nav.jsx";
import { Code, Users, Dollar, Bolt, Bag, Star, Gift, Trophy } from "../components/Icons.jsx";

// Images de la bande qui défile : à déposer dans public/media/
const SHOTS = [
  { src: "/media/shot-1.webp", label: "Les rues" },
  { src: "/media/shot-2.webp", label: "Les gangs" },
  { src: "/media/shot-3.webp", label: "Les personnages" },
  { src: "/media/shot-4.webp", label: "Les mises à jour" },
  { src: "/media/shot-5.webp", label: "La ville la nuit" },
  { src: "/media/shot-6.webp", label: "L'écran de chargement" },
];

const FEATURES = [
  { icon: <Code />, title: "Scripts sur mesure", text: "Inventaire, métiers, commerces, téléphone : développés pour le serveur et corrigés rapidement quand un bug remonte." },
  { icon: <Users />, title: "Un RP sérieux mais accessible", text: "Des règles claires et courtes, appliquées de la même façon pour tout le monde. Débutants bienvenus." },
  { icon: <Dollar />, title: "Économie équilibrée", text: "Prix, salaires et stocks suivis par l'équipe pour que l'argent garde de la valeur sur la durée." },
  { icon: <Bolt />, title: "Optimisé", text: "Chaque ressource est surveillée au resmon. Moins de lag, plus d'images par seconde, même en centre-ville." },
];

const STEPS = [
  { title: "Rejoins le Discord", text: "Annonces, support, candidatures : tout se passe là-bas." },
  { title: "Lis le règlement", text: "Quelques minutes de lecture qui t'éviteront la plupart des sanctions." },
  { title: "Crée ton personnage", text: "Nom, histoire, apparence. Puis lance-toi en ville, libre de ton parcours." },
];

const EXTRAS = [
  { icon: <Bag />, title: "Boutique", text: "Uniquement du cosmétique. Aucun achat ne donne d'avantage en jeu." },
  { icon: <Star />, title: "VIP", text: "File d'attente prioritaire et slots de personnage en plus." },
  { icon: <Gift />, title: "Mystery Box", text: "Des lots surprises ouverts en live sur le Discord." },
  { icon: <Trophy />, title: "Giveaways", text: "Réguliers, annoncés à l'avance et ouverts à tous." },
];

const ext = { target: "_blank", rel: "noopener noreferrer" };

export default function Home() {
  const status = useServerStatus();
  useReveal();

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <HeroBackground />
        <GoldParticles />
        <HeroLogo alt={`Logo ${SITE.name}`} />
        <div className="page">
          <div className="hero-inner">
            <span className="eyebrow">{SITE.tagline}</span>
            <TypedTitle line1="Ta ville." line2="Ton histoire." />
            <p>Un serveur pensé pour le roleplay, avec des scripts développés et maintenus par l'équipe. Fluide, stable, et une staff qui écoute vraiment les retours.</p>
            <div className="hero-cta">
              <a className="btn btn-primary breathe" href={SITE.discord} {...ext}>Rejoindre le Discord</a>
              <a className="btn" href={joinUrl}>Se connecter en jeu</a>
              <Link className="btn" to="/reglement#documentation">Lire la documentation</Link>
            </div>
            {status && (
              <div className="hero-online">
                <StatusDot status={status} />
                <div>
                  <small>{status.online ? "EN LIGNE" : "HORS LIGNE"}</small>
                  <strong>{status.players} <span>/ {status.max} joueurs</span></strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <Stats items={STATS} />

      {/* UNIVERS */}
      <section className="block" style={{ paddingBottom: 40 }}>
        <div className="page head reveal">
          <span className="eyebrow">L'univers</span>
          <h2>Un aperçu de la ville.</h2>
        </div>
        <Strip shots={SHOTS} />
      </section>

      {/* ATOUTS */}
      <section className="block">
        <div className="page">
          <div className="head reveal">
            <span className="eyebrow">Ce qui nous distingue</span>
            <h2>Quatre engagements.</h2>
          </div>
          <div className="grid">
            {FEATURES.map((f) => <Card key={f.title} icon={f.icon} title={f.title}>{f.text}</Card>)}
          </div>
        </div>
      </section>

      {/* EMBLÈME */}
      <section className="block">
        <div className="page">
          <div className="split reveal">
            <div className="split-img">
              <img className="contain" src="/media/logo.webp" alt={`Logo ${SITE.name}`} loading="lazy" />
            </div>
            <div>
              <div className="head">
                <span className="eyebrow">L'emblème</span>
                <h2>La couronne se mérite.</h2>
                <p>Le R couronné, tu le croiseras sur l'écran de chargement, dans les annonces et sur les récompenses des événements. À toi d'écrire ton nom dans la ville.</p>
              </div>
              <a className="btn btn-primary" href={SITE.discord} {...ext}>Voir les annonces</a>
            </div>
          </div>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="block">
        <div className="page">
          <div className="head reveal">
            <span className="eyebrow">Premiers pas</span>
            <h2>Trois étapes pour commencer.</h2>
          </div>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step reveal" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOUR DU JEU */}
      <section className="block">
        <div className="page">
          <div className="head reveal">
            <span className="eyebrow">Autour du jeu</span>
            <h2>Soutenir sans payer pour gagner.</h2>
          </div>
          <div className="grid">
            {EXTRAS.map((f) => <Card key={f.title} icon={f.icon} title={f.title}>{f.text}</Card>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="block" style={{ paddingTop: 20 }}>
        <div className="page">
          <div className="cta reveal">
            <h2>Rejoins l'aventure.</h2>
            <p>Annonces, ouverture, recrutements : tout se passe sur le Discord de {SITE.name}.</p>
            <a className="btn btn-primary breathe" href={SITE.discord} {...ext}>Rejoindre le Discord</a>
          </div>
        </div>
      </section>
    </main>
  );
}
