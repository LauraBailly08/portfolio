# Journal de bord

> Une dizaine de lignes par semaine : ce que j’ai fait, ce qui a coincé, ce que j’ai décidé.

## Semaine du 26 octobre 2026

- **Fait :** amélioration de la maquette Figma (carrousel façon menu 3DS : sélecteur en coins, bulle d’information, mockup détouré). Test d’une V3 « menu HOME » écartée car trop éloignée de ma DA.
- **Fait :** choix de la technologie : Astro 6 avec content collections (un fichier Markdown par projet, une seule page modèle).
- **Fait :** mise en place du projet, export des visuels depuis Figma, intégration de toutes les pages (accueil, projets, études de cas, à propos, contact, mentions légales, 404). Premiers commits le 27 octobre.
- **Coincé :**
- **Décidé :** garder ma DA (bleu nuit, rose, étiquettes penchées à ombre décalée) et remplacer l’ancien bloc « Mon CV / Contact » de l’accueil par la bulle « Prêt à travailler avec moi ? ».
- **À faire :** compléter les textes, ajouter mon CV en PDF, vérifier les liens Instagram / Pinterest, nom de domaine et mise en ligne.

## Semaine du 2 novembre 2026

- **Fait :** refonte de l’accueil autour d’un nouveau visuel : fond « v3 », courbes, fenêtre type Bloc-notes et photo détourée, avec quatre traits décoratifs ajoutés au décor.
- **Fait :** réécriture des composants principaux : carrousel 3DS, bulle « Prêt à travailler avec moi ? », fenêtre .exe, pied de page et en-tête.
- **Fait :** création d’un composant Logo séparé, pour modifier la signature à un seul endroit.
- **Fait :** reprise des pages À propos, Contact, Projets et du modèle des études de cas pour qu’elles suivent la même DA.
- **Coincé :** pas de blocage noté sur le moment.
- **Décidé :** repartir de plusieurs fichiers courts (un composant = une brique réutilisable) plutôt que de gros blocs de code dans les pages.
- **À faire :** remplacer le projet Olyvia, ajouter les projets de SAE et illustrer chaque étude de cas.

## Semaine du 9 novembre 2026

- **Fait :** changement de sélection de projets : le projet Olyvia est retiré, Pony Diaries et SAE 303 sont ajoutés, puis SAE 301 (maquettes d’accueil, de collection et de configurateur) le 15 novembre. Je passe à 5 projets.
- **Fait :** chaque projet reçoit ses visuels : jaquettes pour le carrousel, captures du site et du téléphone pour Noyaux d’ombre, cartes et collection pour Pony Diaries, pages d’accueil et de fonctions pour Wenddy.
- **Fait :** nouveau composant d’étoile ASCII pour le décor, et icône PocketBase ajoutée à ma liste d’outils.
- **Fait :** refonte du modèle des études de cas (`projets/[slug]`), reprise deux fois (10 et 11 novembre) pour mieux présenter contexte, rôle, défis et résultats.
- **Fait :** page À propos réécrite (le 10), puis simplifiée avec le pied de page, l’en-tête et la page Contact (le 15 : environ 780 lignes de code supprimées contre 460 ajoutées).
- **Coincé :** pas de blocage noté sur le moment.
- **Décidé :** simplifier plutôt qu’ajouter : retirer du code que je n’utilisais pas pour garder un site léger.
- **À faire :** ajouter mon CV, brancher PocketBase comme source de données (niveau 4), mettre en ligne.

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

## Réseaux sociaux (justification)

- **LinkedIn :** réseau des recruteurs et des tuteurs de stage ; mon profil y renvoie vers le portfolio.
- **Behance :** plateforme dédiée aux portfolios de designers, où je peux présenter mes études de cas en détail et être repérée par des professionnels du design.
- **Cohérence :** les trois pointent vers le même portfolio et reprennent la même identité visuelle (bleu nuit, rose, signature « Laura Bailly »).
- **Rythme :** publier quand un projet est terminé, sans chercher à poster tous les jours.
