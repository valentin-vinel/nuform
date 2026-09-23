import type { ImageMetadata } from 'astro';
import type { PhotoSlot } from '../config/studio';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/studio/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/**
 * Fichier d'un emplacement photo de studio.ts. undefined tant que `file` est
 * null ; arrête le build si le fichier manque ou si l'alt est vide.
 */
export function resolvePhoto(slot: PhotoSlot): ImageMetadata | undefined {
  if (!slot.file) return undefined;
  const src = files[`../assets/studio/${slot.file}`]?.default;
  if (!src) throw new Error(`Photo introuvable : src/assets/studio/${slot.file}`);
  if (!slot.alt.trim()) throw new Error(`Texte alternatif manquant pour ${slot.file}`);
  return src;
}
