/**
 * Informations globales du site, réutilisées partout (en-tête, footer, SEO, contact).
 * Modifier une valeur ici la met à jour sur toutes les pages.
 */
export const SITE = {
  nom: 'Laura Bailly',
  titre: 'Laura Bailly — Designer, communication & art digital',
  description:
    'Portfolio de Laura Bailly, étudiante en BUT MMI : design d’interfaces, communication visuelle et art digital. Études de cas Noyaux d’ombre, Wenddy, Ça pèse combien ?, TiK•TaK et MLP tcg.',
  signature: 'Designer - art digital - comm’',
  email: 'laura.bailly08102006@gmail.com',
  cv: '/cv-laura-bailly.pdf', // ⚠️ Dépose ton CV dans public/cv-laura-bailly.pdf
  lang: 'fr',
};

export const NAV = [
  { href: '/projets/', label: 'Projets', icone: 'dossier' },
  { href: '/a-propos/', label: 'À propos', icone: 'personne' },
  { href: '/contact/', label: 'Contact', icone: 'telephone' },
] as const;

export const RESEAUX = [
  { nom: 'LinkedIn', href: 'https://www.linkedin.com/in/laura-bailly-0a3b15345/', icone: 'linkedin' },
  { nom: 'Behance', href: 'https://www.behance.net/laurabailly', icone: 'behance' },
  { nom: 'E-mail', href: `mailto:${SITE.email}`, icone: 'mail' },
  // ⚠️ Liens à compléter (ils apparaissaient sur ta page contact Figma) :
  { nom: 'Instagram', href: 'https://www.instagram.com/', icone: 'instagram' },
  { nom: 'Pinterest', href: 'https://www.pinterest.fr/', icone: 'pinterest' },
] as const;
