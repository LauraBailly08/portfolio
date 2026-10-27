# Grille de contrôle qualité

> Grille propre à ce site. Colonne « Résultat » à remplir après chaque vérification (date + outil + capture si besoin).
> Les critères marqués ✅ sont déjà pris en compte dans le code ; il reste à les **vérifier** sur le site en ligne.

## 1. Accessibilité

| Critère | Pourquoi c’est important ici | Comment je vérifie | Résultat / correction |
|---|---|---|---|
| ✅ Textes alternatifs pertinents, décors ignorés (`alt=""`) | Beaucoup d’images décoratives (étoiles ASCII, « !! », vagues) | Inspection du code + lecteur d’écran (NVDA) | |
| ✅ Carrousel utilisable au clavier (Tab, ← →) et sans JavaScript | Élément central de la page d’accueil | Navigation clavier seule | |
| ✅ Focus visible sur tous les liens et boutons | Le sélecteur 3DS sert d’indicateur de focus sur les jaquettes | Tab sur chaque page | |
| ✅ Lien d’évitement « Aller au contenu » | En-tête avec plusieurs onglets | Tab au chargement | |
| Contrastes texte / fond (AA) | Textes gris dans la bulle, rose sur bleu nuit | WAVE ou Contrast Checker | |
| ✅ Formulaire : labels associés, champs obligatoires, messages d’erreur | Rubrique contact fonctionnelle | Lighthouse + test manuel | |
| ✅ Animations désactivées si « réduire les animations » | Sélecteur qui pulse, bulle qui « pop » | Réglage système + rechargement | |
| Hiérarchie des titres (un seul h1 par page) | Les étiquettes servent de titres | HeadingsMap | |

## 2. Sobriété et performance

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ Images converties en WebP + tailles adaptées (`srcset`) | Visuels exportés en PNG lourds (hero : 1 Mo → ~100 Ko) | Onglet Réseau des DevTools | |
| ✅ Polices auto-hébergées, `font-display: swap` | Évite les requêtes vers Google | Onglet Réseau | |
| ✅ Très peu de JavaScript (uniquement le carrousel et le message du formulaire) | Site statique Astro | Lighthouse | |
| Poids total de la page d’accueil | Objectif : moins de 1 Mo | Lighthouse / EcoIndex | |
| ✅ Cache navigateur et compression (.htaccess) | Visites suivantes plus rapides | En-têtes HTTP (DevTools) | |

## 3. Référencement

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ `<title>` et meta description uniques par page | Chaque projet doit être trouvable | Code source / extension SEO Meta | |
| ✅ Sitemap + robots.txt | Indexation | /sitemap-index.xml, Google Search Console | |
| ✅ Balises Open Graph + image de partage | Partage du portfolio sur LinkedIn | LinkedIn Post Inspector | |
| ✅ Données structurées `Person` | Identifier l’auteure du site | Test des résultats enrichis Google | |
| URLs lisibles (/projets/wenddy/) | Lisibilité | Navigation | |
| Nom de domaine configuré dans `astro.config.mjs` et `robots.txt` | Liens absolus corrects | Code | |

## 4. Conformité juridique

| Critère | Pourquoi | Comment | Résultat |
|---|---|---|---|
| ✅ Mentions légales (éditrice, hébergeur) | Obligation LCEN | Page /mentions-legales/ | |
| ✅ Politique de confidentialité (formulaire) | Données personnelles = RGPD | Section #confidentialite | |
| ✅ Aucun cookie ni traceur → pas de bandeau nécessaire | Simplicité | Onglet Application des DevTools | |
| Droits des images et logos (charte Wenddy, logos logiciels, photos d’inspiration) | Contenus de tiers | Liste des crédits | |
| Licences des polices (SIL OFL) | Polices embarquées | Mentionnées dans les mentions légales | |
