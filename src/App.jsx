import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Intro from "./components/Intro.jsx";
import RouteVeil from "./components/RouteVeil.jsx";
import GoldCursor from "./components/GoldCursor.jsx";
import Home from "./pages/Home.jsx";
import Reglement from "./pages/Reglement.jsx";
import { SITE } from "./config.js";

// Remonte en haut à chaque page, ou va à l'ancre (#documentation…)
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = pathname.startsWith("/reglement")
      ? `Règlement — ${SITE.name}`
      : `${SITE.name} — Serveur GTA V RP francophone | FiveM`;
  }, [pathname]);

  return (
    <>
      <Intro />
      <ScrollManager />
      <Nav />
      <div className="route-in" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reglement" element={<Reglement />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <RouteVeil />
      <Footer />
      <GoldCursor />
    </>
  );
}
