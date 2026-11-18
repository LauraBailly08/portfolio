# Déclaration d’usage de l’IA

J’ai utilisé des outils d’IA pour m’aider à concevoir et à développer ce portfolio. Les décisions de direction artistique, le choix des projets et les textes finaux sont les miens. Voici, étape par étape, ce que l’IA a fait et ce que j’ai gardé, modifié ou refusé.

## Outils utilisés

- **Figma AI (Make) · Maquette**
  - Pour quoi faire : Proposition de carrousel pour la page Projets.
  - Ce que j’ai modifié, corrigé ou rejeté : Résultat jugé peu clair : je ne l’ai pas gardé tel quel.
- **Claude (Anthropic) · Maquette**
  - Pour quoi faire : Propositions d’amélioration de ma maquette Figma (carrousel inspiré du menu 3DS, bulle d’information, mockup détouré).
  - Ce que j’ai modifié, corrigé ou rejeté : J’ai refusé plusieurs pistes (fenêtres « Windows », version « menu HOME » trop éloignée de ma DA) et j’ai fait évoluer le carrousel en plusieurs itérations (bulle blanche simple, mockup visible au-dessus, suppression du contour bleu des cartes).
- **Claude (Anthropic) · Développement**
  - Pour quoi faire : Mise en place du projet Astro, des composants (en-tête, pied de page, carrousel, étiquettes), du modèle de page projet et du formulaire de contact, à partir de ma maquette Figma.
  - Ce que j’ai modifié, corrigé ou rejeté : J’ai repris les composants à plusieurs reprises (nouveau visuel d’accueil, composant Logo, refonte du modèle des études de cas, simplification du code). J’ai testé plusieurs logos et favicons (papillon, étoile ASCII, étoile simple) et choisi moi-même la signature « Laura Bailly » et l’étoile noire. J’ai décidé des projets présentés et de leur ordre.
- **Claude (Anthropic) · Données**
  - Pour quoi faire : Schéma de la collection PocketBase, script qui recopie mes projets Markdown dans la base, « loader » Astro avec repli sur les fichiers Markdown.
  - Ce que j’ai modifié, corrigé ou rejeté : J’ai installé et configuré PocketBase sur mon VPS, créé mon compte administrateur et lancé moi-même le script d’import. Je vérifie dans les journaux de build que « 5 projets sont chargés depuis PocketBase ».
- **Claude (Anthropic) · Mise en ligne**
  - Pour quoi faire : Configuration d’Apache, du HTTPS, du déploiement automatique avec GitHub Actions, du formulaire de contact en PHP par SMTP, script d’installation de PocketBase.
  - Ce que j’ai modifié, corrigé ou rejeté : J’ai réalisé les manipulations sur mon VPS et sur GitHub, créé les secrets moi-même et refusé de créer une boîte mail dédiée : j’ai choisi d’utiliser mon adresse Gmail, et j’ai adapté les mentions légales et la politique de confidentialité en conséquence.
- **Claude (Anthropic) · Qualité**
  - Pour quoi faire : Audit d’accessibilité (axe-core), tests de responsive, mesures Lighthouse, corrections de contrastes, du menu mobile et du poids de la page À propos.
  - Ce que j’ai modifié, corrigé ou rejeté : J’ai validé les changements visuels (contrastes) et refait les mesures Lighthouse moi-même sur le site en ligne.
- **Claude (Anthropic) · Contenus**
  - Pour quoi faire : Premières versions des textes des études de cas (Noyaux d’ombre, Wenddy) à partir de mes textes Figma.
  - Ce que j’ai modifié, corrigé ou rejeté : Textes relus et réécrits avec mes mots ; informations corrigées.
- **Claude (Anthropic) · Documentation**
  - Pour quoi faire : Brouillons du README, du journal de bord, de la grille QUALITE.md et de ce fichier.
  - Ce que j’ai modifié, corrigé ou rejeté : Relus et corrigés par moi ; le journal a été reconstitué à partir de l’historique Git de mon dépôt.

## Ce que je sais expliquer

- **Content collections d’Astro** : un fichier ou une entrée de base par projet, validé par un schéma ; une seule page modèle `[slug].astro` génère toutes les études de cas.
- **Source de données** : le « loader » lit PocketBase au moment du build, télécharge les images, et retombe sur les fichiers Markdown si la base ne répond pas.
- **Site statique + base de données** : le site est généré au build ; pour publier une modification faite dans PocketBase, je relance le workflow de déploiement.
- **Déploiement automatique** : à chaque push, GitHub Actions installe les dépendances, construit le site et copie `dist/` sur le VPS ; les identifiants sont dans les secrets GitHub, pas dans le code.
- **Serveur** : Apache sert le site en HTTPS (Let’s Encrypt) et sert de relais pour PocketBase ; le cache et la compression sont réglés dans la configuration d’Apache.
- **Formulaire de contact** : un script PHP valide les champs, bloque les robots avec un champ piège, et m’envoie l’e-mail en SMTP ; les identifiants sont hors du dépôt.
- **Accessibilité et performance** : contrastes, navigation au clavier, `prefers-reduced-motion`, images en WebP ; mesures Lighthouse et axe-core consignées dans QUALITE.md.
- **Script du carrousel** : navigation au clavier et à la souris, et affichage correct même sans JavaScript.
