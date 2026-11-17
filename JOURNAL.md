# Journal de bord

> Une dizaine de lignes par semaine : ce que j’ai fait, ce qui a coincé, ce que j’ai décidé.
> Les passages marqués **[À compléter]** sont ceux que seule moi peux écrire : je les remplis avec ce que j’ai réellement vécu.

## Semaine du 26 octobre 2026

- **Fait :** amélioration de la maquette Figma (carrousel façon menu 3DS : sélecteur en coins, bulle d’information, mockup détouré). Test d’une V3 « menu HOME » écartée car trop éloignée de ma DA.
- **Fait :** choix de la technologie : Astro 6 avec content collections (un fichier Markdown par projet, une seule page modèle).
- **Fait :** mise en place du projet, export des visuels depuis Figma, intégration de toutes les pages (accueil, projets, études de cas, à propos, contact, mentions légales, 404). Premiers commits le 27 octobre.
- **Coincé :** **[À compléter]**
- **Décidé :** garder ma DA (bleu nuit, rose, étiquettes penchées à ombre décalée) et remplacer l’ancien bloc « Mon CV / Contact » de l’accueil par la bulle « Prêt à travailler avec moi ? ».
- **À faire :** compléter les textes, ajouter mon CV en PDF, vérifier les liens Instagram / Pinterest, nom de domaine et mise en ligne.

## Semaine du 2 novembre 2026

- **Fait :** **[À compléter : ce que j’ai travaillé cette semaine (textes des projets, visuels, retouches de maquette…). Un commit le 8 novembre.]**
- **Coincé :** **[À compléter]**
- **Décidé :** **[À compléter]**
- **À faire :** finaliser les textes et les visuels, penser à la source de données du site.

## Semaine du 9 novembre 2026

- **Fait :** retouches du contenu et du style du site (commits des 10, 11 et 15 novembre). **[À compléter : précisions sur ce que j’ai modifié.]**
- **Coincé :** **[À compléter]**
- **Décidé :** **[À compléter]**
- **À faire :** ajouter mon CV, brancher une vraie source de données (niveau 4 du barème), préparer la mise en ligne.

## Semaine du 16 novembre 2026

- **Fait :** ajout de mon CV en PDF (bouton « Mon CV ») et des vrais liens Instagram et Pinterest.
- **Fait :** source de données : les projets sont lus dans une base PocketBase (schéma de la collection, script qui recopie les 5 projets Markdown, « loader » Astro). Si PocketBase ne répond pas, le site retombe sur les fichiers Markdown : le build ne casse jamais.
- **Fait :** Tailwind CSS 4 ajouté en utilitaires, sans les styles de base (preflight) pour ne pas bousculer ma DA ; utilisé sur la page 404.
- **Fait :** en-tête, logo et favicon : plusieurs essais (filet sous les onglets, papillon avant/après le nom, étoile) puis retour à une simple signature « Laura Bailly » et à une étoile noire simple, plus lisible en petit.
- **Fait :** mise en ligne sur mon VPS Debian (Apache, HTTPS Let’s Encrypt, nom de domaine chez Infomaniak) et déploiement automatique avec GitHub Actions à chaque push.
- **Fait :** formulaire de contact qui m’envoie un e-mail par SMTP depuis un petit script PHP ; les identifiants restent hors du dépôt.
- **Coincé :** le site apparaissait sans CSS ni images (droits de lecture des dossiers sur le VPS), le formulaire renvoyait une erreur 500 (extension PHP `mbstring` absente), et un bloc de clé privée est apparu dans une capture d’écran : j’ai fait une rotation de la clé.
- **Décidé :** garder les 5 projets (3 études de cas détaillées, 2 présentés plus brièvement) ; indiquer Gmail et l’hébergeur dans les mentions légales et la politique de confidentialité.
- **À faire :** audit accessibilité et performance, mise en ligne de PocketBase.

## Semaine du 16 au 17 novembre 2026 : qualité et PocketBase en ligne

- **Fait :** audit des 11 pages (responsive de 320 à 1440 px, axe-core, Lighthouse). Corrections : contraste du bouton bleu et des numéros décoratifs, liste de description valide sur les fiches projet, zone de défilement accessible au clavier, menu mobile à 320–414 px.
- **Fait :** page À propos allégée de 3,4 Mo à 0,47 Mo en convertissant les masques PNG en WebP, avec un rendu identique.
- **Fait :** PocketBase installé sur le VPS (service systemd, Apache en proxy, HTTPS) ; les 5 projets y sont envoyés avec leurs images ; le build GitHub Actions lit la base (« 5 projets chargés depuis PocketBase »).
- **Fait :** grille QUALITE.md remplie avec les scores Lighthouse (99–100), le poids de l’accueil (375 ko) et la vérification Open Graph / aperçu LinkedIn.
- **Coincé :** le script d’installation de PocketBase a échoué une première fois (lecture de la version) ; corrigé en fixant la version.
- **Décidé :** garder le site statique : les modifications faites dans PocketBase sont publiées en relançant le workflow de déploiement.
- **À faire :** prototype Figma mobile et cliquable, relecture de IA.md, sauvegarde de la base, préparation de l’oral.

## Réseaux sociaux (justification, 5 lignes)

- **LinkedIn :** **[À compléter : pourquoi LinkedIn pour mon stage (recruteurs, réseau pro, annonces de stage).]**
- **Second réseau (Behance / Instagram / Pinterest ?) :** **[À compléter : lequel j’ai choisi et pourquoi (public visé, type de contenu que j’y publie, rythme).]**
