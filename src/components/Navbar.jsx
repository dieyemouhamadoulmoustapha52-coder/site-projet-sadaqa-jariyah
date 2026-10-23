import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const logo = '/images/logo-sadaqa.png';

const LIENS = [
  { id: 'mission', libelle: 'Notre mission' },
  { id: 'definition', libelle: 'Sadaqa Jariyah' },
  { id: 'importance', libelle: 'Importance' },
  { id: 'structure-groupe', libelle: 'Structure' },
  { id: 'membres-bureau', libelle: 'Membres' },
  { id: 'participer', libelle: 'Participer' },
  { id: 'investir', libelle: 'Investir' },
];

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [actif, setActif] = useState('');
  const navRef = useRef(null);
  const minuteurSurvol = useRef(null);

  // Le menu se déroule au survol du bouton burger (souris/stylo uniquement :
  // sur écran tactile, le survol n'existe pas, on garde le clic).
  const entrerSurvol = (e) => {
    if (e.pointerType === 'touch') return;
    window.clearTimeout(minuteurSurvol.current);
    setSurvol(true);
  };

  const sortirSurvol = (e) => {
    if (e.pointerType === 'touch') return;
    window.clearTimeout(minuteurSurvol.current);
    // Court délai de grâce : le curseur passe du bouton au menu déroulant.
    minuteurSurvol.current = window.setTimeout(() => setSurvol(false), 280);
  };

  useEffect(() => () => window.clearTimeout(minuteurSurvol.current), []);

  const menuOuvert = ouvert || survol;

  useEffect(() => {
    const sections = LIENS.map(({ id }) => document.getElementById(id)).filter(Boolean);

    const observateur = new IntersectionObserver(
      (entrees) => {
        entrees.forEach((entree) => {
          if (entree.isIntersecting) {
            setActif(entree.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observateur.observe(section));
    return () => observateur.disconnect();
  }, []);

  // Ferme le menu mobile au clic extérieur et à la touche Échap.
  useEffect(() => {
    if (!menuOuvert) return undefined;

    const clicExtérieur = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOuvert(false);
        setSurvol(false);
      }
    };
    const echap = (e) => {
      if (e.key === 'Escape') {
        setOuvert(false);
        setSurvol(false);
      }
    };

    document.addEventListener('pointerdown', clicExtérieur);
    document.addEventListener('keydown', echap);
    return () => {
      document.removeEventListener('pointerdown', clicExtérieur);
      document.removeEventListener('keydown', echap);
    };
  }, [menuOuvert]);

  const gererClic = (id) => {
    setOuvert(false);
    setSurvol(false);
    setActif(id);
  };

  const basculerMenu = () => {
    // Un clic referme le menu même s'il a été ouvert par survol.
    setSurvol(false);
    setOuvert((o) => !o);
  };

  return (
    <nav ref={navRef} className="navbar" aria-label="Navigation principale">
      <div className="conteneur navbar__interieur">
        <a href="#accueil" className="navbar__logo" onClick={() => gererClic('accueil')}>
          <img src={logo} alt="Logo Projet Sadaqa Jariyah" loading="eager" />
          <span className="navbar__titre-logo">Sadaqa Jariyah</span>
        </a>

        <button
          type="button"
          className={`navbar__bascule ${menuOuvert ? 'est-ouvert' : ''}`}
          onClick={basculerMenu}
          onPointerEnter={entrerSurvol}
          onPointerLeave={sortirSurvol}
          onPointerCancel={sortirSurvol}
          aria-expanded={menuOuvert}
          aria-controls="menu-navigation"
        >
          <span className="navbar__barre" />
          <span className="navbar__barre" />
          <span className="navbar__barre" />
          <span className="sr-only">Ouvrir ou fermer le menu</span>
        </button>

        <ul
          id="menu-navigation"
          className={`navbar__liste ${menuOuvert ? 'navbar__liste--ouverte' : ''}`}
          onPointerEnter={entrerSurvol}
          onPointerLeave={sortirSurvol}
          onPointerCancel={sortirSurvol}
        >
          {LIENS.map(({ id, libelle }) => (
            <li key={id} className="navbar__item">
              <a
                href={`#${id}`}
                className={`navbar__lien ${actif === id ? 'navbar__lien--actif' : ''}`}
                onClick={() => gererClic(id)}
              >
                {libelle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
