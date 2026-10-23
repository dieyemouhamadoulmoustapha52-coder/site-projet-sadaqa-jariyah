import './Footer.css';

const ANNEE = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="conteneur footer__contenu">
        <p className="footer__message">
          « La meilleure aumône est celle que l’on donne quand on se porte bien, quand on craint la
          pauvreté et qu’elle reste secrète. »
        </p>
        <p className="footer__copyright">
          © {ANNEE} Projet Sadaqa Jariyah — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
