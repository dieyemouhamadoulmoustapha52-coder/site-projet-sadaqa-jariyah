import './SectionTexte.css';

/**
 * Section de contenu générique (fond beige, bordure verte, titre en badge).
 * Réutilisée par Mission, Definition, Importance, etc.
 */
export default function SectionTexte({ id, titre, paragraphes = [], className = '' }) {
  return (
    <section id={id} className={`section-bloc section-texte ${className}`.trim()}>
      <h2 className="titre-section">{titre}</h2>
      {paragraphes.map((texte, index) => (
        <p key={index} className="paragraphe-large section-texte__paragraphe">
          {texte}
        </p>
      ))}
    </section>
  );
}
