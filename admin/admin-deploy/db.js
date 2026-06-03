/* Ecowave Admin — Supabase data adapter (Phase 2-4).
   Loads real data into window.ADMIN (same shape the views expect) and
   provides async mutations. Falls back gracefully if offline. */
window.DB = (function () {
  let client = null;
  function c() {
    if (!client && window.supabase) client = window.supabase.createClient(window.SUPA_URL, window.SUPA_KEY);
    return client;
  }

  // ---- field mapping (DB snake_case -> app shape) ----
  function mapVehicle(r) {
    return { id: r.id, name: r.name, trim: r.trim, cat: r.cat, photo: toPhoto(r.photo),
      active: r.active, day: r.day_price, weekend: r.weekend_price, week: r.week_price,
      deposit: r.deposit, kmDay: r.km_day, extraKm: r.extra_km,
      power: r.power, fuel: r.fuel, trans: r.trans, seats: r.seats, plate: r.plate };
  }
  function toPhoto(p) {
    if (!p) return "../assets/car-front.png";
    if (p.startsWith("http")) return p;
    return ".." + (p.startsWith("/") ? p : "/" + p); // '/assets/x.jpg' -> '../assets/x.jpg'
  }
  function mapCustomer(r) {
    return { id: r.id, name: r.name, phone: r.phone, email: r.email, city: r.city,
      notes: r.notes || "", source: r.source, since: (r.created_at || "").slice(0, 7) };
  }
  function mapBooking(r) {
    return { _uuid: r.id, id: r.ref || ("B-" + r.id.slice(0, 4)), customer: r.customer_id,
      vehicle: r.vehicle_id, from: r.date_from, to: r.date_to, status: r.status,
      total: r.total, source: r.source, note: r.note || "" };
  }

  async function loadAll() {
    const cl = c();
    if (!cl) throw new Error("Supabase non chargé");
    const A = window.ADMIN;
    const [veh, cust, book, blk] = await Promise.all([
      cl.from("vehicles").select("*").order("created_at"),
      cl.from("customers").select("*").order("created_at", { ascending: false }),
      cl.from("bookings").select("*").order("date_from", { ascending: false }),
      cl.from("blocked_dates").select("*"),
    ]);
    if (veh.data && veh.data.length) A.vehicles = veh.data.map(mapVehicle);
    A.customers = (cust.data || []).map(mapCustomer);
    A.bookings = (book.data || []).map(mapBooking);
    const blocked = {};
    (blk.data || []).forEach(r => { (blocked[r.vehicle_id] = blocked[r.vehicle_id] || []).push(r.date); });
    A.blocked = blocked;
    return A;
  }

  // ---- AUTH ----
  async function signIn(email, password) {
    const { data, error } = await c().auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async function signOut() { await c().auth.signOut(); }
  async function currentSession() { const { data } = await c().auth.getSession(); return data.session; }

  // ---- MUTATIONS ----
  async function createBooking(b) {
    const ref = "B-" + Math.floor(1000 + Math.random() * 9000);
    const { data, error } = await c().from("bookings").insert({
      ref, customer_id: b.customer, vehicle_id: b.vehicle, date_from: b.from, date_to: b.to,
      status: b.status || "confirmed", total: Number(b.total) || 0, source: b.source, note: b.note || "",
    }).select().single();
    if (error) throw error;
    return mapBooking(data);
  }
  async function updateBooking(uuid, patch) {
    const db = {};
    if (patch.status != null) db.status = patch.status;
    if (patch.total != null) db.total = Number(patch.total);
    if (patch.from != null) db.date_from = patch.from;
    if (patch.to != null) db.date_to = patch.to;
    if (patch.customer != null) db.customer_id = patch.customer;
    if (patch.vehicle != null) db.vehicle_id = patch.vehicle;
    if (patch.source != null) db.source = patch.source;
    if (patch.note != null) db.note = patch.note;
    const { error } = await c().from("bookings").update(db).eq("id", uuid);
    if (error) throw error;
  }
  async function createCustomer(cu) {
    const { data, error } = await c().from("customers").insert({
      name: cu.name, phone: cu.phone, email: cu.email, city: cu.city, source: cu.source, notes: cu.notes || "",
    }).select().single();
    if (error) throw error;
    return mapCustomer(data);
  }
  async function setBlocked(vehicleId, date, on) {
    if (on) {
      const { error } = await c().from("blocked_dates").insert({ vehicle_id: vehicleId, date });
      if (error && error.code !== "23505") throw error; // ignore duplicate
    } else {
      const { error } = await c().from("blocked_dates").delete().eq("vehicle_id", vehicleId).eq("date", date);
      if (error) throw error;
    }
  }
  async function updateVehicle(id, patch) {
    const db = {};
    const map = { name: "name", trim: "trim", cat: "cat", active: "active", day: "day_price",
      weekend: "weekend_price", week: "week_price", deposit: "deposit", kmDay: "km_day", extraKm: "extra_km" };
    Object.keys(patch).forEach(k => { if (map[k]) db[map[k]] = patch[k]; });
    const { error } = await c().from("vehicles").update(db).eq("id", id);
    if (error) throw error;
  }

  return { loadAll, signIn, signOut, currentSession, createBooking, updateBooking, createCustomer, setBlocked, updateVehicle };
})();
