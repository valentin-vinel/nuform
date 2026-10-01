/**
 * Déclenchée par Netlify après chaque envoi validé (hors spam) d'un formulaire
 * du site. Copie la demande de rappel dans le Google Sheet du studio, via le
 * script Apps Script de integrations/google-sheets/Code.gs.
 *
 * Variables d'environnement (Netlify › Site configuration › Environment variables) :
 *   SHEETS_WEBHOOK_URL     URL de l'application Web Apps Script
 *   SHEETS_WEBHOOK_SECRET  même valeur que la propriété SECRET du script
 *
 * Si la copie échoue, la demande reste dans Netlify Forms et la notification
 * email part quand même : rien n'est perdu, l'erreur est dans les logs de la fonction.
 */
import { studio } from '../../src/config/studio';

declare const process: { env: Record<string, string | undefined> };

// Champs du formulaire recopiés dans le tableur (voir LeadForm.astro).
const FIELDS = [
  'prenom',
  'telephone',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'event_id',
] as const;

interface Submission {
  id: string;
  form_name: string;
  created_at: string;
  data: Record<string, unknown>;
}

export const handler = async (event: { body: string | null }) => {
  const { payload } = JSON.parse(event.body ?? '{}') as { payload?: Submission };
  if (payload?.form_name !== studio.form.name) return { statusCode: 200 };

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) {
    console.error('SHEETS_WEBHOOK_URL ou SHEETS_WEBHOOK_SECRET absent : demande non copiée dans Google Sheets.');
    return { statusCode: 200 };
  }

  const row: Record<string, string> = { id: payload.id, created_at: payload.created_at };
  for (const field of FIELDS) row[field] = String(payload.data[field] ?? '').trim();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, row }),
    });
    const text = await response.text();
    if (!response.ok || text !== 'ok') {
      console.error(`Google Sheets a refusé la demande ${payload.id} : ${response.status} ${text.slice(0, 200)}`);
    }
  } catch (error) {
    console.error(`Google Sheets injoignable pour la demande ${payload.id} :`, error);
  }

  return { statusCode: 200 };
};
