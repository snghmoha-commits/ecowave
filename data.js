/* Ecowave Admin — mock data layer (fake but realistic). Replaced by Supabase later. */
window.ADMIN = (function () {
  const vehicles = [
    { id: "a-class", name: "Mercedes-Benz A-Class", trim: "AMG Line", cat: "Compacte", photo: "../assets/car-front.png",
      active: true, day: 110, weekend: 350, week: 550, deposit: 1000, kmDay: 250, extraKm: 0.50,
      power: "122 pk", fuel: "Essence", trans: "Automatique", seats: 5, plate: "1-ABC-001" },
    { id: "c-class", name: "Mercedes-Benz C-Class", trim: "AMG Line", cat: "Berline", photo: "../assets/cclass-front.jpg",
      active: true, day: 160, weekend: 500, week: null, deposit: 1000, kmDay: 200, extraKm: null,
      power: "170 pk", fuel: "Essence", trans: "Automatique", seats: 5, plate: "1-ABC-002" },
  ];

  const customers = [
    { id: "c1", name: "Sophie De Vos", phone: "+32 471 22 81 04", email: "sophie.devos@gmail.com", city: "Antwerpen", since: "2025-09", notes: "Cliente fidèle — préfère la Classe C. Toujours ponctuelle.", source: "Instagram" },
    { id: "c2", name: "Lucas Martin", phone: "+32 478 55 13 90", email: "lucas.martin@outlook.com", city: "Bruxelles", since: "2025-11", notes: "Demande souvent un siège bébé.", source: "WhatsApp" },
    { id: "c3", name: "Amélie Klein", phone: "+32 495 70 42 18", email: "amelie.klein@gmail.com", city: "Bruxelles", since: "2026-01", notes: "", source: "Site web" },
    { id: "c4", name: "Karim Benali", phone: "+32 466 88 30 22", email: "k.benali@gmail.com", city: "Antwerpen", since: "2026-02", notes: "Permis depuis 3 ans.", source: "Téléphone" },
    { id: "c5", name: "Élodie Lambert", phone: "+32 472 19 65 47", email: "elodie.l@hotmail.com", city: "Gent", since: "2026-03", notes: "Walk-in. Paiement cash.", source: "Walk-in" },
    { id: "c6", name: "Thomas Peeters", phone: "+32 488 04 77 51", email: "t.peeters@gmail.com", city: "Mechelen", since: "2026-04", notes: "", source: "Instagram" },
  ];

  // statuses: pending | confirmed | active | completed | cancelled
  const bookings = [
    { id: "B-1042", customer: "c1", vehicle: "c-class", from: "2026-06-05", to: "2026-06-08", status: "confirmed", total: 1000, source: "Instagram", note: "Livraison à l'aéroport BRU" },
    { id: "B-1041", customer: "c2", vehicle: "a-class", from: "2026-06-04", to: "2026-06-06", status: "active", total: 350, source: "WhatsApp", note: "" },
    { id: "B-1040", customer: "c3", vehicle: "a-class", from: "2026-06-12", to: "2026-06-15", status: "pending", total: 550, source: "Site web", note: "Attente confirmation acompte" },
    { id: "B-1039", customer: "c4", vehicle: "c-class", from: "2026-06-20", to: "2026-06-22", status: "confirmed", total: 500, source: "Téléphone", note: "" },
    { id: "B-1038", customer: "c5", vehicle: "a-class", from: "2026-05-28", to: "2026-05-30", status: "completed", total: 350, source: "Walk-in", note: "Payé cash" },
    { id: "B-1037", customer: "c6", vehicle: "c-class", from: "2026-05-22", to: "2026-05-25", status: "completed", total: 750, source: "Instagram", note: "" },
    { id: "B-1036", customer: "c1", vehicle: "c-class", from: "2026-05-15", to: "2026-05-17", status: "completed", total: 500, source: "Instagram", note: "" },
    { id: "B-1035", customer: "c2", vehicle: "a-class", from: "2026-05-10", to: "2026-05-12", status: "cancelled", total: 350, source: "WhatsApp", note: "Annulé par le client" },
    { id: "B-1034", customer: "c4", vehicle: "a-class", from: "2026-05-03", to: "2026-05-06", status: "completed", total: 550, source: "Téléphone", note: "" },
    { id: "B-1033", customer: "c3", vehicle: "c-class", from: "2026-04-26", to: "2026-04-29", status: "completed", total: 750, source: "Site web", note: "" },
  ];

  // blocked dates per vehicle (maintenance / personal / external)
  const blocked = {
    "a-class": ["2026-06-18", "2026-06-19"],
    "c-class": ["2026-06-10", "2026-06-11", "2026-06-30"],
  };

  // monthly revenue (last 8 months) — for charts
  const revenueMonthly = [
    { m: "Nov", a: 1450, c: 1900 }, { m: "Déc", a: 1100, c: 2400 },
    { m: "Jan", a: 1650, c: 2100 }, { m: "Fév", a: 1900, c: 2600 },
    { m: "Mar", a: 1750, c: 3000 }, { m: "Avr", a: 2200, c: 2800 },
    { m: "Mai", a: 1950, c: 3250 }, { m: "Juin", a: 700, c: 1500 },
  ];

  return {
    vehicles, customers, bookings, blocked, revenueMonthly,
    vehicleById: (id) => vehicles.find(v => v.id === id),
    customerById: (id) => customers.find(c => c.id === id),
    statusMeta: {
      pending:   { label: "En attente", color: "#B8862A", bg: "#F6ECD6", icon: "clock" },
      confirmed: { label: "Confirmée",  color: "#126B4A", bg: "#E4F1EA", icon: "check-circle" },
      active:    { label: "En cours",   color: "#2D6E8E", bg: "#E1EEF4", icon: "car-front" },
      completed: { label: "Terminée",   color: "#46524D", bg: "#ECEFED", icon: "flag" },
      cancelled: { label: "Annulée",    color: "#B23A33", bg: "#F6E2E0", icon: "x-circle" },
    },
  };
})();
