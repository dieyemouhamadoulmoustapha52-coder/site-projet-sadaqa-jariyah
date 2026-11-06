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
# =============================================================================
set -euo pipefail

SITE_ID="f3351e4e-d3c5-4ea7-9f14-3df77b7057c8"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_CARTES="$ROOT/src/assets/cartes-membres"
ORIGINALES="$ROOT/.sauvegarde-cartes-originales"

cd "$ROOT"

# --- Restauration garantie des cartes anonymisées (git) ----------------------
restore_anonymized() {
  local code=$?
  git checkout -- src/assets/cartes-membres/ 2>/dev/null || true
  echo
  echo "✔ Cartes anonymisées restaurées (état git propre)"
  exit "$code"
}
trap restore_anonymized EXIT

# --- Vérifications préalables -----------------------------------------------
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

# --- 1. Injection des cartes originales (données réelles, hors git) ---------
echo "→ Injection des cartes originales pour le build…"
cp -f "$ORIGINALES"/*.png "$SRC_CARTES/"

# --- 2. Build de production --------------------------------------------------
echo "→ Build de production…"
npm run build

# --- 3. Déploiement Netlify (production) -------------------------------------
echo "→ Déploiement sur Netlify…"
netlify deploy \
  --site "$SITE_ID" \
  --dir dist \
  --prod \
  --no-build \
  --message "deploy: cartes membres complètes (build local)"

echo
echo "🚀 Déploiement terminé → https://projet-sadaqa-jarirah.netlify.app"
# le trap restaure les cartes anonymisées à la sortie
