# Portfolio — Laura Bailly

Portfolio de Laura Bailly, étudiante en BUT MMI (2e année) : design d’interface, communication et art digital.
Direction artistique inspirée de l’univers Nintendo 3DS (jaquettes, sélecteur, bulles) et des interfaces rétro.

## Technologies

| Outil | Rôle | Pourquoi |
|---|---|---|
| [Astro 6](https://astro.build) | Framework | Génère un site statique très léger (peu de JavaScript), idéal pour la performance et le référencement. |
| Content Collections (Markdown + Zod) | Source de données | Chaque projet est un fichier `.md` ; une seule page modèle affiche tous les projets. |
| `astro:assets` (sharp) | Images | Conversion automatique en WebP et tailles adaptées à l’écran (`srcset`). |
| @astrojs/sitemap | SEO | Génère le plan du site pour les moteurs de recherche. |
| Fontsource | Polices | Polices auto-hébergées (pas d’appel à Google Fonts → RGPD + performance). |
| [Tailwind CSS 4](https://tailwindcss.com) | Utilitaires CSS | Classes utilitaires pour la mise en page (ex. page 404). Chargé **sans preflight** (`src/styles/tailwind.css`) pour ne pas modifier le rendu existant. |
| PHP (serveur Apache du VPS) | Formulaire | `public/contact.php` envoie les messages du formulaire par e-mail, en SMTP authentifié (Gmail). |

Le style de la direction artistique est écrit à la main (CSS « scopé » dans chaque composant). Tailwind complète avec des classes utilitaires, sans thème ni composants prédéfinis : aucune bibliothèque de composants (Bootstrap, DaisyUI…) n’est utilisée.

## Lancer le projet

Prérequis : **Node.js 22.12 ou plus récent** (`node -v` pour vérifier).

```bash
npm install        # installe les dépendances (une seule fois)
npm run dev        # serveur de développement → http://localhost:4321
npm run build      # génère le site final dans dist/
npm run preview    # prévisualise le site généré
```

## Source de données : PocketBase (avec les .md en secours)

Les projets peuvent être lus depuis une base **PocketBase** (collection `projets`) au moment du build.
Si `POCKETBASE_URL` n'est pas défini, ou si PocketBase ne répond pas, le site lit les fichiers Markdown de
`src/content/projets/` : le build ne casse jamais.

| Fichier | Rôle |
|---|---|
| `pocketbase/projets.collections.json` | Définition de la collection `projets` (champs, règles d'accès : lecture publique, écriture réservée au compte admin) |
| `scripts/seed-pocketbase.mjs` | Crée la collection si besoin et y recopie les 5 projets Markdown (relançable, sans doublon) |
| `src/lib/pocketbase-loader.ts` | « Loader » Astro : lit l'API PocketBase, télécharge les images dans `src/assets/projets-pb/` (ignoré par Git), valide avec le schéma Zod |
| `src/content.config.ts` | Branche le loader sur la collection `projets` |

### En local

1. Télécharger PocketBase pour Windows sur pocketbase.io, le dézipper dans un dossier **à part** du portfolio, puis lancer
   `pocketbase.exe serve` (adresse : http://127.0.0.1:8090). Créer le compte superuser demandé.
2. Copier `.env.example` en `.env`, puis renseigner `POCKETBASE_ADMIN_EMAIL` et `POCKETBASE_ADMIN_PASSWORD`.
3. `npm install` puis `npm run pb:seed` : les 5 projets sont envoyés dans PocketBase.
4. `npm run dev` : le site lit maintenant PocketBase (« 5 projets chargés depuis PocketBase » dans le terminal).

Le script ne touche qu'à la collection `projets` : aucune autre collection de la base n'est lue ni modifiée.

### En production (VPS)

PocketBase tourne sur le même VPS que le site, comme service systemd, derrière Apache en HTTPS (`https://api.bailly-laura.fr`).
Le script `deploiement/pocketbase-vps.sh` fait toute l'installation. Le site restant statique, PocketBase est interrogé **au moment du build** :
pour publier une modification faite dans l'interface d'administration (`/_/`), relancer le workflow « Deploy portfolio » (onglet Actions → Run workflow).
L'adresse de l'API est stockée dans la variable GitHub Actions `POCKETBASE_URL` ; sans elle, le build lit les fichiers Markdown.

## Structure

```
src/
├── assets/            images (optimisées automatiquement au build)
├── components/        briques réutilisables : Header, Footer, Tag (étiquette), Carousel3DS, CtaBulle, FenetreExe…
├── content/projets/   ← LES PROJETS (un fichier Markdown par projet)
├── content.config.ts  schéma des projets (champs obligatoires, types)
├── data/site.ts       infos globales : e-mail, liens réseaux, navigation
├── layouts/           gabarit commun (head SEO, en-tête, footer)
├── pages/             une page = une URL (projets/[slug].astro = modèle des études de cas)
└── styles/global.css  couleurs, typographies, règles de base
public/                fichiers copiés tels quels : favicon, robots.txt, .htaccess, contact.php, CV
```

### Ajouter un projet
1. Créer `src/content/projets/mon-projet.md` en copiant un projet existant.
2. Mettre ses images dans `src/assets/projets/mon-projet/`.
3. C’est tout : la page `/projets/mon-projet/`, la jaquette du carrousel et la ligne de la liste sont créées automatiquement.

## Mise en ligne (VPS Debian + Apache)
Le site est un site statique (`dist/`) servi par Apache sur un VPS que je configure moi-même.

- **Domaine** : `portfolio.bailly-laura.fr`. La zone DNS est chez Infomaniak (enregistrement `A` vers l’IP du VPS).
- **HTTPS** : certificat Let’s Encrypt, installé avec certbot et renouvelé automatiquement.
- **Apache** : un virtual host dédié (`/etc/apache2/sites-available/portfolio.conf`) gère la compression, le cache long de `/_astro/` et les en-têtes de sécurité. Le fichier `public/.htaccess` est donc inactif sur ce serveur.
- **Déploiement automatique** : à chaque `git push` sur `main`, GitHub Actions (`.github/workflows/deploy.yml`) construit le site (`npm ci`, `npm run build`) puis copie `dist/` dans `/var/www/portfolio` par SSH. Les accès (hôte, utilisateur, port, clé) sont des *secrets* GitHub, jamais dans le dépôt.
- **Formulaire de contact** : `contact.php` envoie le message par SMTP. Ses identifiants sont dans un fichier de configuration placé hors du dossier public du serveur et hors du dépôt.

## Documents du projet
- [JOURNAL.md](JOURNAL.md) — journal de bord
- [IA.md](IA.md) — déclaration d’usage de l’IA
- [QUALITE.md](QUALITE.md) — grille de contrôle qualité
