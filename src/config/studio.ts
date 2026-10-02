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
 *  Jeton remplacé à l'affichage :
 *    {price}    → prix de la séance découverte (`offer.price`), ex. « 15 € »
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

/** Une ligne du récapitulatif de la séance découverte. */
export interface Fact {
  label: string;
  value: string;
}

/** Une étape du déroulé de la séance découverte. */
export interface SessionStep {
  title: string;
  text: string;
}

/** Une question de la FAQ. Réponse factuelle, vérifiée auprès du studio. */
export interface FaqItem {
  question: string;
  answer: string;
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
  /**
   * Mentions légales (loi LCEN, art. 6) et politique de confidentialité.
   * Les valeurs entre crochets s'affichent telles quelles : tout remplir avant
   * la mise en ligne. La plupart figurent sur l'extrait Kbis.
   */
  legal: {
    /** SAS, SARL, EURL, entreprise individuelle… */
    form: string;
    /** Capital social, ex. « 1 000 € ». Vide pour une entreprise individuelle. */
    capital: string;
    /** Siège social, s'il diffère de `address`. Vide sinon. */
    headOffice: string;
    /** Ex. « RCS Le Mans 123 456 789 ». */
    registration: string;
    /** Numéro de TVA intracommunautaire, ou mention d'exonération. */
    vat: string;
    /** Prénom, nom et fonction, ex. « Jeanne Martin, gérante ». */
    publicationDirector: string;
    /** `phone` vide : ligne masquée (hébergeur sans numéro publié). */
    host: { name: string; address: string; phone: string };
  };

  /** Format international, pour le lien tel: (ex. +33612345678). */
  phone: string;
  /** Le numéro tel qu'on le lit. */
  phoneDisplay: string;
  /** Proposé en secondaire, sous chaque appel à l'action : « {phoneAlt} 02 43… ». */
  phoneAlt: string;

  /** Libellé unique de l'appel à l'action, identique partout. Mène au formulaire. */
  cta: { label: string };

  meta: {
    title: string;
    description: string;
    /** Aperçu de partage (og:image), recadré en 1200 × 630. Exige `siteUrl`. null : aucun. */
    image: PhotoSlot | null;
  };

  hero: {
    /** Reprend l'accroche de l'annonce Meta. En capitales à l'affichage. */
    title: string;
    photo: PhotoSlot;
  };

  offer: {
    /** Prix de la séance découverte, sans le symbole €. */
    price: string;
    /** Sous le prix dans le hero. */
    priceLabel: string;
    /** Sous le prix dans le hero, ordinateur et mobile. Conditions et cours concernés. */
    perks: string[];
  };

  /**
   * Formulaire de demande de rappel (Netlify Forms, puis Google Sheets via
   * netlify/functions/submission-created.ts).
   */
  form: {
    /** Identifiant Netlify du formulaire. Le changer crée un nouveau formulaire côté Netlify. */
    name: string;
    title: string;
    text: string;
    firstNameLabel: string;
    phoneLabel: string;
    phoneHint: string;
    submit: string;
    sending: string;
    /** Sous le bouton, avec un lien vers la politique de confidentialité. */
    privacy: string;
    success: { title: string; text: string };
    error: string;
    /** Durée de conservation des demandes, reprise dans la politique de confidentialité. */
    retention: string;
  };

  /**
   * Bandeau sombre sous le hero. Des faits vérifiables uniquement.
   * `mobile: true` : l'élément reste affiché sur mobile, à la suite des `perks`.
   */
  reassurance: { text: string; mobile: boolean }[];

  sections: {
    offer: {
      eyebrow: string;
      title: string;
      text: string;
      /** Récapitulatif factuel de la séance. */
      facts: Fact[];
      /** Ce qui se passe après l'envoi du formulaire, dans l'ordre. */
      steps: string[];
    };
    studio: {
      eyebrow: string;
      title: string;
      text: string;
      swipeHint: string;
      photos: PhotoSlot[];
    };
    /** Déroulé de la séance découverte sur place, dans l'ordre. Vide : section masquée. */
    session: {
      eyebrow: string;
      title: string;
      text: string;
      steps: SessionStep[];
    };
    reviews: { eyebrow: string; title: string };
    faq: { eyebrow: string; title: string };
    team: { eyebrow: string; title: string };
    final: {
      title: string;
      text: string;
      /** Photo de la devanture, en grand sous l'appel final. null : aucune. */
      storefront: PhotoSlot | null;
      /** Quatre photos carrées, en grille 2 × 2 à côté de la devanture. */
      photos: PhotoSlot[];
    };
  };

  reviews: Review[];

  /** Vide : la FAQ n'est pas affichée. */
  faq: FaqItem[];

  /** Note relevée sur la fiche Google. null pour masquer. Jamais recopiée de mémoire. */
  googleReview: { rating: number | null; count: number | null } | null;

  /** Vide : la section équipe n'est pas affichée. */
  coaches: Coach[];
}

export const studio: Studio = {
  siteUrl: 'https://nu-form.netlify.app',
  name: 'nü form',
  tagline: '', // déjà dans le logo
  logo: 'logo.png',
  address: '11 place Aristide Briand, 72000 Le Mans',
  legalName: 'NU FORM',
  email: 'contact@nuform-pilates.com',
  legal: {
    form: 'SAS',
    capital: '1 000 €',
    headOffice: '',
    registration: 'RCS Le Mans 101 168 359 (SIRET 101 168 359 00012)',
    vat: 'FR43101168359',
    publicationDirector: 'Sinda El Yaagoubi, dirigeante',
    host: {
      name: 'Netlify, Inc.',
      address: '101 2nd Street, San Francisco, CA 94105, États-Unis',
      // Netlify ne publie aucun numéro : contact écrit uniquement.
      phone: '',
    },
  },

  phone: '+33243208733',
  phoneDisplay: '02 43 20 87 33',
  phoneAlt: 'Tu préfères appeler ?',

  cta: { label: 'Demander ma séance à {price}' },

  meta: {
    title: 'Nü Form - Studio Pilates · Séance découverte à 15 €',
    description: 'Studio Pilates nü form au Mans : ta première séance Reformer · Nü Sculpt à 15 €. Laisse ton numéro, le studio te rappelle pour choisir le créneau.',
    image: {
      file: 'boutique.jpg',
      subject: 'Devanture du studio',
      alt: 'Devanture orange du studio nü form, place Aristide Briand au Mans',
    },
  },

  hero: {
    // Provisoire : à remplacer par l'accroche de l'annonce Meta dès qu'elle est fixée.
    title: 'Découvre le Pilates Reformer,\n**au cœur du Mans.**',
    photo: {
      file: "studio7.jpeg",
      subject: 'Photo hero - visuel de campagne, plan rapproché, tenue orange',
      alt: 'Pratiquante en tenue orange siglée nü form, allongée sur un reformer',
    },
  },

  offer: {
    price: '15',
    priceLabel: 'ta séance découverte',
    perks: ['Reformer · Nü Sculpt', 'Réservée à une première visite'],
  },

  form: {
    name: 'seance-decouverte',
    title: 'Laisse ton numéro, on te rappelle',
    text: 'Le studio te rappelle pour choisir le créneau de ta séance.',
    firstNameLabel: 'Prénom',
    phoneLabel: 'Téléphone',
    phoneHint: 'Par exemple 06 12 34 56 78',
    submit: 'Envoyer ma demande',
    sending: 'Envoi en cours…',
    privacy: 'Ton prénom et ton numéro servent uniquement à te recontacter pour cette séance.',
    success: {
      title: 'C’est noté !',
      text: 'Le studio te rappelle pour choisir le créneau de ta séance découverte.',
    },
    error: 'L’envoi n’a pas fonctionné. Réessaie dans un instant, ou appelle directement le studio.',
    // Référentiel CNIL « gestion commerciale » : 3 ans après le dernier contact
    // pour un prospect. Validé avec le studio en octobre 2026.
    retention: '3 ans à compter de notre dernier échange',
  },

  reassurance: [
    // Nombre réel de reformers par cours. Ne jamais l'arrondir à la baisse.
    { text: '8 places par cours', mobile: true },
    { text: 'Séances de 50 min', mobile: true },
    { text: 'Coachs certifiées', mobile: true },
    { text: '7 j / 7', mobile: false },
  ],

  sections: {
    offer: {
      eyebrow: 'La séance découverte',
      title: 'Ta première séance, **à {price}**',
      text: '',
      facts: [
        { label: 'Cours', value: 'Reformer · Nü Sculpt' },
        { label: 'Durée', value: '50 min' },
        { label: 'Groupe', value: '8 places par cours' },
        { label: 'Pour qui', value: 'Première visite au studio' },
        { label: 'Tarif', value: '{price}' },
      ],
      steps: [
        'Tu laisses ton prénom et ton numéro.',
        'Le studio te rappelle pour choisir le créneau.',
        'Tu viens découvrir le reformer.',
      ],
    },
    studio: {
      eyebrow: 'Le studio',
      title: 'Nü Form Studio Pilates, en photo',
      text: '',
      swipeHint: 'Faites glisser pour parcourir',
      photos: [
        { file: "studio10.jpeg", subject: 'Photo - accueil, vestiaire', alt: 'Salle de reformers sous des puits de lumière, logo nü form au mur' },
        { file: 'studio2.jpg', subject: 'Photo - reformers', alt: 'Reformers noirs alignés, sangles rouges et logo nü form gravé sur le cadre' },
        { file: "studio3.jpg", subject: 'Photo - mur, décoration et accessoires', alt: 'Mur d’accessoires sous l’enseigne nü form Studio Pilates : ballons et tapis siglés' },
        { file: 'studio1.jpg', subject: 'Photo - la salle, reformers', alt: 'Reformers devant un mur de ballons et de tapis nü form rangés' },
        { file: "studio12.jpg", subject: 'Photo - ', alt: 'Une coach guide une pratiquante allongée sur un reformer' },
        { file: "studio6.jpeg", subject: 'Photo - accessoires', alt: 'Tapis caramel marqué nü form Studio Pilates, en gros plan' },

      ],
    },
    session: {
      eyebrow: 'Le jour J',
      title: 'Comment se passe *ta* séance',
      text: '',
      // Le déroulé réel, validé par le studio. Jamais reconstitué de mémoire.
      // Vide : section masquée. Une entrée par étape, dans l'ordre :
      // { title: 'Accueil', text: 'Ce qui se passe, en une ou deux phrases.' },
      steps: [],
    },
    reviews: {
      eyebrow: 'Elles y sont déjà',
      title: "Ce qu'en pensent nos clientes",
    },
    faq: {
      eyebrow: 'Questions fréquentes',
      title: 'Avant ta première séance',
    },
    team: {
      eyebrow: 'L’équipe',
      title: 'Qui va t’accompagner.',
    },
    final: {
      title: 'Cette première séance,\n**on la planifie ensemble ?**',
      text: 'Laisse ton prénom et ton numéro : le studio te rappelle pour choisir le créneau.',
      storefront: {
        file: 'boutique.jpg',
        subject: 'Devanture du studio',
        alt: 'Devanture orange du studio nü form, place Aristide Briand',
      },
      photos: [
        { file: 'studio13.png', subject: 'Photo carrée 1', alt: 'Coin café du studio : comptoir en inox et mur orange au logo nü form' },
        { file: 'studio11.jpg', subject: 'Photo carrée 2', alt: 'Trois pratiquantes en étirement, un bras tendu vers le plafond' },
        { file: 'studio15.jpg', subject: 'Photo carrée 3', alt: 'Séance en plein air sur tapis nü form, lests aux chevilles' },
        { file: 'studio14.png', subject: 'Photo carrée 4', alt: 'Espace d’accueil avec fauteuils, tables et enseigne lumineuse nü form' },
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
    {
      text: "J'ai testé ce super endroit avec ma copine, et on a adoré 😊. L'accueil était vraiment chaleureux. L'espace est lumineux, les boissons sont délicieuses, et j'ai redécouvert mon amour pour le matcha.  J'ai déjà hâte d'y retourner pour prolonger l'expérience Nü Form 🧡",
      author: 'Anais',
      source: 'Google',
      date: 'Avril 2026',
      rating: 5,
    },
    {
      text: "Une découverte fantastique ! Les cours de Nu Form sont d'une qualité exceptionnelle, et Inès est une coach attentive et professionnelle qui prodigue d'excellents conseils. L'ambiance et l'accueil sont formidables, et le concept Pilates + café est tout simplement génial. J'ai particulièrement adoré le Pink Matcha en fin de séance 😍 Je recommande vivement !",
      author: 'Anissa',
      source: 'Google',
      date: 'Mai 2026',
      rating: 5,
    },
    {
      text: "Le studio de Pilates est impeccable et incroyablement bien équipé. Les boissons sont tout simplement délicieuses et, surtout, saines. Le personnel est charmant et attentionné. Si vous souhaitez passer un moment agréable et paisible, vous pouvez être sûr que cet endroit deviendra votre nouveau lieu de prédilection 😝",
      author: 'Romane',
      source: 'Google',
      date: 'Août 2026',
      rating: 5,
    },
  ],

  // Uniquement des réponses vérifiées auprès du studio. Une réponse entre
  // crochets s'affiche telle quelle et déclenche un avertissement au build.
  // Pas de doublon avec le reste de la page (prix, durée, groupe, réservation,
  // données personnelles y sont déjà).
  faq: [
    {
      question: 'Je n’ai jamais fait de Pilates, est-ce pour moi ?',
      answer: 'Oui, bien sûr : la séance découverte est ouverte aux débutantes. La coach s’adapte et prend en compte le niveau de chacune.',
    },
    {
      question: 'Y a-t-il un engagement après la séance ?',
      answer: 'Aucun : la séance découverte n’engage à rien. Elle sert à découvrir le Pilates Reformer à travers l’expérience nü form. Après le cours, on prend le temps de discuter de ton ressenti.',
    },
    {
      question: 'À quels horaires sont les cours ?',
      answer: 'Des cours sont proposés le matin, en journée et en soirée, pour s’adapter à tous les rythmes.',
    },
    {
      question: 'Où se trouve le studio ? Où se garer ?',
      answer: '11 place Aristide Briand, en hyper-centre du Mans. Plusieurs parkings payants se trouvent juste en face et à proximité, ainsi que des places en voirie aux alentours.',
    },
    {
      question: 'Y a-t-il des vestiaires et des douches ?',
      answer: 'Oui, le studio a des vestiaires et des douches.',
    },
  ],

  googleReview: { rating: 4.9, count: 98 },

  // Section masquée tant que la liste est vide. Une entrée par coach :
  // {
  //   firstName: 'Johanna',
  //   certification: 'Certifiée Pilates reformer',
  //   photo: { file: 'coach-johanna.jpg', subject: 'Portrait', alt: 'Johanna, coach, dans la salle de reformers' },
  // },
  coaches: [],
};
