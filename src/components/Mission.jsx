import SectionTexte from './SectionTexte.jsx';

const PARAGRAPHES = [
  'Nous avons pour mission d’initier, de planifier et d’exécuter des projets de sadaqa jariyah visant à améliorer durablement les conditions de vie des populations dans le besoin. Ces projets incluent notamment la réhabilitation et la création de puits pour faciliter l’accès à l’eau potable, mais également toute autre action bénéfique, utile et pérenne relevant de la sadaqa jariyah.',
];

export default function Mission() {
  return <SectionTexte id="mission" titre="Notre mission" paragraphes={PARAGRAPHES} />;
}
