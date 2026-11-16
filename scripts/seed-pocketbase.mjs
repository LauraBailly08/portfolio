/**
 * SEED POCKETBASE — recopie les projets Markdown (src/content/projets/*.md) dans PocketBase.
 *
 * Usage (PocketBase lancé, voir README) :
 *   POCKETBASE_URL=http://127.0.0.1:8090 \
 *   POCKETBASE_ADMIN_EMAIL=toi@exemple.fr POCKETBASE_ADMIN_PASSWORD=… \
 *   node scripts/seed-pocketbase.mjs
 *
 * Le script ne touche QUE à la collection « projets » (il la crée si elle n'existe pas).
 * Il peut être relancé : un projet déjà présent (même slug) est mis à jour, jamais dupliqué.
 * Aucune autre collection de la base n'est lue, modifiée ni supprimée.
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { load as parse } from 'js-yaml';

const base = (process.env.POCKETBASE_URL ?? '').replace(/\/$/, '');
const email = process.env.POCKETBASE_ADMIN_EMAIL;
const motDePasse = process.env.POCKETBASE_ADMIN_PASSWORD;
if (!base || !email || !motDePasse) {
  console.error('Définis POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL et POCKETBASE_ADMIN_PASSWORD.');
  process.exit(1);
}

async function api(chemin, options = {}, jeton) {
  const reponse = await fetch(`${base}${chemin}`, {
    ...options,
    headers: { ...(options.headers ?? {}), ...(jeton ? { Authorization: jeton } : {}) },
  });
  if (!reponse.ok && reponse.status !== 404) {
    throw new Error(`${options.method ?? 'GET'} ${chemin} → HTTP ${reponse.status} ${await reponse.text()}`);
  }
  return reponse;
}

// 1. Connexion (compte « superuser » de PocketBase)
const connexion = await api('/api/collections/_superusers/auth-with-password', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identity: email, password: motDePasse }),
});
const { token } = await connexion.json();

// 2. Création de la collection « projets » si besoin
if ((await api('/api/collections/projets', {}, token)).status === 404) {
  const [definition] = JSON.parse(await readFile('pocketbase/projets.collections.json', 'utf8'));
  await api('/api/collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(definition),
  }, token);
  console.log('Collection « projets » créée.');
}

// 3. Un enregistrement par fichier Markdown
const dossier = 'src/content/projets';
const fichiers = (await readdir(dossier)).filter((f) => f.endsWith('.md'));
const REF_IMAGE = /^\.\.\/\.\.\/assets\/projets\/([^/]+)\/(.+)$/;

for (const fichier of fichiers) {
  const slug = fichier.replace(/\.md$/, '');
  const brut = await readFile(path.join(dossier, fichier), 'utf8');
  const [, entete, corps = ''] = brut.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const donnees = parse(entete);

  // Les images locales (../../assets/projets/<slug>/x.png) sont envoyées à PocketBase,
  // et la référence devient simplement « x.png ».
  const aEnvoyer = new Set();
  const transformer = (v) => {
    if (typeof v === 'string') {
      const m = v.match(REF_IMAGE);
      if (m && m[1] === slug) { aEnvoyer.add(m[2]); return m[2]; }
      return v;
    }
    if (Array.isArray(v)) return v.map(transformer);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, transformer(x)]));
    return v;
  };
  const propre = transformer(donnees);

  const formulaire = new FormData();
  formulaire.append('slug', slug);
  for (const [cle, valeur] of Object.entries(propre)) {
    if (valeur === undefined || valeur === null) continue;
    formulaire.append(cle, typeof valeur === 'object' ? JSON.stringify(valeur) : String(valeur));
  }
  formulaire.append('contenu', corps.trim());
  for (const nom of aEnvoyer) {
    const contenu = await readFile(path.join('src/assets/projets', slug, nom));
    formulaire.append('images', new Blob([contenu]), nom);
  }

  const existant = await (await api(`/api/collections/projets/records?filter=${encodeURIComponent(`slug="${slug}"`)}&perPage=1`, {}, token)).json();
  if (existant.items?.length) {
    await api(`/api/collections/projets/records/${existant.items[0].id}`, { method: 'PATCH', body: formulaire }, token);
    console.log(`Mis à jour : ${slug} (${aEnvoyer.size} images)`);
  } else {
    await api('/api/collections/projets/records', { method: 'POST', body: formulaire }, token);
    console.log(`Créé : ${slug} (${aEnvoyer.size} images)`);
  }
}
console.log('Terminé.');
