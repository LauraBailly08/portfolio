// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/fr/reference/configuration-reference/
export default defineConfig({
  // ⚠️ À remplacer par ton vrai nom de domaine (sert au sitemap et aux balises SEO).
  site: 'https://portfolio.bailly-laura.fr',

  // Le site est 100 % statique : `npm run build` génère le dossier `dist/`
  // qu'il suffit d'envoyer sur l'hébergement Infomaniak (FTP ou SSH).
  output: 'static',

  // Génère automatiquement /sitemap-index.xml pour le référencement.
  integrations: [sitemap()],

  // URLs propres : /projets/wenddy/ (dossier + index.html), comme sur un hébergement Apache.
  trailingSlash: 'ignore',
  build: { format: 'directory' },

  // Préchargement des pages au survol des liens → navigation quasi instantanée.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
