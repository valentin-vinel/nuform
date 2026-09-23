/**
 * ─────────────────────────────────────────────────────────────
 *  EMPLACEMENT 1 / 5 — Données du studio
 *  Tout ce qui est propre au studio vit ici : textes, prix, téléphone,
 *  avis, équipe, photos. Aucun composant n'en contient.
 *
 *  Les valeurs entre crochets « [ … ] » sont des placeholders : elles
 *  s'affichent telles quelles pour qu'aucun oubli ne passe inaperçu.
 *
 *  Mise en forme des titres :
 *    **mot**  → graisse 700
 *    *mot*    → Cormorant Garamond italique (un seul par titre)
 *    \n       → retour à la ligne
 *  Jetons remplacés à l'affichage :
 *    {date}     → date de fin de l'offre (`offer.endDate`)
 *    ((…))      → passage affiché seulement si `offer.endDate` est rempli
 *    {discount} → pourcentage de remise (`offer.discountPercent`)
 * ─────────────────────────────────────────────────────────────
 */

/** Un emplacement photo. Tant que `file` est null, un aplat affiche `subject`. */
export interface PhotoSlot {
  /** Nom du fichier dans src/assets/studio/. null tant que la photo n'est pas livrée. */
  file: string | null;
  /** Ce que la photo doit montrer. Affiché dans l'emplacement tant qu'elle manque. */
  subject: string;
  /** Texte alternatif descriptif. Obligatoire dès que `file` est rempli. */
  alt: string;
}

// export interface Plan {
//   name: string;
//   /** Prix mensuel remisé, sans le symbole €. */
//   price: string;
//   /** Prix mensuel avant remise, sans le symbole €. */
//   priceBefore: string;
//   /** Nombre de séances par semaine, ce qui est inclus. */
//   details: string;
//   /** Formule mise en avant. Seulement si c'est vrai. */
//   featured?: boolean;
// }

export interface Plan {
  id: string;
  /** Intitulé du palier, ex. « 4 séances » ou « Illimité ». */
  name: string;
  /** Rythme, ex. « 1x par semaine ». Absent pour l'illimité. */
  frequency?: string;
  /** Prix mensuel remisé, sans le symbole €, ex. « 84,15 ». */
  price: string;
  /** Prix mensuel avant remise. Absent si aucune remise sur ce palier. */
  priceBefore?: string;
  /** Prix par séance calculé sur le prix remisé, ex. « 21,04 ». */
  pricePerSession?: string;
  /** Mise en avant. Uniquement si le studio confirme que c'est la plus prise. */
  featured?: boolean;
}

export interface PlanCategory {
  id: string;
  /** Ex. « Reformer · Nü Sculpt ». */
  name: string;
  /** Une phrase de contexte sous le titre. Optionnelle. */
  intro?: string;
  plans: Plan[];
}

export interface Review {
  text: string;
  /** Prénom et initiale. */
  author: string;
  source: string;
  /** Mois et année de l'avis. */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Avis d'exemple : s'affiche marqué comme tel. À supprimer avant mise en ligne. */
  placeholder?: boolean;
}

export interface Coach {
  firstName: string;
  certification: string;
  photo: PhotoSlot;
}

export interface Studio {
  /** URL publique, pour la balise canonique. Vide : pas de balise. */
  siteUrl: string;
  name: string;
  tagline: string;
  /** Logo SVG dans src/assets/studio/. null : le nom s'affiche en texte. */
  logo: string | null;
  /** Adresse sur une ligne, pour le pied de page. */
  address: string;
  /** Raison sociale, pour les mentions légales. */
  legalName: string;
  email: string;

  /** Format international, pour le lien tel: (ex. +33612345678). */
  phone: string;
  /** Le numéro tel qu'on le lit. */
  phoneDisplay: string;
  /** Mention à côté du numéro. null pour masquer. Seulement si c'est tenu. */
  phoneNote: string | null;

  /** Libellé unique de l'appel à l'action, identique partout. */
  cta: { label: string };

  meta: { title: string; description: string };

  hero: {
    /** Reprend l'accroche de l'annonce Meta. En capitales à l'affichage. */
    title: string;
    photo: PhotoSlot;
  };

  // offer: {
  //   discountPercent: number;
  //   /** Sous le pourcentage dans le hero. */
  //   discountLabel: string;
  //   commitment: string;
  //   /** Avantages : dans le hero sur ordinateur, dans le bandeau sur mobile. */
  //   perks: string[];
  //   /** Date de fin réelle, AAAA-MM-JJ (JJ/MM/AAAA accepté). null : aucune date affichée. */
  //   endDate: string | null;
  //   plans: Plan[];
  //   featuredLabel: string;
  //   priceUnit: { short: string; long: string };
  //   conditions: string[];
  // };

  offer: {
    discountPercent: number;
    /** Sous le pourcentage dans le hero. */
    discountLabel: string;
    commitment: string;
    /** Avantages : hero sur ordinateur, bandeau sur mobile. */
    perks: string[];
    /** Date de fin réelle, AAAA-MM-JJ. null : aucune date affichée. */
    endDate: string | null;
    categories: PlanCategory[];
    featuredLabel: string;
    priceUnit: { short: string; long: string };
    /** Gabarit du prix par séance, {price} remplacé à l'affichage. */
    perSessionLabel: string;
    /** Conditions, hors date de fin qui est rendue à part depuis endDate. */
    conditions: string[];
  };

  /**
   * Bandeau sombre sous le hero. Des faits vérifiables uniquement.
   * `mobile: true` : l'élément reste affiché sur mobile, à la suite des `perks`.
   */
  reassurance: { text: string; mobile: boolean }[];

  sections: {
    offer: { eyebrow: string; title: string };
    studio: {
      eyebrow: string;
      title: string;
      text: string;
      swipeHint: string;
      photos: PhotoSlot[];
    };
    reviews: { eyebrow: string; title: string };
    team: { eyebrow: string; title: string };
    final: {
      title: string;
      text: string;
      validity: string;
      /** Photo de la devanture, en grand sous l'appel final. null : aucune. */
      storefront: PhotoSlot | null;
      /** Quatre photos carrées, en grille 2 × 2 à côté de la devanture. */
      photos: PhotoSlot[];
    };
  };

  reviews: Review[];

  /** Note relevée sur la fiche Google. null pour masquer. Jamais recopiée de mémoire. */
  googleReview: { rating: number | null; count: number | null } | null;

  coaches: Coach[];
}

export const studio: Studio = {
  siteUrl: '',
  name: 'nü form',
  tagline: '', // déjà dans le logo
  logo: 'logo.png',
  address: '11 place Aristide Briand, 72000 Le Mans',
  legalName: '[ Raison sociale ]',
  email: '[ contact@… ]',

  phone: '+33243208733',
  phoneDisplay: '02 43 20 87 33',
  // À retirer si le studio ne décroche pas systématiquement.
  phoneNote: 'réponse immédiate',

  cta: { label: 'Appeler le studio' },

  meta: {
    title: 'nü form - Studio Pilates · Offre de rentrée',
    description: '[ Description de la page pour les moteurs et le partage, 150 caractères max. ]',
  },

  hero: {
    title: 'La rentrée,\n**c’est aussi pour toi.**',
    photo: {
      file: "studio7.jpeg",
      subject: 'Photo hero - visuel de campagne, plan rapproché, tenue orange',
      alt: 'Photo hero',
    },
  },

  // offer: {
  //   discountPercent: 15,
  //   discountLabel: 'sur tous nos abonnements',
  //   commitment: 'Engagement sur 12 mois',
  //   perks: ['Welcome bag offert', 'Sans frais d’inscription'],
  //   endDate: "30/09/2026",
  //   plans: [
  //     {
  //       name: 'Reformer - Nü Sculpt',
  //       price: '[ PRIX ]',
  //       priceBefore: '[ PRIX ]',
  //       details: '[ Nombre de séances par semaine, ce qui est inclus ]',
  //     },
  //     {
  //       name: '[ Formule 2 ]',
  //       price: '[ PRIX ]',
  //       priceBefore: '[ PRIX ]',
  //       details: '[ Nombre de séances par semaine, ce qui est inclus ]',
  //       // À confirmer avec le studio : retirer si ce n'est pas la formule la plus choisie.
  //       // featured: true,
  //     },
  //     {
  //       name: '[ Formule 3 ]',
  //       price: '[ PRIX ]',
  //       priceBefore: '[ PRIX ]',
  //       details: '[ Nombre de séances par semaine, ce qui est inclus ]',
  //     },
  //   ],
  //   featuredLabel: 'Le plus choisi',
  //   priceUnit: { short: '/ mois', long: 'par mois, 12 mois' },
  //   conditions: [
  //     'Remise valable sur un engagement de 12 mois((, jusqu’au {date})).',
  //     'Welcome bag offert à la signature.',
  //     '[ Autres conditions ].',
  //   ],
  // },

  offer: {
    discountPercent: 15,
    discountLabel: 'sur tous nos abonnements',
    commitment: 'Engagement sur 12 mois',
    perks: ['Welcome bag offert', 'Sans frais d\u2019inscription'],
    endDate: '2026-09-30',
  
    categories: [
      {
        id: 'reformer',
        name: 'Reformer · Nü Sculpt',
        plans: [
          { id: 'ref-4',  name: '4 séances',  frequency: '1x par semaine', price: '84,15',  priceBefore: '99',  pricePerSession: '21,04' },
          { id: 'ref-8',  name: '8 séances',  frequency: '2x par semaine', price: '153',    priceBefore: '180', pricePerSession: '19,13' },
          { id: 'ref-12', name: '12 séances', frequency: '3x par semaine', price: '204',    priceBefore: '240', pricePerSession: '17' },
          { id: 'ref-ill', name: 'Illimité',                               price: '254,15', priceBefore: '299' },
        ],
      },
      {
        id: 'hot',
        name: 'Hot Pilates infrarouge',
        plans: [
          { id: 'hot-4',  name: '4 séances',  frequency: '1x par semaine', price: '58,65', priceBefore: '69',  pricePerSession: '14,66' },
          { id: 'hot-8',  name: '8 séances',  frequency: '2x par semaine', price: '102',   priceBefore: '120', pricePerSession: '12,75' },
          { id: 'hot-12', name: '12 séances', frequency: '3x par semaine', price: '136',   priceBefore: '160', pricePerSession: '11,33' },
        ],
      },
    ],
  
    featuredLabel: 'Le plus choisi',
    priceUnit: { short: '/ mois', long: 'par mois, engagement 12 mois' },
    perSessionLabel: 'soit {price} € / séance',
    conditions: [
      'Remise de {discount} applicable sur un engagement de 12 mois.',
      'Welcome bag offert à la signature.',
      'Sans frais d\u2019inscription.',
    ],
  },

  reassurance: [
    // Nombre réel de reformers par cours. Ne jamais l'arrondir à la baisse.
    { text: '6 places par cours', mobile: true },
    { text: 'Séances de 50 min', mobile: false },
    { text: 'Coachs certifiées', mobile: false },
    { text: '7 j / 7', mobile: false },
  ],

  sections: {
    offer: {
      eyebrow: 'L’offre de rentrée',
      title: 'Les abonnements, remisés de {discount}',
    },
    studio: {
      eyebrow: 'Le studio',
      title: 'Nü Form Studio Pilates, en photo',
      text: '',
      swipeHint: 'Faites glisser pour parcourir',
      photos: [
        { file: "studio10.jpeg", subject: 'Photo - accueil, vestiaire', alt: 'Photo du studio et reformers' },
        { file: 'studio2.jpg', subject: 'Photo - reformers', alt: 'Photo des reformers' },
        { file: "studio3.jpg", subject: 'Photo - mur, décoration et accessoires', alt: 'Photo du décord mural, accessoires et tapis' },
        { file: 'studio1.jpg', subject: 'Photo - la salle, reformers', alt: 'Photo du studio, reformer et tapis' },
        { file: "studio12.jpg", subject: 'Photo - ', alt: 'Photo de la devanture du studio' },
        { file: "studio6.jpeg", subject: 'Photo - accessoires', alt: "Photo des accessoires et tapis" },

      ],
    },
    reviews: {
      eyebrow: 'Elles y sont déjà',
      title: "Ce qu'en pensent nos clientes",
    },
    team: {
      eyebrow: 'L’équipe',
      title: 'Qui va t’accompagner.',
    },
    final: {
      title: 'On en parle\n**au téléphone ?**',
      text: '',
      validity: '((Offre valable jusqu’au {date}))',
      storefront: {
        file: 'boutique.jpg',
        subject: 'Devanture du studio',
        alt: 'Devanture orange du studio nü form, place Aristide Briand',
      },
      photos: [
        { file: 'studio13.png', subject: 'Photo carrée 1', alt: 'Photo' },
        { file: 'studio11.jpg', subject: 'Photo carrée 2', alt: 'Photo' },
        { file: 'studio15.jpg', subject: 'Photo carrée 3', alt: 'Photo' },
        { file: 'studio14.png', subject: 'Photo carrée 4', alt: 'Photo' },
      ],
    },
  },

  // Uniquement des avis réels, copiés depuis leur source. Ne jamais en inventer.
  reviews: [
    {
      text: 'Je suis déjà venue plusieurs fois pour prendre une boisson et aujourd’hui pour la première fois pour tester le pilate. Je ne peux que recommander ! La déco est top et le personnel hyper accueillant :)',
      author: 'Alexandra',
      source: 'Google',
      date: 'Juillet 2026',
      rating: 5,
    },
    {
      text: 'Pour avoir testé plusieurs studio de Pilate sur Le Mans je dois dire que ce studio est de loin le meilleur. Les lieux sont propres, accueillants et chaleureux. Inès est qualifié, professionnelle et gentille et très agréable. Je recommande +++',
      author: 'Charlène',
      source: 'Google',
      date: 'Mai 2026',
      rating: 5,
    },
    {
      text: "Une première expérience super! Test d'une séance reformer avec Johanna qui sait mettre en confiance, booster et motiver dans la bonne humeur! Et un accueil très chaleureux accompagné d'un matcha savoureux ensuite. Hâte d'y retourner !",
      author: 'Marguerite',
      source: 'Google',
      date: 'Avril 2026',
      rating: 5,
    },
  ],

  googleReview: { rating: 4.9, count: 98 },

  coaches: [1, 2, 3, 4].map((n) => ({
    firstName: '[ Prénom ]',
    certification: '[ Certification ]',
    photo: { file: null, subject: `Portrait coach ${n}`, alt: '' },
  })),
};
