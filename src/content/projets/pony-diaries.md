---
# Infos tirées de ta description et du projet « mlp ». À relire : cadre (perso ?), durée.
titre: "MLP tcg"
numero: "05"
ordre: 5
annee: 2026
type: "Web app"
typeCourt: "web app"
cadre: "Projet personnel"
duree: "2 mois"
role: "Conception et développement"
resume: "Une appli web pour suivre sa collection de cartes My Little Pony, développée avec Astro et PocketBase."
accroche: "MLP tcg est un site, installable aussi comme appli, pour suivre sa collection de cartes Kayou My Little Pony. Il regroupe les 2 469 cartes officielles avec leurs images, et permet d’ajouter ses cartes, de suivre sa progression par série, de gérer sa wishlist et ses doubles, et d’exposer ses cartes préférées dans une vitrine."
competences: ["Astro", "PocketBase", "Base de données", "PWA", "Tailwind CSS", "UI design"]

jaquette: "../../assets/projets/pony-diaries/jaquette.png"
jaquetteAlt: "Icône de l’appli MLP tcg : un bouton de couture rose sur fond bordeaux"
jaquetteFond: "#8b4562"
vitrine:
  - src: "../../assets/projets/pony-diaries/collection.jpg"
    alt: "Page « Toute ma collection » : mon classeur virtuel avec les cartes possédées, la wishlist et les filtres"
  - src: "../../assets/projets/pony-diaries/collection-grille.jpg"
    alt: "Grille des cartes possédées : image, code, série, rareté et quantité de chaque carte"
mockups: []

contexte:
  commande: "Je collectionne les cartes Kayou My Little Pony et je voulais un outil simple pour savoir quelles cartes je possède, lesquelles il me manque et celles que je souhaite avoir."
  consignes:
    - "Réunir tout le catalogue officiel au même endroit"
    - "Suivre sa collection, sa wishlist et ses doubles"
    - "Pouvoir l’utiliser sur téléphone, comme une vraie appli"
    - "Garder ses données synchronisées entre ses appareils"
  cible: "Les collectionneurs et collectionneuses de cartes My Little Pony, qui veulent suivre leur collection depuis leur téléphone."

roleDetail:
  - titre: "Ce que j’ai conçu"
    texte: "L’interface (accueil, collection, profil, connexion), l’identité de l’appli, son icône et le parcours pour ajouter une carte en quelques secondes."
  - titre: "Ce que j’ai développé"
    texte: "Le site Astro, la base PocketBase des 2 469 cartes (21 séries) avec les comptes utilisateurs, la collection, la wishlist et la vitrine, et la version appli installable (PWA) qui fonctionne même hors connexion."

processus:
  - fichier: "donnees.exe"
    titre: "Le catalogue"
    texte: "J’ai rassemblé les 2 469 cartes du catalogue officiel dans une base PocketBase : code, nom, rareté, série et image de chaque carte."
    images:
      - src: "../../assets/projets/pony-diaries/carte-2.png"
        alt: "Carte Fluttershy du catalogue"
      - src: "../../assets/projets/pony-diaries/carte-3.png"
        alt: "Carte Princess Twilight Sparkle du catalogue"
  - fichier: "collection.exe"
    titre: "La collection"
    texte: "Chaque utilisateur ajoute ses cartes à partir de leur code, suit sa progression par série, gère sa wishlist et ses doubles, choisit ses cartes préférées pour sa vitrine et peut voir la valeur de la carte. Tout est synchronisé avec PocketBase."
    images:
      - src: "../../assets/projets/pony-diaries/collection-grille.jpg"
        alt: "Ma collection : grille des cartes possédées avec leur série et leur rareté"
  - fichier: "appli.exe"
    titre: "L’appli"
    texte: "Le site s’installe sur téléphone comme une appli : barre d’onglets en bas avec le bouton Scanner au milieu, raccourcis, et cartes déjà vues disponibles hors connexion."
    images: []

outils:
  - nom: "Astro"
    icone: "../../assets/skills/astro.png"
    pourquoi: "Les pages du site, avec Tailwind CSS pour le style."
  - nom: "PocketBase"
    icone: "../../assets/skills/pocketbase.png"
    pourquoi: "La base de données et les comptes : les 2 469 cartes, la collection, la wishlist et la vitrine de chaque utilisatrice, synchronisées entre ordinateur et téléphone."
  - nom: "VS Code"
    icone: "../../assets/skills/vscode.png"
    pourquoi: "Développement du site, de la base et de la version appli (PWA)."

resultat: "Une appli web installable qui regroupe tout le catalogue officiel et permet de suivre sa collection, sa wishlist, ses doubles et sa vitrine et aussi la valeur de la carte, synchronisés entre ordinateur et téléphone."
apprentissages: "MLP tcg m’a appris à concevoir une base de données et à transformer un site en vraie appli installable, en partant d’un besoin personnel."
brouillon: true

# ---- Approfondissement ----
problematique: "Comment savoir en un coup d’œil, parmi plus de 2 000 cartes, lesquelles on possède, lesquelles il manque et lesquelles on peut échanger ?"
chiffres:
  - valeur: "2 469"
    label: "cartes officielles dans la base, avec leur image"
  - valeur: "21"
    label: "séries My Little Pony, filtrables par rareté"
  - valeur: "4"
    label: "pages : toutes les cartes, mon classeur, ma vitrine, connexion"
defis:
  - probleme: "185 cartes du booster « Discord!!! » n’ont pas de nom sur le site officiel."
    solution: "J’ai rendu le nom facultatif dans la base : chaque carte est identifiée par son code unique (ex. MLPME03-UR-009L4), qui sert aussi à la recherche et à l’ajout."
  - probleme: "Une collection se consulte souvent en boutique ou en salon, avec une mauvaise connexion, et il ne fallait perdre aucune modification."
    solution: "L’appli garde les pages et les images déjà vues sur le téléphone. Les cartes modifiées hors connexion restent en attente sur l’appareil et sont renvoyées automatiquement à PocketBase dès que possible."
  - probleme: "Ajouter une carte devait prendre quelques secondes, sinon on abandonne vite."
    solution: "Un bouton « Scanner » au centre de la barre d’onglets ouvre directement la saisie du code de la carte, et un raccourci de l’appli installée y mène aussi."
  - probleme: "Suivre sa collection, c’est aussi la montrer : un simple tableau ne suffisait pas."
    solution: "J’ai créé une vitrine, « Mon Pony Club » : un titre, un poney préféré, une bio et des emplacements où exposer ses cartes préférées."
---
