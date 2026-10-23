import './Participer.css';

// Lien privé chargé depuis .env (fichier non versionné — voir .env.example).
const LIEN_WHATSAPP = import.meta.env.VITE_LIEN_WHATSAPP ?? '#';

const PARAGRAPHES = [
  'Vous pouvez nous soutenir dans cette noble initiative en vous engageant, selon vos moyens, à contribuer régulièrement à nos projets de sadaqa jariyah. Chaque contribution, même modeste, participe concrètement à la réalisation d’actions utiles et durables au bénéfice des populations dans le besoin.',
  'Si vous souhaitez prendre part à cette œuvre et suivre l’évolution des projets en cours, nous vous invitons à rejoindre notre groupe WhatsApp, où vous trouverez toutes les informations nécessaires, les détails des actions en cours et les modalités de participation.',
];

export default function Participer() {
  return (
    <section id="participer" className="section-bloc participer">
      <h2 className="titre-section">Comment participer pour nous soutenir</h2>

      {PARAGRAPHES.map((texte, index) => (
        <p key={index} className="paragraphe-large participer__paragraphe">
          {texte}
        </p>
      ))}

      <a
        href={LIEN_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="bouton-principal participer__bouton"
      >
        <span className="participer__icone" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor">
            <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.74 6.4L3.2 28.8l6.58-1.7a12.74 12.74 0 0 0 6.22 1.6h.01c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.7-12.81-12.7zm0 23.06h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.02 1.05 1.07-3.92-.25-.4a10.55 10.55 0 0 1-1.62-5.62c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.52c0 5.86-4.77 10.6-10.64 10.6zm5.83-7.95c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37z" />
          </svg>
        </span>
        Rejoignez notre groupe WhatsApp pour avoir les détails de nos projets
      </a>
    </section>
  );
}
