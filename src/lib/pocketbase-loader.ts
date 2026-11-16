/**
 * LOADER POCKETBASE — la source de données du portfolio.
 *
 * Au moment du build (ou au démarrage de `npm run dev`), Astro appelle ce loader :
 *  1. il lit la collection « projets » de PocketBase (API publique en lecture seule) ;
 *  2. il télécharge les images dans src/assets/projets-pb/<slug>/ (dossier ignoré par Git) pour qu'Astro puisse
 *     les optimiser (WebP, srcset) comme des images locales ;
 *  3. il remplace les noms de fichiers par des chemins relatifs, puis valide chaque projet
 *     avec le schéma Zod de content.config.ts.
 *
 * Si POCKETBASE_URL n'est pas défini, ou si PocketBase ne répond pas, le loader retombe
 * sur les fichiers Markdown de src/content/projets/ : le site se construit toujours.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { glob, type Loader } from 'astro/loaders';

type Fichier = string;
type Enregistrement = Record<string, unknown> & {
  id: string;
  collectionId: string;
  slug: string;
  images?: Fichier[];
  contenu?: string;
};

/** Lit POCKETBASE_URL : d'abord dans l'environnement, sinon dans le fichier .env du projet. */
async function lireUrl(): Promise<string> {
  if (process.env.POCKETBASE_URL) return process.env.POCKETBASE_URL;
  const fichier = await readFile(path.join(process.cwd(), '.env'), 'utf8').catch(() => '');
  const ligne = fichier.split(/\r?\n/).find((l) => /^\s*POCKETBASE_URL\s*=/.test(l));
  return ligne ? ligne.split('=').slice(1).join('=').trim().replace(/^['"]|['"]$/g, '') : '';
}

/** PocketBase renomme les fichiers : « jaquette.png » devient « jaquette_a1b2c3d4e5.png ». */
const nomOriginal = (nom: Fichier) => nom.replace(/_[a-z0-9]{10}(\.[^.]+)?$/i, '$1');

/** Remplace récursivement les noms de fichiers connus par leur chemin relatif d'import. */
function reecrire(valeur: unknown, chemins: Map<string, string>): unknown {
  if (typeof valeur === 'string') {
    // PocketBase remplace les caractères spéciaux des noms de fichiers (« carte-2.png » → « carte_2.png »)
    const nom = /^[^\s/]+\.(png|jpe?g|webp|gif|svg)$/i.test(valeur) ? valeur.replace(/[^A-Za-z0-9_.]/g, '_') : valeur;
    return chemins.get(nom) ?? valeur;
  }
  if (Array.isArray(valeur)) return valeur.map((v) => reecrire(v, chemins));
  if (valeur && typeof valeur === 'object') {
    return Object.fromEntries(Object.entries(valeur).map(([k, v]) => [k, reecrire(v, chemins)]));
  }
  return valeur;
}

/** Liste tous les chemins d'images relatifs d'un projet : Astro en a besoin pour les importer (et les optimiser). */
function cheminsImages(valeur: unknown, trouves = new Set<string>()): string[] {
  if (typeof valeur === 'string') {
    if (/^\.{1,2}\/.+\.(png|jpe?g|webp|gif|svg)$/i.test(valeur)) trouves.add(valeur);
  } else if (Array.isArray(valeur)) {
    valeur.forEach((v) => cheminsImages(v, trouves));
  } else if (valeur && typeof valeur === 'object') {
    Object.values(valeur).forEach((v) => cheminsImages(v, trouves));
  }
  return [...trouves];
}

/** Les champs qui contiennent des références d'images (les autres textes ne sont jamais modifiés). */
const CHAMPS_IMAGES = ['jaquette', 'mockupCarrousel', 'vitrine', 'mockups', 'processus', 'outils'] as const;
/** Les champs facultatifs vides dans PocketBase (« ») doivent devenir « absents » pour Zod. */
const NETTOYER = ['lien', 'lienLibelle', 'mockupCarrousel', 'apprentissages', 'equipe', 'problematique', 'ameliorations', 'vitrine', 'mockups', 'chiffres', 'defis'];

export function projetsLoader(): Loader {
  const secours = glob({ pattern: '**/*.md', base: './src/content/projets' });

  return {
    name: 'projets-pocketbase',
    async load(contexte) {
      const base = (await lireUrl()).replace(/\/$/, '');
      if (!base) {
        contexte.logger.info('POCKETBASE_URL absent : lecture des fichiers Markdown.');
        return secours.load(contexte);
      }

      let enregistrements: Enregistrement[];
      try {
        const reponse = await fetch(`${base}/api/collections/projets/records?perPage=200&sort=ordre`, {
          signal: AbortSignal.timeout(10_000),
        });
        if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
        enregistrements = ((await reponse.json()) as { items: Enregistrement[] }).items;
        if (enregistrements.length === 0) throw new Error('collection vide');
      } catch (erreur) {
        contexte.logger.warn(`PocketBase indisponible (${(erreur as Error).message}) : repli sur les fichiers Markdown.`);
        return secours.load(contexte);
      }

      const entrees = [];
      try {
        for (const enr of enregistrements) {
          const slug = enr.slug;
          const dossier = path.join(process.cwd(), 'src', 'assets', 'projets-pb', slug);
          await mkdir(dossier, { recursive: true });

          // 1. télécharger les images
          const chemins = new Map<string, string>();
          for (const fichier of enr.images ?? []) {
            const original = nomOriginal(fichier);
            const url = `${base}/api/files/${enr.collectionId}/${enr.id}/${encodeURIComponent(fichier)}`;
            const reponse = await fetch(url, { signal: AbortSignal.timeout(30_000) });
            if (!reponse.ok) throw new Error(`image ${fichier} : HTTP ${reponse.status}`);
            const octets = Buffer.from(await reponse.arrayBuffer());
            const cible = path.join(dossier, original);
            const existant = await readFile(cible).catch(() => null);
            if (!existant || !existant.equals(octets)) await writeFile(cible, octets);
            chemins.set(original, `../../assets/projets-pb/${slug}/${original}`);
          }

          // 2. construire les données
          const { id, collectionId, collectionName, created, updated, images, contenu, slug: _slug, ...donnees } = enr as Record<string, unknown>;
          const data: Record<string, unknown> = { ...donnees };
          for (const cle of CHAMPS_IMAGES) if (cle in data) data[cle] = reecrire(data[cle], chemins);
          for (const cle of NETTOYER) if (data[cle] === '' || data[cle] === null) delete data[cle];
          if (!data.jaquetteFit) delete data.jaquetteFit;
          if (!data.jaquetteFond) delete data.jaquetteFond;

          const filePath = `src/content/projets/${slug}.md`; // sert de base aux chemins relatifs des images
          const valide = await contexte.parseData({ id: slug, data, filePath });
          const corps = (contenu as string | undefined) ?? '';
          entrees.push({
            id: slug,
            data: valide,
            filePath,
            body: corps,
            digest: contexte.generateDigest(JSON.stringify(data) + corps),
            rendered: corps ? await contexte.renderMarkdown(corps) : undefined,
            assetImports: cheminsImages(data),
          });
        }
      } catch (erreur) {
        contexte.logger.warn(`Lecture PocketBase impossible (${(erreur as Error).message}) : repli sur les fichiers Markdown.`);
        return secours.load(contexte);
      }

      contexte.store.clear();
      for (const e of entrees) contexte.store.set(e);
      contexte.logger.info(`${entrees.length} projets chargés depuis PocketBase.`);
    },
  };
}
