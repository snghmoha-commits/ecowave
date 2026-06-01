/* Ecowave Rental — extended content: fleet, vehicle detail, why/process/faq/contact/ai
   Extends window.ECOWAVE_DATA and window.ECOWAVE_I18N (defined in data.js). */
(function () {
  const D = window.ECOWAVE_DATA;

  // ---- Extended featured vehicle (detail page) ----
  D.vehicle.tagline = { nl: "Stijl, sport én comfort.", fr: "Style, sport et confort.", en: "Style, sport and comfort." };
  D.vehicle.highlights = {
    nl: ["AMG-look zonder compromis", "Perfecte mix sport & comfort", "Zuinig, betrouwbaar & tijdloos", "Ideaal als eerste premium wagen"],
    fr: ["Look AMG sans compromis", "Mix parfait sport & confort", "Sobre, fiable & intemporel", "Idéale comme 1ʳᵉ premium"],
    en: ["AMG look, no compromise", "Perfect sport & comfort mix", "Efficient, reliable & timeless", "Ideal first premium car"],
  };
  D.vehicle.tech = [
    { icon: "zap",          label: { nl: "Vermogen", fr: "Puissance", en: "Power" },           val: { nl: "± 122 pk", fr: "± 122 ch", en: "± 122 hp" } },
    { icon: "fuel",         label: { nl: "Motor", fr: "Moteur", en: "Engine" },                val: { nl: "1.6 Benzine", fr: "1.6 Essence", en: "1.6 Petrol" } },
    { icon: "gauge",        label: { nl: "Transmissie", fr: "Transmission", en: "Transmission" }, val: { nl: "Automaat", fr: "Automatique", en: "Automatic" } },
    { icon: "calendar",     label: { nl: "Bouwjaar", fr: "Année", en: "Year" },                val: { nl: "2017", fr: "2017", en: "2017" } },
    { icon: "users",        label: { nl: "Zitplaatsen", fr: "Places", en: "Seats" },           val: { nl: "5", fr: "5", en: "5" } },
    { icon: "sparkles",     label: { nl: "Uitvoering", fr: "Finition", en: "Trim" },           val: { nl: "AMG Line", fr: "AMG Line", en: "AMG Line" } },
    { icon: "wrench",       label: { nl: "Onderhoud", fr: "Entretien", en: "Maintenance" },    val: { nl: "Dealer onderhouden", fr: "Entretien concession", en: "Dealer maintained" } },
    { icon: "shield-check", label: { nl: "Conditie", fr: "État", en: "Condition" },            val: { nl: "Belgische platen · top", fr: "Plaques belges · top", en: "Belgian plates · top" } },
  ];

  // ---- AMG Line feature highlights (photo-driven sections) ----
  D.vehicle.amg = {
    nl: [
      { icon: "gem", t: "AMG sportbumper", d: "Agressieve front- en achterbumper in AMG-stijl." },
      { icon: "disc-3", t: "AMG velgen", d: "Sportieve lichtmetalen AMG-velgen, diamantgeslepen." },
      { icon: "armchair", t: "Sportzetels", d: "Strak afgewerkte sportstoelen met rode stiknaad." },
      { icon: "circle-gauge", t: "Multifunctioneel stuur", d: "Afgevlakt AMG-stuur met bediening op de duim." },
    ],
    fr: [
      { icon: "gem", t: "Bouclier AMG", d: "Boucliers avant et arrière au style AMG affirmé." },
      { icon: "disc-3", t: "Jantes AMG", d: "Jantes alliage AMG sportives, finition diamantée." },
      { icon: "armchair", t: "Sièges sport", d: "Sièges sport surpiqûres rouges, finition soignée." },
      { icon: "circle-gauge", t: "Volant multifonction", d: "Volant AMG à méplat, commandes au pouce." },
    ],
    en: [
      { icon: "gem", t: "AMG sport bumper", d: "Assertive AMG-style front and rear bumpers." },
      { icon: "disc-3", t: "AMG wheels", d: "Sporty diamond-cut AMG alloy wheels." },
      { icon: "armchair", t: "Sport seats", d: "Crisp sport seats with red contrast stitching." },
      { icon: "circle-gauge", t: "Multifunction wheel", d: "Flat-bottom AMG wheel with thumb controls." },
    ],
  };

  // ---- Fleet (dynamic catalog · scalable to N vehicles) ----
  // Each entry: id, name, price (null if not set), available, comingSoon, photo, cat, specs.
  D.fleet = [
    { id: "a-class", name: "Mercedes-Benz A-Class", price: 110, available: true, comingSoon: false,
      amgLine: true, photo: "assets/car-front.png", href: "vehicle.html?v=a-class",
      cat: { nl: "Hatchback", fr: "Compacte", en: "Hatchback" },
      specs: { power: "122 pk", seats: "5", fuel: { nl: "Benzine", fr: "Essence", en: "Petrol" } } },
    { id: "c-class", name: "Mercedes-Benz C-Class", price: 160, available: true, comingSoon: false,
      amgLine: true, featured: true, photo: "assets/cclass-front.jpg", href: "vehicle.html?v=c-class",
      cat: { nl: "Berline", fr: "Berline", en: "Sedan" },
      specs: { power: "170 pk", seats: "5", fuel: { nl: "Benzine", fr: "Essence", en: "Petrol" } } },
  ];

  // ---- Premium interior comfort cards ----
  D.vehicle.interior = {
    nl: [
      { icon: "armchair", t: "Sportzetels", d: "Strak omlijnde stoelen met rode stiknaad." },
      { icon: "circle-gauge", t: "AMG-stuur", d: "Afgevlakt multifunctioneel sportstuur." },
      { icon: "panel-top", t: "Carbon-look", d: "Premium dashboard met carbon-look inleg." },
      { icon: "monitor", t: "Media & Bluetooth", d: "Centraal display met audio & navigatie." },
    ],
    fr: [
      { icon: "armchair", t: "Sièges sport", d: "Sièges galbés à surpiqûres rouges." },
      { icon: "circle-gauge", t: "Volant AMG", d: "Volant sport multifonction à méplat." },
      { icon: "panel-top", t: "Look carbone", d: "Planche de bord à inserts look carbone." },
      { icon: "monitor", t: "Média & Bluetooth", d: "Écran central audio & navigation." },
    ],
    en: [
      { icon: "armchair", t: "Sport seats", d: "Sculpted seats with red contrast stitching." },
      { icon: "circle-gauge", t: "AMG wheel", d: "Flat-bottom multifunction sport wheel." },
      { icon: "panel-top", t: "Carbon-look", d: "Dashboard with carbon-look inlays." },
      { icon: "monitor", t: "Media & Bluetooth", d: "Central display with audio & navigation." },
    ],
  };

  const ext2 = {
    nl: {
      interiorSec: { eyebrow: "Premium interieur", title: "Een cockpit die klopt", lead: "Sportief, verfijnd en doordacht — elk detail in AMG-stijl." },
      amgSec: { eyebrow: "AMG Line", title: "AMG-look, zonder compromis", lead: "Sportief design van bumper tot stuur." },
      driverSec: { eyebrow: "Rijbeleving", title: "Aankomen met stijl", lead: "Gemaakt voor de stad, het werk en het weekend." },
      sell: ["Belgische platen", "Dealer onderhouden", "Geen kilometerstoppers", "Topconditie, geen storingen"],
      hero: { spec: "Specificaties", deposit: "Waarborg", book: "Reserveren", details: "Bekijk de wagen", weekend: "Weekend", week: "Week", month: "Maand", onRequest: "Op aanvraag", extraKm: "Extra km", kmUnit: "km/dag", tbc: "Nader te bepalen" },
    },
    fr: {
      interiorSec: { eyebrow: "Intérieur premium", title: "Un cockpit qui a tout bon", lead: "Sportif, raffiné et pensé — chaque détail en style AMG." },
      amgSec: { eyebrow: "AMG Line", title: "Le look AMG, sans compromis", lead: "Design sportif, du bouclier au volant." },
      driverSec: { eyebrow: "Expérience", title: "Arriver avec style", lead: "Pensée pour la ville, le travail et le week-end." },
      sell: ["Plaques belges", "Entretien concession", "Sans bloqueur de km", "État top, sans panne"],
      hero: { spec: "Spécifications", deposit: "Caution", book: "Réserver", details: "Voir le véhicule", weekend: "Week-end", week: "Semaine", month: "Mois", onRequest: "Sur demande", extraKm: "Km suppl.", kmUnit: "km/jour", tbc: "À préciser" },
    },
    en: {
      interiorSec: { eyebrow: "Premium interior", title: "A cockpit that gets it right", lead: "Sporty, refined and considered — every detail in AMG style." },
      amgSec: { eyebrow: "AMG Line", title: "The AMG look, no compromise", lead: "Sporty design from bumper to wheel." },
      driverSec: { eyebrow: "Experience", title: "Arrive in style", lead: "Built for the city, work and the weekend." },
      sell: ["Belgian plates", "Dealer maintained", "No km blockers", "Top condition, no faults"],
      hero: { spec: "Specifications", deposit: "Deposit", book: "Reserve", details: "View the car", weekend: "Weekend", week: "Week", month: "Month", onRequest: "On request", extraKm: "Extra km", kmUnit: "km/day", tbc: "To be confirmed" },
    },
  };

  // ---- i18n extensions ----
  const ext = {
    nl: {
      nav: { fleet: "Vloot", why: "Waarom wij", process: "Hoe het werkt", faq: "FAQ", contact: "Contact" },
      why: { eyebrow: "Waarom Ecowave", title: "Premium verhuur, zonder gedoe", lead: "Geen verborgen kosten, geen wachtrijen, geen verrassingen. Alleen een schone premium wagen en een vlekkeloze service.",
        items: [
          { icon: "car-front", t: "Premium modellen", d: "Zorgvuldig onderhouden premiumwagens, van SUV tot AMG." },
          { icon: "badge-euro", t: "Transparante prijzen", d: "Eén heldere dagprijs. Geen verborgen kosten achteraf." },
          { icon: "message-circle", t: "Boeken via WhatsApp", d: "Bevestig je reservatie in enkele minuten, persoonlijk." },
          { icon: "sparkles", t: "Showroom-staat", d: "Elke wagen wordt gereinigd en gecontroleerd voor vertrek." },
          { icon: "shield-check", t: "Volledig verzekerd", d: "Omnium en 24/7 bijstand standaard inbegrepen." },
          { icon: "map-pin", t: "Brussel & Antwerpen", d: "Flexibele ophaling op twee centrale locaties." },
        ] },
      process: { eyebrow: "Hoe het werkt", title: "Reserveren in vier stappen", lead: "Van selectie tot sleutels in minder dan een dag.",
        steps: [
          { t: "Kies je data", d: "Selecteer ophaal- en retourdatum in de kalender." },
          { t: "Vraag aan", d: "Vul het korte formulier in of stuur ons een WhatsApp." },
          { t: "Bevestiging", d: "We bevestigen beschikbaarheid en waarborg persoonlijk." },
          { t: "Rijden maar", d: "Haal je wagen op in Brussel of Antwerpen en vertrek." },
        ] },
      ai: { eyebrow: "AI-assistent", title: "Vragen? Onze assistent helpt 24/7", lead: "Beschikbaarheid, prijzen, voorwaarden — krijg meteen antwoord, of zet het gesprek voort op WhatsApp.", cta: "Start gesprek",
        bullets: ["Direct antwoord op je vraag", "Beschikbaarheid & prijsindicatie", "Naadloze overgang naar WhatsApp"] },
      faq: { eyebrow: "FAQ", title: "Veelgestelde vragen",
        items: [
          { q: "Wat heb ik nodig om te huren?", a: "Een geldig rijbewijs (min. 1 jaar) en een minimumleeftijd van 20 jaar. Een identiteitsbewijs en de waarborg volstaan om te starten." },
          { q: "Hoeveel kilometer is inbegrepen?", a: "250 km per dag is inbegrepen. Extra kilometers worden verrekend aan een vast tarief van €0,50/km." },
          { q: "Hoe werkt de waarborg?", a: "De waarborg bedraagt €1.000, te betalen bij ophaling in cash of via overschrijving, en wordt volledig terugbetaald na controle van de wagen. Om te reserveren vragen we €50 (1 dag) of €100 (2+ dagen)." },
          { q: "Kan ik kosteloos annuleren?", a: "Ja, tot 48 uur voor ophaling annuleer je gratis. De reservatiewaarborg wordt dan integraal terugbetaald." },
          { q: "Waar haal ik de wagen op?", a: "Op onze locaties in Brussel en Antwerpen. Geef je voorkeur door bij je aanvraag." },
          { q: "Hoe betaal ik?", a: "De waarborg in cash of via bankoverschrijving. Er is geen online vooruitbetaling vereist." },
        ] },
      contact: { eyebrow: "Contact", title: "Klaar om te rijden?", lead: "Stuur ons een bericht of bereik ons direct via WhatsApp. We antwoorden meestal binnen het uur.",
        name: "Naam", email: "E-mail", phone: "Telefoon", message: "Bericht", messagePh: "Vertel ons over je rit…", submit: "Verstuur bericht", or: "of", wa: "Chat op WhatsApp",
        hoursLabel: "Openingsuren", hours: "Ma–Zo · 08:00–20:00", locLabel: "Locaties", loc: "Brussel · Antwerpen", success: "Bedankt! We nemen snel contact met je op." },
      fleetSec: { eyebrow: "Onze vloot", title: "De Ecowave-vloot groeit", lead: "Vandaag één premium wagen beschikbaar — en meer onderweg.", view: "Bekijk details", soon: "Binnenkort", available: "Nu beschikbaar", from: "vanaf", perday: "/dag", soonPrice: "Prijs binnenkort", notify: "Hou me op de hoogte", lblPower: "Vermogen", lblSeats: "Plaatsen", lblFuel: "Brandstof", featured: "Nieuw" },
      detail: { back: "Terug naar overzicht", highlights: "Hoogtepunten", specs: "Technische specificaties", available: "Nu beschikbaar", book: "Reserveer deze wagen", gallery: "Galerij", incl: "Inbegrepen", deposit: "Waarborg", perday: "/ dag" },
    },
    fr: {
      nav: { fleet: "Flotte", why: "Pourquoi nous", process: "Comment ça marche", faq: "FAQ", contact: "Contact" },
      why: { eyebrow: "Pourquoi Ecowave", title: "Location premium, sans tracas", lead: "Aucun frais caché, aucune file d'attente, aucune surprise. Juste un véhicule premium impeccable et un service irréprochable.",
        items: [
          { icon: "car-front", t: "Modèles premium", d: "Des véhicules premium soigneusement entretenus, du SUV à l'AMG." },
          { icon: "badge-euro", t: "Prix transparents", d: "Un tarif journalier clair. Aucun frais caché." },
          { icon: "message-circle", t: "Réservation WhatsApp", d: "Confirmez votre réservation en quelques minutes." },
          { icon: "sparkles", t: "État showroom", d: "Chaque véhicule est nettoyé et vérifié avant le départ." },
          { icon: "shield-check", t: "Entièrement assuré", d: "Omnium et assistance 24/7 inclus de série." },
          { icon: "map-pin", t: "Bruxelles & Anvers", d: "Prise en charge flexible sur deux sites centraux." },
        ] },
      process: { eyebrow: "Comment ça marche", title: "Réservez en quatre étapes", lead: "De la sélection aux clés en moins d'une journée.",
        steps: [
          { t: "Choisissez vos dates", d: "Sélectionnez la prise et le retour dans le calendrier." },
          { t: "Faites la demande", d: "Remplissez le court formulaire ou envoyez un WhatsApp." },
          { t: "Confirmation", d: "Nous confirmons la disponibilité et la caution." },
          { t: "En route", d: "Récupérez votre véhicule à Bruxelles ou Anvers." },
        ] },
      ai: { eyebrow: "Assistant IA", title: "Des questions ? Notre assistant répond 24/7", lead: "Disponibilité, prix, conditions — obtenez une réponse immédiate, ou poursuivez sur WhatsApp.", cta: "Démarrer la conversation",
        bullets: ["Réponse immédiate à votre question", "Disponibilité & estimation de prix", "Transition fluide vers WhatsApp"] },
      faq: { eyebrow: "FAQ", title: "Questions fréquentes",
        items: [
          { q: "Que faut-il pour louer ?", a: "Un permis valide (min. 1 an) et un âge minimum de 20 ans. Une pièce d'identité et la caution suffisent pour démarrer." },
          { q: "Combien de kilomètres sont inclus ?", a: "250 km par jour sont inclus. Les kilomètres supplémentaires sont facturés 0,50 €/km." },
          { q: "Comment fonctionne la caution ?", a: "La caution est de 1 000 €, à régler au retrait en espèces ou par virement, et intégralement remboursée après contrôle du véhicule. Pour réserver, nous demandons 50 € (1 jour) ou 100 € (2+ jours)." },
          { q: "Puis-je annuler gratuitement ?", a: "Oui, jusqu'à 48 h avant la prise. La caution de réservation est alors remboursée intégralement." },
          { q: "Où récupérer le véhicule ?", a: "Sur nos sites de Bruxelles et Anvers. Indiquez votre préférence lors de la demande." },
          { q: "Comment payer ?", a: "La caution en espèces ou par virement. Aucun prépaiement en ligne n'est requis." },
        ] },
      contact: { eyebrow: "Contact", title: "Prêt à prendre la route ?", lead: "Envoyez-nous un message ou joignez-nous directement sur WhatsApp. Nous répondons généralement dans l'heure.",
        name: "Nom", email: "E-mail", phone: "Téléphone", message: "Message", messagePh: "Parlez-nous de votre trajet…", submit: "Envoyer le message", or: "ou", wa: "Chat sur WhatsApp",
        hoursLabel: "Horaires", hours: "Lun–Dim · 08:00–20:00", locLabel: "Sites", loc: "Bruxelles · Anvers", success: "Merci ! Nous vous contactons rapidement." },
      fleetSec: { eyebrow: "Notre flotte", title: "La flotte Ecowave s'agrandit", lead: "Aujourd'hui un véhicule premium disponible — et d'autres à venir.", view: "Voir les détails", soon: "Bientôt", available: "Disponible", from: "à partir de", perday: "/jour", soonPrice: "Prix bientôt", notify: "Prévenez-moi", lblPower: "Puissance", lblSeats: "Places", lblFuel: "Carburant", featured: "Nouveau" },
      detail: { back: "Retour à l'aperçu", highlights: "Points forts", specs: "Spécifications techniques", available: "Disponible", book: "Réserver ce véhicule", gallery: "Galerie", incl: "Inclus", deposit: "Caution", perday: "/ jour" },
    },
    en: {
      nav: { fleet: "Fleet", why: "Why us", process: "How it works", faq: "FAQ", contact: "Contact" },
      why: { eyebrow: "Why Ecowave", title: "Premium rental, zero hassle", lead: "No hidden fees, no queues, no surprises. Just a spotless premium vehicle and a flawless service.",
        items: [
          { icon: "car-front", t: "Premium models", d: "Carefully maintained premium cars, from SUV to AMG." },
          { icon: "badge-euro", t: "Transparent pricing", d: "One clear daily rate. No hidden costs after the fact." },
          { icon: "message-circle", t: "Book via WhatsApp", d: "Confirm your reservation in minutes, personally." },
          { icon: "sparkles", t: "Showroom condition", d: "Every car is cleaned and checked before departure." },
          { icon: "shield-check", t: "Fully insured", d: "Comprehensive cover and 24/7 assistance as standard." },
          { icon: "map-pin", t: "Brussels & Antwerp", d: "Flexible pickup at two central locations." },
        ] },
      process: { eyebrow: "How it works", title: "Book in four steps", lead: "From selection to keys in less than a day.",
        steps: [
          { t: "Choose your dates", d: "Select pickup and return in the calendar." },
          { t: "Send a request", d: "Fill in the short form or message us on WhatsApp." },
          { t: "Confirmation", d: "We confirm availability and deposit personally." },
          { t: "Hit the road", d: "Collect your car in Brussels or Antwerp and go." },
        ] },
      ai: { eyebrow: "AI assistant", title: "Questions? Our assistant helps 24/7", lead: "Availability, pricing, conditions — get an instant answer, or continue the conversation on WhatsApp.", cta: "Start a chat",
        bullets: ["Instant answer to your question", "Availability & price guidance", "Seamless handover to WhatsApp"] },
      faq: { eyebrow: "FAQ", title: "Frequently asked questions",
        items: [
          { q: "What do I need to rent?", a: "A valid driving licence (held min. 1 year) and a minimum age of 20. An ID and the deposit are enough to get started." },
          { q: "How many kilometres are included?", a: "250 km per day is included. Extra distance is billed at a flat €0.50/km." },
          { q: "How does the deposit work?", a: "The security deposit is €1,000, paid at pickup by cash or bank transfer and fully refunded after the car is checked. To reserve we ask €50 (1 day) or €100 (2+ days)." },
          { q: "Can I cancel free of charge?", a: "Yes, up to 48 hours before pickup you cancel for free. The reservation deposit is then fully refunded." },
          { q: "Where do I collect the car?", a: "At our Brussels and Antwerp locations. Let us know your preference when you request." },
          { q: "How do I pay?", a: "The deposit by cash or bank transfer. No online prepayment is required." },
        ] },
      contact: { eyebrow: "Contact", title: "Ready to drive?", lead: "Send us a message or reach us directly on WhatsApp. We usually reply within the hour.",
        name: "Name", email: "Email", phone: "Phone", message: "Message", messagePh: "Tell us about your trip…", submit: "Send message", or: "or", wa: "Chat on WhatsApp",
        hoursLabel: "Opening hours", hours: "Mon–Sun · 08:00–20:00", locLabel: "Locations", loc: "Brussels · Antwerp", success: "Thank you! We'll get back to you shortly." },
      fleetSec: { eyebrow: "Our fleet", title: "The Ecowave fleet is growing", lead: "One premium car available today — with more on the way.", view: "View details", soon: "Coming soon", available: "Available now", from: "from", perday: "/day", soonPrice: "Price coming soon", notify: "Notify me", lblPower: "Power", lblSeats: "Seats", lblFuel: "Fuel", featured: "New" },
      detail: { back: "Back to overview", highlights: "Highlights", specs: "Technical specifications", available: "Available now", book: "Reserve this vehicle", gallery: "Gallery", incl: "Included", deposit: "Deposit", perday: "/ day" },
    },
  };

  ["nl", "fr", "en"].forEach((l) => {
    const T = window.ECOWAVE_I18N[l];
    Object.assign(T.nav, ext[l].nav);
    T.why = ext[l].why; T.process = ext[l].process; T.ai = ext[l].ai;
    T.faq = ext[l].faq; T.contact = ext[l].contact; T.fleetSec = ext[l].fleetSec; T.detail = ext[l].detail;
    T.interiorSec = ext2[l].interiorSec; T.amgSec = ext2[l].amgSec; T.driverSec = ext2[l].driverSec;
    T.sell = ext2[l].sell; T.heroV = ext2[l].hero;
  });
})();
