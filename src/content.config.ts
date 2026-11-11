/**
 * CONTENT COLLECTIONS — la « source de données » du portfolio.
 *
 * Chaque projet est un fichier Markdown dans `src/content/projets/`.
 * Le haut du fichier (le « frontmatter », entre les ---) contient les infos
 * structurées (titre, année, rôle, images…) ; le schéma ci-dessous les vérifie :
 * si une info manque ou est mal écrite, `npm run dev` affiche une erreur claire.
 *
 * Une seule page modèle (`src/pages/projets/[slug].astro`) affiche ensuite
 * TOUS les projets : ajouter un projet = ajouter un fichier .md, rien d'autre.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      numero: z.string(), // "01", "02"… affiché sur la jaquette
      ordre: z.number(), // ordre d'affichage dans le carrousel et la grille
      annee: z.number(),
      type: z.string(), // ex. "Site web"
      typeCourt: z.string(), // ex. "site web" (étiquette de la jaquette)
      cadre: z.string(), // ex. "Projet universitaire · BUT MMI S1"
      duree: z.string(),
      role: z.string(), // rôle court, affiché dans la bulle et la fiche
      resume: z.string(), // 1 phrase pour la bulle du carrousel
      accroche: z.string(), // 2-3 phrases d'introduction de la page projet
      competences: z.array(z.string()),
      lien: z.string().url().optional(),
      lienLibelle: z.string().optional(),

      // Visuels
      jaquette: image(), // visuel au centre de la jaquette
      jaquetteAlt: z.string(),
      jaquetteFit: z.enum(['contain', 'cover']).default('contain'), // contain = logo centré, cover = visuel plein cadre
      jaquetteFond: z.string().default('#ffffff'), // couleur de fond de la couverture
      mockupCarrousel: image().optional(), // mockup détouré qui sort de la jaquette
      vitrine: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]), // visuels à plat présentés dans la bande « vitrine » de la page projet
      mockups: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),

      // Sections de l'étude de cas
      contexte: z.object({
        commande: z.string(),
        consignes: z.array(z.string()),
        cible: z.string().optional(),
      }),
      roleDetail: z.array(
        z.object({ titre: z.string(), texte: z.string() })
      ),
      processus: z.array(
        z.object({
          fichier: z.string(), // ex. "recherche.exe"
          titre: z.string(),
          texte: z.string(),
          images: z
            .array(z.object({ src: image(), alt: z.string() }))
            .default([]),
        })
      ),
      outils: z.array(
        z.object({ nom: z.string(), icone: image(), pourquoi: z.string() })
      ),
      resultat: z.string(),
      apprentissages: z.string().optional(),

      // ---- Contenus d'approfondissement (facultatifs : une section n'apparaît que si elle est remplie) ----
      equipe: z.string().optional(), // ex. "En binôme avec Izya Thiriet" (affiché dans la fiche)
      problematique: z.string().optional(), // la question à laquelle le projet répond
      chiffres: z.array(z.object({ valeur: z.string(), label: z.string() })).default([]), // 3-4 chiffres clés
      defis: z.array(z.object({ probleme: z.string(), solution: z.string() })).default([]), // difficultés → solutions
      ameliorations: z.string().optional(), // « si je devais le refaire »

      // Passe à true tant qu'un texte est provisoire : un bandeau s'affiche en mode dev.
      brouillon: z.boolean().default(false),
    }),
});

export const collections = { projets };
