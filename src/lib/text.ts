import { studio } from '../config/studio';

/**
 * Date de fin de l'offre. Accepte AAAA-MM-JJ ou JJ/MM/AAAA ; tout autre
 * format, ou une date qui n'existe pas (31/02), arrête le build avec un
 * message clair plutôt qu'un « Invalid time value ».
 */
function parseEndDate(raw: string | null): Date | null {
  if (!raw) return null;
  const value = raw.trim();
  const iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  const fr = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const [y, m, d] = iso
    ? [+iso[1], +iso[2], +iso[3]]
    : fr
      ? [+fr[3], +fr[2], +fr[1]]
      : [NaN, NaN, NaN];
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  if (Number.isNaN(date.getTime()) || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
    throw new Error(
      `offer.endDate illisible : « ${raw} ». Écrire la date au format AAAA-MM-JJ, par exemple '2026-10-31'.`,
    );
  }
  return date;
}

export const offerEnd = parseEndDate(studio.offer.endDate);

const endDateLabel = offerEnd
  ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(offerEnd)
  : '';

/**
 * Remplace les jetons {date} et {discount} des textes de studio.ts.
 * Un passage entre (( … )) n'est gardé que si la date de fin est connue :
 * la date est réelle ou absente, jamais un placeholder.
 */
export function fill(text: string): string {
  return text
    .replace(/\(\((.*?)\)\)/g, (_, inner: string) => (offerEnd ? inner : ''))
    .replaceAll('{date}', endDateLabel)
    .replaceAll('{discount}', `${studio.offer.discountPercent} %`)
    .trim();
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
