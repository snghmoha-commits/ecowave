/* Ecowave Rental — Legal content (Mentions légales · CGL · Privacy) NL/FR/EN */
(function () {
  const C = window.ECOWAVE_DATA.company;
  const addr = `${C.street}, ${C.city}, ${C.country}`;
  const L = {
    nl: {
      eyebrow: "Juridisch", title: "Juridische informatie", lead: "Transparantie en vertrouwen staan centraal bij Ecowave.",
      updated: "Laatst bijgewerkt: juni 2026",
      nav: { legal: "Wettelijke vermeldingen", terms: "Algemene voorwaarden", privacy: "Privacybeleid", conditions: "Huurvoorwaarden" },
      legal: {
        title: "Wettelijke vermeldingen",
        blocks: [
          { h: "Onderneming", items: [`Handelsnaam: ${C.legalName}`, `Ondernemingsnummer: BE ${C.enterprise}`, `BTW: ${C.vat}`, `Maatschappelijke zetel: ${addr}`] },
          { h: "Contact", items: [`E-mail: ${window.ECOWAVE_DATA.email}`, `Telefoon / WhatsApp: ${window.ECOWAVE_DATA.phone}`] },
          { h: "Verantwoordelijke uitgever", items: [`${C.legalName}, ${addr}`] },
          { h: "Hosting", items: ["Deze website wordt gehost bij de door Ecowave gekozen hostingprovider, binnen de Europese Unie."] },
        ],
      },
      terms: {
        title: "Algemene huurvoorwaarden",
        blocks: [
          { h: "1. Bestuurder", items: ["Minimumleeftijd: 20 jaar.", "Rijbewijs sinds minstens 1 jaar geldig.", "Geldig identiteitsbewijs vereist bij ophaling."] },
          { h: "2. Kilometers", items: ["Inbegrepen kilometers per dag zoals vermeld per voertuig.", "Extra kilometers worden aangerekend aan het per voertuig vermelde tarief."] },
          { h: "3. Waarborg & betaling", items: ["Een waarborg is verschuldigd vóór of bij ophaling, cash of via bankoverschrijving.", "De waarborg wordt teruggestort na controle van het voertuig bij teruggave."] },
          { h: "4. Verzekering", items: ["Elk voertuig is verzekerd (omnium + bijstand).", "Schade door nalatigheid, overtredingen of verkeerd gebruik valt ten laste van de huurder."] },
          { h: "5. Annulering", items: ["Gratis annulering tot 48 uur vóór ophaling.", "Reservaties verlopen via WhatsApp of e-mail en worden door Ecowave bevestigd."] },
          { h: "6. Gebruik van het voertuig", items: ["Roken en huisdieren zijn niet toegelaten.", "Het voertuig mag België niet verlaten zonder voorafgaand akkoord.", "De huurder geeft het voertuig in dezelfde staat terug."] },
        ],
      },
      privacy: {
        title: "Privacybeleid",
        blocks: [
          { h: "Welke gegevens", items: ["Naam, telefoon, e-mail en reservatiegegevens die u zelf doorgeeft via het formulier of WhatsApp."] },
          { h: "Waarvoor", items: ["Uitsluitend om uw reservatie te behandelen en met u te communiceren.", "Wij verkopen of delen uw gegevens nooit met derden voor marketing."] },
          { h: "Bewaring", items: ["Gegevens worden niet langer bewaard dan nodig voor de dienstverlening en wettelijke verplichtingen."] },
          { h: "Uw rechten (GDPR)", items: [`U kunt uw gegevens inkijken, corrigeren of laten verwijderen via ${window.ECOWAVE_DATA.email}.`] },
          { h: "Cookies", items: ["Deze website gebruikt geen tracking- of advertentiecookies. Taalvoorkeur wordt lokaal in uw browser bewaard."] },
        ],
      },
    },
    fr: {
      eyebrow: "Légal", title: "Informations légales", lead: "La transparence et la confiance sont au cœur d'Ecowave.",
      updated: "Dernière mise à jour : juin 2026",
      nav: { legal: "Mentions légales", terms: "Conditions générales", privacy: "Confidentialité", conditions: "Conditions de location" },
      legal: {
        title: "Mentions légales",
        blocks: [
          { h: "Entreprise", items: [`Dénomination : ${C.legalName}`, `Numéro d'entreprise : BE ${C.enterprise}`, `TVA : ${C.vat}`, `Siège social : ${addr}`] },
          { h: "Contact", items: [`E-mail : ${window.ECOWAVE_DATA.email}`, `Téléphone / WhatsApp : ${window.ECOWAVE_DATA.phone}`] },
          { h: "Éditeur responsable", items: [`${C.legalName}, ${addr}`] },
          { h: "Hébergement", items: ["Ce site est hébergé chez le prestataire d'hébergement choisi par Ecowave, au sein de l'Union européenne."] },
        ],
      },
      terms: {
        title: "Conditions générales de location",
        blocks: [
          { h: "1. Conducteur", items: ["Âge minimum : 20 ans.", "Permis de conduire valide depuis au moins 1 an.", "Pièce d'identité valide exigée à la prise."] },
          { h: "2. Kilométrage", items: ["Kilomètres inclus par jour selon le véhicule.", "Les kilomètres supplémentaires sont facturés au tarif indiqué par véhicule."] },
          { h: "3. Caution & paiement", items: ["Une caution est due avant ou à la prise, en espèces ou par virement.", "La caution est restituée après contrôle du véhicule au retour."] },
          { h: "4. Assurance", items: ["Chaque véhicule est assuré (omnium + assistance).", "Les dommages dus à une négligence, infraction ou mauvaise utilisation sont à charge du locataire."] },
          { h: "5. Annulation", items: ["Annulation gratuite jusqu'à 48 h avant la prise.", "Les réservations se font via WhatsApp ou e-mail et sont confirmées par Ecowave."] },
          { h: "6. Usage du véhicule", items: ["Tabac et animaux non autorisés.", "Le véhicule ne peut quitter la Belgique sans accord préalable.", "Le locataire restitue le véhicule dans le même état."] },
        ],
      },
      privacy: {
        title: "Politique de confidentialité",
        blocks: [
          { h: "Quelles données", items: ["Nom, téléphone, e-mail et détails de réservation que vous communiquez via le formulaire ou WhatsApp."] },
          { h: "Finalité", items: ["Uniquement pour traiter votre réservation et communiquer avec vous.", "Nous ne vendons ni ne partageons jamais vos données à des tiers à des fins marketing."] },
          { h: "Conservation", items: ["Les données ne sont pas conservées plus longtemps que nécessaire au service et aux obligations légales."] },
          { h: "Vos droits (RGPD)", items: [`Vous pouvez consulter, corriger ou supprimer vos données via ${window.ECOWAVE_DATA.email}.`] },
          { h: "Cookies", items: ["Ce site n'utilise aucun cookie de pistage ou publicitaire. La préférence de langue est stockée localement dans votre navigateur."] },
        ],
      },
    },
    en: {
      eyebrow: "Legal", title: "Legal information", lead: "Transparency and trust are at the heart of Ecowave.",
      updated: "Last updated: June 2026",
      nav: { legal: "Legal notice", terms: "Terms & conditions", privacy: "Privacy", conditions: "Rental conditions" },
      legal: {
        title: "Legal notice",
        blocks: [
          { h: "Company", items: [`Trading name: ${C.legalName}`, `Enterprise number: BE ${C.enterprise}`, `VAT: ${C.vat}`, `Registered office: ${addr}`] },
          { h: "Contact", items: [`Email: ${window.ECOWAVE_DATA.email}`, `Phone / WhatsApp: ${window.ECOWAVE_DATA.phone}`] },
          { h: "Responsible publisher", items: [`${C.legalName}, ${addr}`] },
          { h: "Hosting", items: ["This website is hosted with the hosting provider chosen by Ecowave, within the European Union."] },
        ],
      },
      terms: {
        title: "General rental terms",
        blocks: [
          { h: "1. Driver", items: ["Minimum age: 20 years.", "Driving licence held for at least 1 year.", "Valid ID required at pickup."] },
          { h: "2. Mileage", items: ["Included kilometres per day as stated per vehicle.", "Extra kilometres are billed at the rate stated per vehicle."] },
          { h: "3. Deposit & payment", items: ["A deposit is due before or at pickup, by cash or bank transfer.", "The deposit is refunded after inspection of the vehicle on return."] },
          { h: "4. Insurance", items: ["Each vehicle is insured (comprehensive + assistance).", "Damage from negligence, offences or misuse is at the renter's charge."] },
          { h: "5. Cancellation", items: ["Free cancellation up to 48 hours before pickup.", "Bookings are made via WhatsApp or email and confirmed by Ecowave."] },
          { h: "6. Vehicle use", items: ["Smoking and pets are not allowed.", "The vehicle may not leave Belgium without prior agreement.", "The renter returns the vehicle in the same condition."] },
        ],
      },
      privacy: {
        title: "Privacy policy",
        blocks: [
          { h: "What data", items: ["Name, phone, email and booking details you provide via the form or WhatsApp."] },
          { h: "Purpose", items: ["Only to handle your booking and communicate with you.", "We never sell or share your data with third parties for marketing."] },
          { h: "Retention", items: ["Data is kept no longer than necessary for the service and legal obligations."] },
          { h: "Your rights (GDPR)", items: [`You can access, correct or delete your data via ${window.ECOWAVE_DATA.email}.`] },
          { h: "Cookies", items: ["This site uses no tracking or advertising cookies. Your language preference is stored locally in your browser."] },
        ],
      },
    },
  };
  ["nl", "fr", "en"].forEach((l) => { window.ECOWAVE_I18N[l].legalPage = L[l]; });
})();
