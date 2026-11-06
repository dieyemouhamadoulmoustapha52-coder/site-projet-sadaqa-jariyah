#!/usr/bin/env bash
# =============================================================================
# Déploiement Netlify — Projet Sadaqa Jariyah
# =============================================================================
# Stratégie de confidentialité des cartes membres :
#   • GitHub (dépôt)  → cartes ANONYMISÉES (nom + rôle uniquement)
#   • Site (Netlify)  → cartes ORIGINALES (infos complètes du bureau)
#
# Ce script injecte temporairement les originales (ignorées par git) pour le
# build de production, déploie sur Netlify, puis restaure systématiquement les
# versions anonymisées dans l'arbre de travail — même en cas d'échec.
#
# FLUX (5 étapes) :
#   0. trap EXIT      → restauration git garantie à la fin (succès ou échec)
#   1. vérifications  → dossier originales présent, arbre git propre sur
#                       cartes-membres/, présence de .env (warning)
#   2. injection      → cp .sauvegarde-cartes-originales/*.png
#                       → src/assets/cartes-membres/  (temporaire, hors git)
#   3. build          → npm run build (Vite → dist/ avec cartes complètes +
#                       VITE_LIEN_WHATSAPP lu dans .env)
#   4. deploy         → netlify deploy --dir dist --prod --no-build
#                       (--no-build : ne PAS rebuilder sur Netlify, sinon les
#                       cartes anonymisées du dépôt seraient utilisées)
#   5. restauration   → git checkout -- src/assets/cartes-membres/
#                       (déclenché par le trap, voir étape 0)
#
# Utilisation :
#   netlify login          # une seule fois
#   ./scripts/deploy-netlify.sh
#
# Voir aussi : README.md → section « Déploiement »
# =============================================================================
set -euo pipefail

SITE_ID="f3351e4e-d3c5-4ea7-9f14-3df77b7057c8"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_CARTES="$ROOT/src/assets/cartes-membres"
ORIGINALES="$ROOT/.sauvegarde-cartes-originales"

cd "$ROOT"

# --- Étape 0 : restauration garantie des cartes anonymisées ------------------
# trap EXIT = s'exécute toujours à la sortie du script, quel que soit le
# résultat (succès, erreur set -e, Ctrl+C…). Empêche toute donnée réelle de
# rester dans l'arbre de travail git.
restore_anonymized() {
  local code=$?
  git checkout -- src/assets/cartes-membres/ 2>/dev/null || true
  echo
  echo "✔ Cartes anonymisées restaurées (état git propre)"
  exit "$code"
}
trap restore_anonymized EXIT

# --- Étape 1 : vérifications préalables --------------------------------------
if [[ ! -d "$ORIGINALES" ]]; then
  echo "✘ Dossier des originales introuvable : $ORIGINALES" >&2
  exit 1
fi

if [[ -n "$(git status --porcelain -- src/assets/cartes-membres/)" ]]; then
  echo "✘ L'arbre de travail n'est pas propre sur cartes-membres/." >&2
  echo "   Committez ou annulez vos changements avant de déployer." >&2
  exit 1
fi

if [[ ! -f .env ]]; then
  echo "⚠ Fichier .env absent — build sans VITE_LIEN_WHATSAPP" >&2
fi

# --- Étape 2 : injection des cartes originales (données réelles, hors git) ---
echo "→ Injection des cartes originales pour le build…"
cp -f "$ORIGINALES"/*.png "$SRC_CARTES/"

# --- Étape 3 : build de production -------------------------------------------
echo "→ Build de production…"
npm run build

# --- Étape 4 : déploiement Netlify (production) ------------------------------
echo "→ Déploiement sur Netlify…"
netlify deploy \
  --site "$SITE_ID" \
  --dir dist \
  --prod \
  --no-build \
  --message "deploy: cartes membres complètes (build local)"

echo
echo "🚀 Déploiement terminé → https://projet-sadaqa-jarirah.netlify.app"
# Étape 5 : le trap EXIT (étape 0) restaure les cartes anonymisées
