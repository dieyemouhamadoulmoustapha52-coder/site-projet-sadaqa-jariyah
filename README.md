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

### Script `scripts/deploy-netlify.sh` — comment ça fonctionne

**Objectif** : publier le site avec les cartes complètes **sans jamais** envoyer les données réelles sur GitHub.

Le script suit 5 étapes, dans cet ordre :

| Étape | Action | Détail |
|---|---|---|
| **0** | Filet de sécurité (`trap … EXIT`) | Enregistre une fonction de restauration qui se déclenche **à la fin du script**, que le déploiement réussisse ou échoue. Elle exécute `git checkout -- src/assets/cartes-membres/` pour remettre les cartes anonymisées versionnées. |
| **1** | Vérifications | Refuse de lancer si le dossier des originales manque, ou si des changements non commités existent sur `cartes-membres/` (sinon la restauration git pourrait écraser votre travail). Prévient aussi si `.env` est absent (lien WhatsApp). |
| **2** | Injection des originales | `cp .sauvegarde-cartes-originales/*.png → src/assets/cartes-membres/` — les images avec les infos réelles remplacent temporairement les versions anonymisées **dans le seul dossier de build**, sans toucher à git (le dossier source est ignoré par `.gitignore`). |
| **3** | Build de production | `npm run build` — Vite bundle les images injectées dans `dist/` (avec empreintes de version). Le build inclut aussi `VITE_LIEN_WHATSAPP` lu dans `.env`. |
| **4** | Déploiement Netlify | `netlify deploy --site <ID> --dir dist --prod --no-build` — téléverse `dist/` en production sur `projet-sadaqa-jarirah.netlify.app`. `--no-build` évite un second build qui reconstruirait sans les originales. |
| **5** | Restauration (automatique) | Le `trap` restaure les cartes anonymisées via git → l'arbre de travail redevient propre, prêt à être poussé sur GitHub. |

**Schéma du flux :**
```
git propre (cartes anonymisées)
        │
        ▼
┌─ trap EXIT (restauration garantie) ─────────────────────┐
│  1. vérifications git / dossier originales              │
│  2. cp originales → src/assets/cartes-membres/          │
│  3. npm run build  (→ dist/ avec cartes complètes)      │
│  4. netlify deploy --prod  (→ site en production)       │
└─────────────────────────────────────────────────────────┘
        │
        ▼
git checkout → cartes anonymisées restaurées
```

**Utilisation :**
```bash
# prérequis : netlify CLI connecté (netlify login), .env renseigné
./scripts/deploy-netlify.sh
```

**En cas d'échec** (build cassé, coupure réseau…) : le filet `trap` restaure quand même les cartes anonymisées — aucune donnée réelle ne reste dans l'arbre de travail git.

### Procédure manuelle (sans le script)
1. S'assurer que l'arbre de travail est propre (`git status`).
2. Copier les originales dans `src/assets/cartes-membres/`, `npm run build`, puis `netlify deploy --dir dist --prod --no-build`.
3. Restaurer : `git checkout -- src/assets/cartes-membres/`.

---
*Build vérifié ✓ — document technique du projet Sadaqa Jariyah.*
