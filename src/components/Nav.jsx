import { Link, NavLink, useLocation } from "react-router-dom";
import { SITE } from "../config.js";
import useServerStatus from "../hooks/useServerStatus.js";
import { Discord } from "./Icons.jsx";

export function StatusDot({ status }) {
  const cls = status ? (status.online ? "dot on" : "dot off") : "dot";
  return <span className={cls} />;
}

export default function Nav() {
  const status = useServerStatus();
  const { pathname, hash } = useLocation();
  const onDocs = pathname === "/reglement" && hash === "#documentation";

  return (
    <header className="nav">
      <Link to="/" className="brand">
        <span className="brand-logo"><img src="/media/logo.webp" alt="" /></span>
        <span>{SITE.name}</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>Accueil</NavLink>
        <Link to="/reglement#documentation" className={onDocs ? "active" : ""}>Documentation</Link>
        <Link to="/reglement" className={pathname === "/reglement" && !onDocs ? "active" : ""}>Règlement</Link>
      </nav>
      <div className="nav-right">
        {status && (
          <div className="status">
            <StatusDot status={status} />{status.players}/{status.max}
          </div>
        )}
        <a className="btn btn-primary btn-sm breathe" href={SITE.discord} target="_blank" rel="noopener noreferrer">
          <Discord /> Discord
        </a>
      </div>
    </header>
  );
}
