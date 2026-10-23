import SectionTexte from './SectionTexte.jsx';

const PARAGRAPHES = [
  'La sadaqa jariyah est une œuvre d’une grande importance car elle constitue un investissement spirituel durable, dont la récompense se prolonge même après la mort du croyant. Le Coran enseigne que les biens dépensés pour Allah ne sont jamais perdus et que les œuvres utiles et sincères sont grandement récompensées. La Sounnah insiste également sur l’impact social et durable des bonnes actions, en encourageant des initiatives bénéfiques telles que l’accès à l’eau, la transmission du savoir ou les projets humanitaires. La sadaqa jariyah permet ainsi de répondre à des besoins essentiels ici-bas tout en assurant une récompense continue dans l’au-delà.',
];

export default function Importance() {
  return (
    <SectionTexte
      id="importance"
      titre="Pourquoi est-il important de faire une sadaqa jariyah ?"
      paragraphes={PARAGRAPHES}
    />
  );
}
