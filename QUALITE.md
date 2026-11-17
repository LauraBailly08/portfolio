# Grille de contrôle qualité

> Grille propre à ce site. Colonne « Résultat » : date, outil, correction éventuelle.
> Contrôles faits le 17/11/2026 sur le build final (Playwright + axe-core sur les 11 pages, 320 → 1440 px ; Lighthouse 12 mobile et desktop). À re-mesurer sur l’URL en ligne après chaque mise en production.

## Scores Lighthouse

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil (mobile) | 87 (1) | 100 | 100 | 100 |
| Fiche projet (mobile) | 99 | 100 | 100 | 100 |
| Contact (mobile) | 100 | 100 | 100 | 100 |
| À propos (mobile) | 99 | 100 | 100 | 100 |
| À propos (desktop) | 100 | 100 | 100 | 100 |

(1) Mesure faite en local sur un processeur bridé : le temps de blocage (TBT) est surévalué. Valeur à remplacer par la mesure sur le site en ligne.

## 1. Accessibilité

| Critère | Pourquoi c’est important ici | Comment je vérifie | Résultat / correction |
|---|---|---|---|
| ✅ Textes alternatifs pertinents, décors ignorés (`alt=""`) | Beaucoup d’images décoratives (étoiles ASCII, « !! », vagues) | Inspection du code + axe-core | OK, 0 violation `image-alt`. Les numéros décoratifs sont passés en CSS (`::before`) pour ne plus être lus. |
| ✅ Carrousel utilisable au clavier (Tab, ← →) et sans JavaScript | Élément central de la page d’accueil | Navigation clavier seule | OK. La zone de défilement horizontal des fiches projet est devenue focusable (`tabindex`, `aria-label`) quand elle déborde. |
| ✅ Focus visible sur tous les liens et boutons | Le sélecteur 3DS sert d’indicateur de focus sur les jaquettes | Tab sur chaque page | OK sur les 11 pages. |
| ✅ Lien d’évitement « Aller au contenu » | En-tête avec plusieurs onglets | Tab au chargement | OK. |
| Contrastes texte / fond (AA) | Textes gris dans la bulle, rose sur bleu nuit | axe-core + Lighthouse | 2 défauts trouvés et corrigés : bouton bleu (fond `#4870c9`, texte blanc) et numéros décoratifs. Reste 0 défaut de contraste. |
| ✅ Formulaire : labels associés, champs obligatoires, messages d’erreur | Rubrique contact fonctionnelle | Lighthouse + envoi réel | OK. Mail reçu sur ma boîte via le serveur ; anti-spam par champ piège invisible. |
| ✅ Animations désactivées si « réduire les animations » | Sélecteur qui pulse, bulle qui « pop », défilement doux | Réglage système + rechargement | OK, `prefers-reduced-motion` coupe aussi le `scroll-behavior: smooth`. |
| Hiérarchie des titres (un seul h1 par page) | Les étiquettes servent de titres | axe-core (`page-has-heading-one`, `heading-order`) | OK. Structure des fiches corrigée (liste de description `dl` valide, un seul landmark principal). |
| Responsive / menu mobile | Navigation à 5 onglets | Playwright à 320, 375, 414, 768, 1440 px | Menu cassé à 320–414 px, corrigé (`nowrap` + tailles réduites). Aucun défilement horizontal réel. |

## 2. Sobriété et performance

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ Images converties en WebP + tailles adaptées (`srcset`) | Visuels exportés en PNG lourds (hero : 1 Mo → ~100 Ko) | Onglet Réseau, Lighthouse | OK. Page À propos : 3 419 Ko → 474 Ko en convertissant les masques PNG en WebP 600 px (rendu identique au pixel près). |
| ✅ Polices auto-hébergées, `font-display: swap` | Évite les requêtes vers Google | Onglet Réseau | OK, aucune requête externe. |
| ✅ Très peu de JavaScript (uniquement le carrousel, le formulaire, le retournement des cartes) | Site statique Astro | Lighthouse | OK, TBT 0 ms sur À propos. |
| Poids total de la page d’accueil | Objectif : moins de 1 Mo | Lighthouse | À reporter depuis la mesure en ligne. |
| ✅ Cache navigateur et compression | Visites suivantes plus rapides | En-têtes HTTP (`curl -I`) | OK : configuré dans le vhost Apache (cache immuable sur `/_astro`, DEFLATE). |
| ✅ HTTPS + en-têtes de sécurité | Confiance, bonnes pratiques | Lighthouse « Bonnes pratiques » | OK : Let’s Encrypt, redirection 301 http → https, renouvellement automatique. |

## 3. Référencement

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ `<title>` et meta description uniques par page | Chaque projet doit être trouvable | Lighthouse SEO | OK : 100 sur toutes les pages testées. |
| ✅ Sitemap + robots.txt | Indexation | /sitemap-index.xml | OK. |
| ✅ Balises Open Graph + image de partage | Partage du portfolio sur LinkedIn | LinkedIn Post Inspector | À tester une fois en ligne. |
| ✅ Données structurées `Person` | Identifier l’auteure du site | Test des résultats enrichis Google | À tester une fois en ligne. |
| URLs lisibles (/projets/wenddy/) | Lisibilité | Navigation | OK. |
| Nom de domaine configuré dans `astro.config.mjs` et `robots.txt` | Liens absolus corrects | Code | OK (portfolio.bailly-laura.fr). |

## 4. Conformité juridique

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ Mentions légales (éditrice, hébergeur) | Obligation LCEN | Page /mentions-legales/ | OK. Hébergeur : Université Marie et Louis Pasteur (IUT Nord Franche-Comté) ; domaine : Infomaniak. |
| ✅ Politique de confidentialité (formulaire) | Données personnelles = RGPD | Section #confidentialite | OK : le message est envoyé par e-mail via Gmail, rien n’est stocké sur le site. |
| ✅ Aucun cookie ni traceur → pas de bandeau nécessaire | Simplicité | Onglet Application des DevTools | OK. |
| Droits des images et logos (charte Wenddy, logos logiciels, photos d’inspiration) | Contenus de tiers | Liste des crédits | À finaliser dans le journal. |
| Licences des polices (SIL OFL) | Polices embarquées | Mentionnées dans les mentions légales | OK. |
