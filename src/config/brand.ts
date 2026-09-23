/**
 * ─────────────────────────────────────────────────────────────
 *  EMPLACEMENT 2 / 5 — Identité visuelle
 *  Seul endroit du projet où une couleur ou une police est écrite.
 *  Landing.astro les expose en variables CSS (--c-*, --f-*).
 * ─────────────────────────────────────────────────────────────
 */

export const brand = {
  colors: {
    bg: '#FFF6F0',        // crème
    surface: '#FFFFFF',
    ink: '#3A2419',       // brun profond
    muted: '#6B5648',
    accent: '#C1551A',    // orange assombri pour rester lisible
    accentInk: '#FFFFFF',
    accentSoft: '#E8925C',// sur fond sombre uniquement
    peach: '#E7C3AC',     // aplats photo, sections secondaires
    deep: '#3A2419',
    deepInk: '#FFF6F0',
    border: '#E3CDBE',
  },
  fonts: {
    heading: '"Jost", "Avenir Next", sans-serif',
    body: '"Jost", "Avenir Next", sans-serif',
    accentSerif: '"Cormorant Garamond", Georgia, serif',
  },
  radius: '12px',
  maxWidth: '1180px',
} as const;
