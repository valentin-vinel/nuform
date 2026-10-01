# nü form — landing page séance découverte

Landing page de campagne Meta Ads : séance découverte Reformer · Nü Sculpt à 15 €.
Le visiteur laisse son prénom et son numéro, le studio le rappelle.

```sh
npm install
npm run dev       # ou : astro dev --background
npm run build     # site statique dans dist/
```

Textes, prix et téléphone : `src/config/studio.ts`. Couleurs et polices : `src/config/brand.ts`.

## Demandes de rappel

```
formulaire (LeadForm.astro)
  → Netlify Forms            demandes stockées + notification email au studio
  → submission-created.ts    fonction Netlify déclenchée à chaque demande validée
  → Apps Script (Code.gs)    ajoute une ligne dans le Google Sheet du studio
```

Le formulaire fonctionne sans le Google Sheet : si la copie échoue, la demande
reste dans Netlify et l'email part quand même. L'erreur est dans les logs de la
fonction (Netlify › Logs › Functions).

### 1. Netlify Forms

Le site doit être déployé par Netlify depuis le dépôt Git (pas par glisser-déposer
de `dist/`), sinon la fonction n'est pas déployée.

1. Netlify › Forms › **Enable form detection**, puis redéployer.
   Le formulaire `seance-decouverte` apparaît dans la liste.
2. Forms › Form notifications › **Add notification › Email notification** :
   formulaire `seance-decouverte`, adresse du studio.

En local (`astro dev` / `astro preview`), il n'y a pas de Netlify : l'envoi du
formulaire affiche le message d'erreur. C'est normal.

### 2. Google Sheets

1. Créer un Google Sheet avec le compte Google du studio.
2. Extensions › **Apps Script**. Remplacer le contenu de `Code.gs` par celui de
   `integrations/google-sheets/Code.gs`, enregistrer.
3. Paramètres du projet (roue dentée) › Propriétés du script › ajouter
   `SECRET` avec une longue valeur aléatoire (ex. `openssl rand -hex 32`).
4. **Déployer › Nouveau déploiement** › type « Application Web » :
   exécuter en tant que « Moi », accès « Tout le monde ». Autoriser le script,
   copier l'URL de l'application Web.
5. Netlify › Site configuration › Environment variables, portée « Functions » :
   - `SHEETS_WEBHOOK_URL` = l'URL de l'étape 4
   - `SHEETS_WEBHOOK_SECRET` = la valeur de `SECRET`
6. Redéployer le site, envoyer une demande de test : une ligne apparaît dans
   l'onglet « Demandes » (créé automatiquement), statut « À rappeler ».

Après toute modification de `Code.gs` : Déployer › Gérer les déploiements ›
modifier › nouvelle version. L'URL reste la même.

### Données personnelles

Les demandes vivent à deux endroits : Netlify Forms et le Google Sheet. La durée
de conservation annoncée dans la politique de confidentialité
(`studio.form.retention`) s'applique aux deux : purger les deux.

## Tracking

Pixel Meta après consentement uniquement (`PUBLIC_PIXEL_ID`, voir `.env.example`).
Événements, une fois par session chacun : `Contact` au clic sur le numéro,
`Lead` après l'envoi réussi d'une demande. L'eventID de `Lead` est aussi dans
le Google Sheet, pour une future déduplication CAPI.
