import './CharitySection.css';

export default function CharitySection() {
  return (
    <section id="investir" className="charity">
      <div className="conteneur">
        <h2 className="charity__titre">Investir dans le sentier d&apos;Allah</h2>
        <p className="charity__paragraphe">
          Investir dans le Sentier d’Allah à travers le Sadaqa Jariyah est une œuvre dont la
          récompense dure au-delà de la vie. Allah dit : « Ceux qui dépensent de leurs biens dans le
          sentier d’Allah ressemblent à un grain qui produit sept épis, à cent grains chacun » (Coran
          2:261). Le Prophète ﷺ a également rappelé : « Quand l’homme meurt, ses œuvres s’arrêtent sauf
          trois choses : une aumône continue, un savoir utile, ou un enfant pieux qui prie pour lui »
          (Muslim). Contribuer à des projets durables — éducation, mosquées, puits, ou soutien aux
          nécessiteux — permet de multiplier les bénédictions et de laisser un impact éternel.
        </p>
        <p className="charity__paragraphe">
          Donner dans le bien, c’est protéger sa richesse et purifier son cœur. Engageons-nous à
          soutenir les bonnes causes et à aider ceux qui en ont besoin.
        </p>
        <a className="bouton-principal charity__bouton" href="#participer">
          Contribuer dès maintenant
        </a>
      </div>
    </section>
  );
}
