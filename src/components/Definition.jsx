import SectionTexte from './SectionTexte.jsx';

const PARAGRAPHES = [
  'Une sadaqa jariyah est une aumône durable dont les bienfaits continuent de profiter aux gens, et dont la récompense se poursuit même après la mort de celui ou de ceux qui ont contribué à sa réalisation. Elle est établie dans la Sounnah par le hadith authentique indiquant que les œuvres du fils d’Adam cessent après sa mort sauf trois, dont la sadaqa jariyah. Le Coran encourage également les œuvres utiles et pérennes, et les savants expliquent que toute action licite, bénéfique et accomplie avec une intention sincère pour Allah peut être considérée comme une sadaqa jariyah.',
];

export default function Definition() {
  return (
    <SectionTexte
      id="definition"
      titre="Qu’est-ce qu’une sadaqa jariyah ?"
      paragraphes={PARAGRAPHES}
    />
  );
}
