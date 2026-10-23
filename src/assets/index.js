/**
 * Chargement dynamique des images de cartes-membres.
 *
 * Toute image déposée dans /src/assets/cartes-membres/ est automatiquement
 * détectée (import.meta.glob de Vite) et ajoutée au carrousel du bureau.
 * Aucune modification de code n'est nécessaire : il suffit d'ajouter un fichier.
 */

const fichiers = import.meta.glob('./cartes-membres/*.{png,jpg,jpeg,webp,avif,gif,svg}', {
  eager: true,
  import: 'default',
  query: '?url',
});

export const cartesMembres = Object.entries(fichiers)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([chemin, url]) => ({
    id: chemin,
    nom: chemin
      .split('/')
      .pop()
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]+/g, ' '),
    url,
  }));

export default cartesMembres;
