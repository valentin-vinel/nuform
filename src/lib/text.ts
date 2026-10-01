import { studio } from '../config/studio';

/** Remplace le jeton {price} des textes de studio.ts par le prix de la séance découverte. */
export function fill(text: string): string {
  return text.replaceAll('{price}', `${studio.offer.price} €`).trim();
}

function escape(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Titre de studio.ts → HTML : **gras**, *italique Cormorant*, \n à la ligne.
 * Le texte est échappé avant toute balise.
 */
export function titleHtml(text: string): string {
  return escape(fill(text))
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, ' <br />');
}
