# Projet Sadaqa Jariyah

Site vitrine caritatif moderne développé en **React 19 + Vite 6**, entièrement responsive et conforme à la charte graphique de l'organisation.

---

## 🚀 Guide de démarrage

### Prérequis
- Node.js ≥ 18
- npm ≥ 9

### Installation
```bash
npm install
```

### Configuration
Dupliquer le fichier d'exemple puis renseigner la variable d'environnement :
```bash
cp .env.example .env
```
```env
VITE_LIEN_WHATSAPP=<lien d'invitation du groupe>
```

### Commandes
| Commande | Rôle |
|---|---|
| `npm run dev` | Lancement en développement (serveur Vite, port 5173) |
| `npm run build` | Build de production (sortie dans `dist/`) |
| `npm run preview` | Prévisualisation du build de production |

---

## 🔒 Sécurité et Confidentialité

- Le fichier `.gitignore` exclut les dépendances (`node_modules/`), les builds (`dist/`), les fichiers d'environnement (`.env*`) et les sauvegardes locales.
- Les cartes membres présentes dans le dépôt public sont **anonymisées** (nom et rôle uniquement) pour préserver la vie privée des membres.
- Aucune donnée d'identification, aucun secret ni jeton n'est versionné : les éléments sensibles transitent exclusivement par les variables d'environnement.

---

## 🎨 Identité Visuelle

- **Palette de couleurs**
  | Couleur | Code | Usage |
  |---|---|---|
  | Vert foncé | `#1B3B2D` | Couleur principale |
  | Or / Moutarde | `#F5C85C` | Accent et mise en avant |
  | Beige | `#FFF8E1` | Fonds doux |
  | Gris | `#F4F4F4` | Neutres |
- **Typographie** : Poppins (Google Fonts), hiérarchie typographique soignée.
- **Animations** : transitions fluides au survol, logo interactif avec effets de survol et de flottaison, halo doré pulsé.

---

## 📂 Architecture du Projet

```
site-projet-sadaqa-jariyah/
├── index.html                  # Point d'entrée HTML
├── vite.config.js              # Configuration Vite
├── .env.example                # Modèle de variable d'environnement
├── scripts/
│   └── deploy-netlify.sh       # Déploiement Netlify (cartes originales)
│
├── src/
│   ├── App.jsx                 # Composition globale des sections
│   ├── main.jsx                # Montage de l'application React
│   ├── assets/
│   │   ├── index.js            # Détection et chargement dynamique des cartes
│   │   └── cartes-membres/     # Images des cartes membres (chargées à la volée)
│   ├── components/             # Composants modulaires + styles co-localisés
│   │   ├── Navbar              # Navigation avec menu burger
│   │   ├── Hero                # Section d'accroche et logo animé
│   │   ├── Mission             # Présentation de la mission
│   │   ├── Definition          # Définition de la sadaqa jariyah
│   │   ├── Importance          # Importance de l'initiative
│   │   ├── Structure           # Rôles et postes de l'organisation
│   │   ├── BureauCarrousel     # Carrousel des membres du bureau
│   │   ├── Participer          # Appel à la participation (lien WhatsApp)
│   │   ├── CharitySection      # Section caritative
│   │   └── Footer              # Pied de page
│   └── styles/
│       └── globals.css         # Palette, variables CSS, utilitaires
│
└── public/
    └── images/                 # Ressources statiques (logos, favicons)
```

- `/src/components/` : composants modulaires (Navbar, Hero, Mission, Définition, Importance, Structure, Carrousel du Bureau, Participer, Section Caritative, Footer).
- `/src/assets/cartes-membres/` : dossier dédié à la détection et au chargement dynamique des images de cartes de membres.
- `/public/images/` : ressources statiques (logos, favicons).

---

## 🌟 Fonctionnalités Clés

### Carrousel des Membres du Bureau
- Défilement **automatique toutes les 4 secondes** avec boucle continue.
- Contrôles manuels : flèches `‹ ›`, points tactiles, navigation au clavier (`←` / `→`).
- **Ajout de carte sans modification de code** : déposer une image (PNG/JPG/WebP) dans `src/assets/cartes-membres/`, elle est détectée automatiquement au prochain build.

### Design Responsive
- Menu burger ergonomique sous 900 px : ouverture au clic ou au survol, fermeture au clic extérieur, à Échap ou à la sortie du curseur.
- Adaptation mobile et tablettes, cartes empilées sous 768 px, cibles tactiles ≥ 44 px.
- Respect des critères d'accessibilité : sémantique ARIA, support de `prefers-reduced-motion`, aucun débordement horizontal.

---

## 🧱 Stack Technique

| Technologie | Rôle |
|---|---|
| React 19 | Bibliothèque d'interface |
| Vite 6 | Outil de build et serveur de développement |
| JavaScript (ESM) | Logique applicative |
| CSS pur | Styles co-localisés par composant |

---

## 📦 Déploiement

### Politique des cartes membres
| Cible | Version des cartes |
|---|---|
| **GitHub** (dépôt public) | **Anonymisées** — nom + rôle uniquement |
| **Site Netlify** (production) | **Originales** — avec les infos du bureau |

Les originales sont conservées hors versionnement dans `.sauvegarde-cartes-originales/` (ignoré par git).

### Procédure
1. S'assurer que l'arbre de travail est propre (`git status`).
2. Lancer le déploiement :
   ```bash
   ./scripts/deploy-netlify.sh
   ```
   Le script injecte les cartes originales, build, déploie sur Netlify puis **restaure automatiquement** les cartes anonymisées (même en cas d'échec).
3. La variable `VITE_LIEN_WHATSAPP` est lue dans `.env` au build (fichier jamais versionné).

---
*Build vérifié ✓ — document technique du projet Sadaqa Jariyah.*
