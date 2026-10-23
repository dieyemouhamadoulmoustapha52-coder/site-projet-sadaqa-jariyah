import './Structure.css';

const ROLES = [
  {
    id: 'responsables-projet',
    titre: 'Responsables de projet',
    description:
      'Ils conçoivent, planifient et supervisent l’ensemble des projets. Ils coordonnent les équipes, assurent les relations avec les partenaires et les autorités locales, veillent au respect des délais, du budget et des objectifs, et rendent compte régulièrement de l’avancement des actions.',
    direction: 'gauche',
  },
  {
    id: 'responsables-finances',
    titre: 'Responsables des cotisations et des finances',
    description:
      'Ils organisent les collectes, gèrent les fonds avec rigueur et transparence, élaborent les budgets prévisionnels et assurent le paiement des prestataires. Leur rôle garantit une utilisation responsable, fiable et conforme aux objectifs du projet.',
    direction: 'droite',
  },
  {
    id: 'responsables-communication',
    titre: 'Responsables de la communication',
    description:
      'Ils assurent la visibilité du projet, informent le public et les partenaires, sensibilisent à l’importance de la sadaqa jariyah et mobilisent de nouveaux soutiens à travers une communication claire, cohérente et engageante.',
    direction: 'gauche',
  },
];

export default function Structure() {
  return (
    <section id="structure-groupe" className="section-bloc structure">
      <h2 className="titre-section">Structure et rôles de notre groupe</h2>

      <div className="structure__grille">
        {ROLES.map(({ id, titre, description, direction }) => (
          <article key={id} className={`structure__carte structure__carte--${direction}`}>
            <span className="structure__pastille" aria-hidden="true" />
            <h3 className="structure__titre">{titre}</h3>
            <p className="structure__description">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
