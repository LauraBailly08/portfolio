// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://docs.astro.build/fr/reference/configuration-reference/
export default defineConfig({
  // Adresse du site en ligne (sert au sitemap et aux balises SEO).
  site: 'https://portfolio.bailly-laura.fr',

  // Le site est 100 % statique : `npm run build` génère le dossier `dist/`,
  // envoyé sur le VPS par GitHub Actions (voir .github/workflows/deploy.yml).
  output: 'static',

  // Génère automatiquement /sitemap-index.xml pour le référencement.
  integrations: [sitemap()],

  // URLs propres : /projets/wenddy/ (dossier + index.html), servies telles quelles par Apache.
  trailingSlash: 'ignore',
  build: { format: 'directory' },

  // Préchargement des pages au survol des liens → navigation quasi instantanée.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  // En développement : vérifie les fichiers régulièrement au lieu d'attendre les notifications de Windows,
  // pour que toute modification (éditeur, outil externe) s'affiche sans redémarrer.
  vite: { plugins: [tailwindcss()], server: { watch: { usePolling: true, interval: 300 } } },
});
