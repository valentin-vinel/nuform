/**
 * Reçoit les demandes de rappel envoyées par netlify/functions/submission-created.ts
 * et les ajoute en bas de l'onglet « Demandes » du tableur.
 *
 * Installation : voir README.md, section « Google Sheets ».
 * Propriété du script à définir : SECRET (même valeur que SHEETS_WEBHOOK_SECRET
 * côté Netlify).
 */

const SHEET_NAME = 'Demandes';

// [en-tête, valeur]. L'ordre des colonnes du tableur suit cette liste.
// « Statut » et « Notes » sont remplis à la main par le studio.
const COLUMNS = [
  ['Reçue le', (r) => new Date(r.created_at)],
  ['Prénom', (r) => r.prenom],
  ['Téléphone', (r) => r.telephone],
  ['Statut', () => 'À rappeler'],
  ['Notes', () => ''],
  ['utm_source', (r) => r.utm_source],
  ['utm_medium', (r) => r.utm_medium],
  ['utm_campaign', (r) => r.utm_campaign],
  ['utm_content', (r) => r.utm_content],
  ['utm_term', (r) => r.utm_term],
  ['fbclid', (r) => r.fbclid],
  ['event_id', (r) => r.event_id],
  ['ID Netlify', (r) => r.id],
];

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (error) {
    return reply('bad request');
  }

  const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
  if (!secret || body.secret !== secret || !body.row) return reply('unauthorized');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    // Netlify peut rejouer un événement : une demande déjà présente n'est pas recopiée.
    if (!alreadyThere(sheet, body.row.id)) {
      sheet.appendRow(COLUMNS.map(([, value]) => safe(value(body.row))));
    }
  } finally {
    lock.releaseLock();
  }
  return reply('ok');
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy hh:mm');
  }
  return sheet;
}

function alreadyThere(sheet, id) {
  if (!id || sheet.getLastRow() < 2) return false;
  const column = COLUMNS.length;
  return Boolean(
    sheet
      .getRange(2, column, sheet.getLastRow() - 1, 1)
      .createTextFinder(String(id))
      .matchEntireCell(true)
      .findNext(),
  );
}

// Un texte qui commence par = + - @ serait lu comme une formule, et un numéro
// comme « 0612345678 » deviendrait le nombre 612345678 : l'apostrophe garde la
// valeur en texte, sans s'afficher.
function safe(value) {
  if (value instanceof Date) return value;
  const text = String(value == null ? '' : value);
  return /^[=+\-@0-9]/.test(text) ? "'" + text : text;
}

function reply(text) {
  return ContentService.createTextOutput(text);
}
