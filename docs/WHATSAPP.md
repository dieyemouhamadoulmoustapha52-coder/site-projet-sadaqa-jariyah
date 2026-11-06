# WhatsApp — Configuration du groupe « Bureau Élargi »

Guide pas à pas pour configurer le groupe officiel de l'**Association Projet Sadaqa Jariyah** avec un aperçu professionnel lors des partages de lien.

**URL du site** : <https://projet-sadaqa-jarirah.netlify.app/>
**Image d'aperçu** : `public/og-image.png` (1200 × 630 px) — à enregistrer sur votre téléphone avant de commencer.

---

## 1. Photo de profil du groupe

1. Ouvrir WhatsApp → groupe **Bureau Élargi** → tap sur le nom du groupe.
2. **Photo du groupe** → **Galerie** → sélectionner l'image `og-image.png`.
3. Recadrer si nécessaire (l'image est déjà au format paysage adapté) → **Enregistrer**.

## 2. Description du groupe

1. Toujours dans **Infos du groupe** → **Description**.
2. Coller le texte suivant :

```
Association Projet Sadaqa Jariyah
Organisation caritative œuvrant pour des projets à impact durable.
Ensemble, concrétisons nos actions au service de la communauté.

🌐 https://projet-sadaqa-jarirah.netlify.app/
```

3. Valider (**Enregistrer** / coche).

## 3. Lien d'invitation

1. **Infos du groupe** → **Inviter via un lien** → **Partager le lien** ou **Copier le lien**.
2. Ce lien permet à quiconque de rejoindre le groupe (à distribuer avec discernement).

## 4. Partager le lien avec un bel aperçu

Quand vous envoyez le lien du **site** dans une conversation :

1. Coller l'URL complète : `https://projet-sadaqa-jarirah.netlify.app/`
2. **Attendre ~2 secondes** : l'aperçu (image + titre + description) se charge.
3. Vérifier que l'image et le texte s'affichent **avant** d'appuyer sur **Envoyer**.
   → Si vous envoyez trop tôt, le message part sans aperçu (voir dépannage).

---

## Dépannage

| Problème | Cause | Solution |
|---|---|---|
| **Ancien aperçu qui persiste** | Cache de WhatsApp / Facebook | Renvoyer le lien avec un suffixe : `https://projet-sadaqa-jarirah.netlify.app/?v=2` |
| **Pas d'image dans l'aperçu** | Image absente, trop lourde ou URL relative | Vérifier que l'URL de l'image est **absolue** (`https://…/og-image.png`) et < 300 Ko |
| **Image floue / mauvais format** | Dimensions incorrectes | Régénérer : `python3 scripts/generate-og-image.py` (1200 × 630) |
| **Aperçu vide au premier envoi** | Mise en cache du domaine | Partager d'abord le lien dans un test à soi-même, puis renvoyer avec `?v=2` |
| **Description erronée** | Ancien contenu en cache | Forcer le rafraîchissement avec `?v=2` ou attendre la purge (~24 h) |

### Outils de contrôle en ligne

- **Facebook Sharing Debugger** : <https://developers.facebook.com/tools/debug/> — bouton *Scrape Again* pour purger le cache.
- **OpenGraph.xyz** : <https://opengraph.xyz/> — aperçu multi-réseaux.
- **LinkedIn Post Inspector** : <https://www.linkedin.com/post-inspector/> — contrôle des cartes LinkedIn.

---

*Mise à jour : novembre 2026 — Association Projet Sadaqa Jariyah.*
