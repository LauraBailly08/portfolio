# Grille de contrôle qualité

> Grille propre à ce site. Colonne « Résultat » : date, outil, correction éventuelle.
> Contrôles faits le 17/11/2026 (Playwright + axe-core sur les 11 pages, de 320 à 1440 px ; Lighthouse mobile et desktop). À refaire après chaque mise en production.

## Scores Lighthouse

- **Accueil (mobile)** : Performance 100 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100
- **Fiche projet (mobile)** : Performance 99 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100
- **Contact (mobile)** : Performance 100 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100
- **À propos (mobile)** : Performance 99 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100
- **À propos (desktop)** : Performance 100 · Accessibilité 100 · Bonnes pratiques 100 · SEO 100

Mesures Lighthouse du 17/11/2026, en mode mobile sauf mention contraire.

## 1. Accessibilité

- **Textes alternatifs pertinents, décors ignorés (`alt=""`)**
  - Pourquoi c’est important ici : Beaucoup d’images décoratives (étoiles ASCII, « !! », vagues)
  - Comment je vérifie : Inspection du code + axe-core
  - Résultat / correction : OK, 0 violation `image-alt`. Les numéros décoratifs sont passés en CSS (`::before`) pour ne plus être lus.
- **Carrousel utilisable au clavier (Tab, ← →) et sans JavaScript**
  - Pourquoi c’est important ici : Élément central de la page d’accueil
  - Comment je vérifie : Navigation clavier seule
  - Résultat / correction : OK. La zone de défilement horizontal des fiches projet est devenue focusable (`tabindex`, `aria-label`) quand elle déborde.
- **Focus visible sur tous les liens et boutons**
  - Pourquoi c’est important ici : Le sélecteur 3DS sert d’indicateur de focus sur les jaquettes
  - Comment je vérifie : Tab sur chaque page
  - Résultat / correction : OK sur les 11 pages.
- **Lien d’évitement « Aller au contenu »**
  - Pourquoi c’est important ici : En-tête avec plusieurs onglets
  - Comment je vérifie : Tab au chargement
  - Résultat / correction : OK.
- **Contrastes texte / fond (AA)**
  - Pourquoi c’est important ici : Textes gris dans la bulle, rose sur bleu nuit
  - Comment je vérifie : axe-core + Lighthouse
  - Résultat / correction : 2 défauts trouvés et corrigés : bouton bleu (fond `#4870c9`, texte blanc) et numéros décoratifs. Reste 0 défaut de contraste.
- **Formulaire : labels associés, champs obligatoires, messages d’erreur**
  - Pourquoi c’est important ici : Rubrique contact fonctionnelle
  - Comment je vérifie : Lighthouse + envoi réel
  - Résultat / correction : OK. Mail reçu sur ma boîte via le serveur ; anti-spam par champ piège invisible.
- **Animations désactivées si « réduire les animations »**
  - Pourquoi c’est important ici : Sélecteur qui pulse, bulle qui « pop », défilement doux
  - Comment je vérifie : Réglage système + rechargement
  - Résultat / correction : OK, `prefers-reduced-motion` coupe aussi le `scroll-behavior: smooth`.
- **Hiérarchie des titres (un seul h1 par page)**
  - Pourquoi c’est important ici : Les étiquettes servent de titres
  - Comment je vérifie : axe-core (`page-has-heading-one`, `heading-order`)
  - Résultat / correction : OK. Structure des fiches corrigée (liste de description `dl` valide, un seul landmark principal).
- **Responsive / menu mobile**
  - Pourquoi c’est important ici : Navigation à 5 onglets
  - Comment je vérifie : Playwright à 320, 375, 414, 768, 1440 px
  - Résultat / correction : Menu cassé à 320–414 px, corrigé (`nowrap` + tailles réduites). Aucun défilement horizontal réel.

## 2. Sobriété et performance

- **Images converties en WebP + tailles adaptées (`srcset`)**
  - Pourquoi : Visuels exportés en PNG lourds (hero : 1 Mo → ~100 Ko)
  - Comment : Onglet Réseau, Lighthouse
  - Résultat : OK. Page À propos : 3 419 Ko → 474 Ko en convertissant les masques PNG en WebP 600 px (rendu identique au pixel près).
- **Polices auto-hébergées, `font-display: swap`**
  - Pourquoi : Évite les requêtes vers Google
  - Comment : Onglet Réseau
  - Résultat : OK, aucune requête externe.
- **Très peu de JavaScript (uniquement le carrousel, le formulaire, le retournement des cartes)**
  - Pourquoi : Site statique Astro
  - Comment : Lighthouse
  - Résultat : OK, TBT 0 ms sur À propos.
- **Poids total de la page d’accueil**
  - Pourquoi : Objectif : moins de 1 Mo
  - Comment : Onglet Réseau des DevTools, site en ligne
  - Résultat : OK : 28 requêtes, 375 ko de ressources (environ 65 ko transférés avec le cache du navigateur). Largement sous l’objectif.
- **Cache navigateur et compression**
  - Pourquoi : Visites suivantes plus rapides
  - Comment : En-têtes HTTP (`curl -I`)
  - Résultat : OK : configuré dans le vhost Apache (cache immuable sur `/_astro`, DEFLATE).
- **HTTPS + en-têtes de sécurité**
  - Pourquoi : Confiance, bonnes pratiques
  - Comment : Lighthouse « Bonnes pratiques »
  - Résultat : OK : Let’s Encrypt, redirection 301 http → https, renouvellement automatique.

## 3. Référencement

- **`<title>` et meta description uniques par page**
  - Pourquoi : Chaque projet doit être trouvable
  - Comment : Lighthouse SEO
  - Résultat : OK : 100 sur toutes les pages testées.
- **Sitemap + robots.txt**
  - Pourquoi : Indexation
  - Comment : /sitemap-index.xml
  - Résultat : OK.
- **Balises Open Graph + image de partage**
  - Pourquoi : Partage du portfolio sur LinkedIn
  - Comment : Lecture de la page en ligne + LinkedIn Post Inspector
  - Résultat : OK : `og:title`, `og:description`, `og:url`, `og:image` (1200 × 630 px), `og:locale` et `twitter:card` présents. Aperçu LinkedIn vérifié avec le Post Inspector (17/11/2026) : titre et image corrects.
- **Données structurées `Person`**
  - Pourquoi : Identifier l’auteure du site
  - Comment : Code source de la page + validateur schema.org
  - Résultat : OK : bloc JSON-LD `Person` (nom, métier, URL, liens LinkedIn et Behance) valide.
- **URLs lisibles (/projets/wenddy/)**
  - Pourquoi : Lisibilité
  - Comment : Navigation
  - Résultat : OK.
- **Nom de domaine configuré dans `astro.config.mjs` et `robots.txt`**
  - Pourquoi : Liens absolus corrects
  - Comment : Code
  - Résultat : OK (portfolio.bailly-laura.fr).

## 4. Conformité juridique

- **Mentions légales (éditrice, hébergeur)**
  - Pourquoi : Obligation LCEN
  - Comment : Page /mentions-legales/
  - Résultat : OK. Hébergeur : Université Marie et Louis Pasteur (IUT Nord Franche-Comté) ; domaine : Infomaniak.
- **Politique de confidentialité (formulaire)**
  - Pourquoi : Données personnelles = RGPD
  - Comment : Section #confidentialite
  - Résultat : OK : le message est envoyé par e-mail via Gmail, rien n’est stocké sur le site.
- **Aucun cookie ni traceur → pas de bandeau nécessaire**
  - Pourquoi : Simplicité
  - Comment : Onglet Application des DevTools
  - Résultat : OK.
- **Droits des images et logos (charte Wenddy, logos logiciels, photos d’inspiration)**
  - Pourquoi : Contenus de tiers
  - Comment : Relecture de la section « Propriété intellectuelle » des mentions légales
  - Résultat : Crédits en ligne : chartes et logos imposés (Wenddy) cités comme appartenant à leurs auteurs, logos de logiciels cités comme appartenant à leurs éditeurs, photos d’inspiration déclarées personnelles. Confirmé le 18/11/2026 : toutes les images du site sont de moi.
- **Licences des polices (SIL OFL)**
  - Pourquoi : Polices embarquées
  - Comment : Mentionnées dans les mentions légales
  - Résultat : OK.
