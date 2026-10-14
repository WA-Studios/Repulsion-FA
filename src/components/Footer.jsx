import { Link } from "react-router-dom";
import { SITE } from "../config.js";

export default function Footer() {
  return (
    <footer>
      <div className="page foot">
        <span>© {new Date().getFullYear()} {SITE.name} — Non affilié à Rockstar Games ni à Cfx.re.</span>
        <nav>
          <Link to="/reglement">Règlement</Link>
          <Link to="/reglement#documentation">Documentation</Link>
          <a href={SITE.discord} target="_blank" rel="noopener noreferrer">Discord</a>
        </nav>
      </div>
    </footer>
  );
}
