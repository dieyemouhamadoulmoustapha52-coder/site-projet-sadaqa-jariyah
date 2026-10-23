import './Hero.css';

const logo = '/images/logo-sadaqa.png';

export default function Hero() {
  return (
    <header className="hero" id="accueil">
      <div className="hero__voile" aria-hidden="true" />
      <div className="conteneur hero__contenu">
        <div className="hero__logo-conteneur">
          <img className="hero__logo" src={logo} alt="Logo du Projet Sadaqa Jariyah" />
        </div>
        <h1 className="hero__titre">Projet Sadaqa Jariyah</h1>
        <p className="hero__sous-titre">
          Une aumône durable dont les bienfaits continuent de profiter aux gens, longtemps après
          qu’elle a été donnée.
        </p>
        <a className="bouton-principal hero__bouton" href="#participer">
          Participer à l’initiative
        </a>
      </div>
    </header>
  );
}
