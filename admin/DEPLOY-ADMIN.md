# Déployer l'espace Admin sur ecowaverental.be/admin

Ton dashboard est connecté à ta base Supabase. Pour le mettre en ligne :

## Étape 1 — Upload sur GitHub
1. Va sur ton dépôt GitHub `ecowave`
2. **Add file → Upload files**
3. Glisse **le dossier `admin/` entier** (avec TOUS ces fichiers) :
   - `index.html`
   - `admin.css`
   - `data.js`
   - `supabase-config.js`
   - `db.js`
   - `app.jsx`
   - `views-overview.jsx`
   - `views-bookings.jsx`
   - `views-calendar.jsx`
   - `views-customers.jsx`
   - `views-revenue.jsx`
   - `views-vehicles.jsx`
4. Important : garde-les **dans un dossier `admin/`** (pas à la racine)
5. **Commit changes**

## Étape 2 — Vercel redéploie tout seul (~30 s)

## Étape 3 — Teste
1. Va sur **`https://ecowaverental.be/admin`**
2. Connecte-toi avec :
   - Email : celui créé dans Supabase (Authentication → Users)
   - Mot de passe : celui que tu as choisi
3. ✅ Tu vois le tableau de bord avec tes 2 vraies voitures

## ✅ À partir de maintenant
- Chaque réservation que tu crées est **sauvegardée pour toujours** dans Supabase
- Tu peux te connecter depuis n'importe quel appareil (ordi, téléphone)
- Les dates bloquées + prix sont réels

## 🔒 Sécurité
- L'admin est protégé par ton login Supabase (impossible d'entrer sans le mot de passe)
- La page a `noindex` → Google ne l'affichera jamais dans les résultats
- Ne partage ton mot de passe qu'avec les personnes de confiance (toi + le client)

## ℹ️ Notes
- Au début, **Clients** et **Réservations** sont vides (c'est normal, c'est ta vraie base neuve). Crée ta première réservation via le bouton « Nouvelle réservation ».
- Pour ajouter un client lors d'une réservation : pour l'instant choisis un client existant. (Si tu veux le formulaire « créer un client » directement, dis-le moi et je l'ajoute.)
