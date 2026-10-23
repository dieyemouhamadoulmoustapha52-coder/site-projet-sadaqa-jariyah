# Projet Sadaqa Jariyah

Site vitrine caritatif — refondu en **React 19 + Vite 6**, responsive et conforme à la charte.

## Lancer le projet
```bash
npm install
cp .env.example .env   # puis renseigner VITE_LIEN_WHATSAPP
npm run dev      # développement
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
```

## Variables d'environnement
| Variable | Rôle |
|---|---|
| `VITE_LIEN_WHATSAPP` | Lien d'invitation du groupe WhatsApp (section « Participer ») |

Le lien privé vit dans `.env` (ignoré par git). Un `.env.example` sans secret
est versionné pour guider les contributeurs.

## Confidentialité ⚠️
- `.gitignore` exclut `node_modules/`, `dist/`, `.env*` et `.sauvegarde-cartes-originales/`
- Les cartes membres n'affichent que **nom + rôle** (téléphone, email, adresse
  et profession supprimés — données personnelles des membres)
- Les originales (avec données perso) sont conservées hors dépôt dans
  `.sauvegarde-cartes-originales/` (ignoré par git) : **ne jamais les remettre
  dans `src/assets/cartes-membres/`**

## Identité visuelle
- Vert foncé `#1B3B2D` — or/moutarde `#F5C85C` — beige `#FFF8E1` — gris `#F4F4F4`
- Typographie Poppins, animations fluides au survol
- Logo du hero animé : entrée douce, flotaison continue, halo doré
  pulsé et inclinaison au survol (même geste que le logo de la navbar)

## Structure
```
src/
├── components/        # Navbar, Hero, Mission, Definition, Importance,
│                      # Structure, BureauCarrousel, Participer,
│                      # CharitySection, Footer (+ CSS co-localisé)
├── assets/
│   ├── index.js       # Chargement dynamique des cartes
│   └── cartes-membres/# Déposez vos images ici (auto-détectées)
├── styles/globals.css # Palette, variables, utilitaires
└── App.jsx / main.jsx
public/images/         # logo + favicon
```

## Sections du site
1. Hero (logo + accroche)
2. Notre mission
3. Qu'est-ce qu'une sadaqa jariyah ?
4. Pourquoi est-il important ?
5. Structure et rôles (3 postes)
6. **Nos Membres du Bureau** (carrousel)
7. Comment participer (lien WhatsApp)
8. Investir dans le sentier d'Allah

## ⭐ Carrousel des membres
- Défilement **automatique** toutes les 4 s, en boucle.
- Contrôles manuels : flèches `‹ ›`, points, clavier `←/→`.
- **Ajouter une carte** : déposer une image (PNG/JPG) dans
  `src/assets/cartes-membres/` → elle apparaît automatiquement,
  aucune modification de code nécessaire.

## Responsive
- Menu burger sous 900px : ouverture au **clic ou au survol** du bouton
  (souris/stylo ; le tactile garde le clic), fermeture au clic extérieur,
  à Échap ou à la sortie du curseur, liens en cascade
- Cartes empilées sous 768px, cibles tactiles ≥ 44px
- Aucun débordement horizontal, support `prefers-reduced-motion`

---
*Build vérifié ✓ — prêt à déployer.*
