import { useState, useEffect, useCallback } from 'react';
import { cartesMembres } from '../assets/index.js';
import './BureauCarrousel.css';

const INTERVALLE_MS = 4000;

export default function BureauCarrousel() {
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useState('suivant');
  const total = cartesMembres.length;

  const avancer = useCallback(
    (sens = 'suivant') => {
      if (total === 0) return;
      setOrientation(sens);
      setIndex((i) => (sens === 'suivant' ? (i + 1) % total : (i - 1 + total) % total));
    },
    [total]
  );

  // Défilement automatique en boucle
  useEffect(() => {
    if (total <= 1) return undefined;
    const minuteur = setInterval(() => avancer('suivant'), INTERVALLE_MS);
    return () => clearInterval(minuteur);
  }, [avancer, total]);

  const allerA = (cible) => {
    setOrientation(cible > index ? 'suivant' : 'precedent');
    setIndex(cible);
  };

  const gererClavier = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      avancer('precedent');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      avancer('suivant');
    }
  };

  if (total === 0) {
    return (
      <section id="membres-bureau" className="section-bloc bureau">
        <h2 className="titre-section">Nos Membres du Bureau</h2>
        <div className="bureau__vide">
          <p>Les cartes des membres du bureau seront bientôt disponibles.</p>
          <p className="bureau__indice">
            Ajoutez des images dans <code>src/assets/cartes-membres/</code> pour les faire apparaître
            automatiquement ici.
          </p>
        </div>
      </section>
    );
  }

  const carteCourante = cartesMembres[index];

  return (
    <section id="membres-bureau" className="section-bloc bureau">
      <h2 className="titre-section">Nos Membres du Bureau</h2>

      <div className="bureau__cadre-conteneur">
        <div
          className="bureau__cadre"
          role="region"
          aria-roledescription="carrousel"
          aria-label="Cartes des membres du bureau"
          onKeyDown={gererClavier}
          tabIndex={0}
        >
          <div
            key={carteCourante.id}
            className={`bureau__visuel bureau__visuel--${orientation}`}
          >
            <img
              src={carteCourante.url}
              alt={`Carte du membre : ${carteCourante.nom}`}
              className="bureau__image"
              draggable={false}
            />
          </div>

          <button
            type="button"
            className="bureau__bouton bureau__bouton--precedent"
            onClick={() => avancer('precedent')}
            aria-label="Carte précédente"
          >
            ‹
          </button>

          <button
            type="button"
            className="bureau__bouton bureau__bouton--suivant"
            onClick={() => avancer('suivant')}
            aria-label="Carte suivante"
          >
            ›
          </button>
        </div>
      </div>

      <div className="bureau__indicateurs" role="tablist" aria-label="Choisir une carte">
        {cartesMembres.map((carte, i) => (
          <button
            key={carte.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Afficher la carte ${i + 1} sur ${total}`}
            className={`bureau__point ${i === index ? 'bureau__point--actif' : ''}`}
            onClick={() => allerA(i)}
          />
        ))}
      </div>

      <p className="bureau__compteur" aria-live="polite">
        {index + 1} / {total}
      </p>
    </section>
  );
}
