/* Ecowave Admin — Bookings view (list, filter, create, edit, confirm, cancel) */
function Bookings({ openNew }) {
  const A = window.ADMIN;
  const [list, setList] = useState(A.bookings);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null); // {mode:'new'|'edit', booking}

  useEffect(() => { if (openNew) setModal({ mode: "new" }); }, [openNew]);

  const filters = [
    { k: "all", label: "Toutes" },
    { k: "pending", label: "En attente" },
    { k: "confirmed", label: "Confirmées" },
    { k: "active", label: "En cours" },
    { k: "completed", label: "Terminées" },
    { k: "cancelled", label: "Annulées" },
  ];

  const shown = list.filter(b => {
    if (filter !== "all" && b.status !== filter) return false;
    if (q) {
      const c = A.customerById(b.customer);
      const hay = (b.id + " " + c.name + " " + b.source).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  async function setStatus(id, status, msg) {
    const b = list.find(x => x.id === id);
    setList(list.map(x => x.id === id ? { ...x, status } : x));
    if (b) { b.status = status; } // sync window.ADMIN
    try { if (b && b._uuid) await window.DB.updateBooking(b._uuid, { status }); toast(msg); }
    catch (e) { toast("Erreur — réessayez"); }
  }
  async function saveBooking(data) {
    if (data._uuid) {
      const merged = { ...data };
      setList(list.map(b => b._uuid === data._uuid ? { ...b, ...merged } : b));
      const idx = A.bookings.findIndex(b => b._uuid === data._uuid);
      if (idx >= 0) A.bookings[idx] = { ...A.bookings[idx], ...merged };
      try { await window.DB.updateBooking(data._uuid, data); toast("Réservation mise à jour"); }
      catch (e) { toast("Erreur — réessayez"); }
    } else {
      try {
        let booking = { ...data };
        // create the customer first if needed
        if (data._newCustomer) {
          const cust = await window.DB.createCustomer(data._newCustomer);
          A.customers.unshift(cust);
          booking.customer = cust.id;
        }
        delete booking._newCustomer;
        const created = await window.DB.createBooking(booking);
        A.bookings.unshift(created);          // sync window.ADMIN (calendar/overview see it)
        setList([created, ...list]);
        toast("Réservation créée");
      } catch (e) { toast("Erreur — réessayez"); }
    }
    setModal(null);
  }

  return (
    <div className="view show">
      <div className="sec-title">
        <div><h2>Réservations</h2><div className="sub">{shown.length} réservation{shown.length > 1 ? "s" : ""}</div></div>
        <button className="btn-add btn-green" onClick={() => setModal({ mode: "new" })}><Icon name="plus" />Nouvelle réservation</button>
      </div>

      <div className="toolbar">
        <div className="search"><Icon name="search" /><input placeholder="Rechercher (réf, client, source)…" value={q} onChange={e => setQ(e.target.value)} /></div>
        <div className="chips">
          {filters.map(f => <button key={f.k} className={"chip" + (filter === f.k ? " active" : "")} onClick={() => setFilter(f.k)}>{f.label}</button>)}
        </div>
      </div>

      <div className="panel">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Réf.</th><th>Client</th><th className="hide-m">Véhicule</th><th className="hide-m">Période</th><th>Statut</th><th className="hide-m">Source</th><th>Total</th><th></th></tr></thead>
            <tbody>
              {shown.map(b => {
                const c = A.customerById(b.customer), v = A.vehicleById(b.vehicle);
                return (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 700, color: "var(--ink-500)" }}>{b.id}</td>
                    <td><div className="cust-cell"><div className="av">{initials(c.name)}</div><div><div className="nm">{c.name}</div><div className="meta">{c.phone}</div></div></div></td>
                    <td className="hide-m"><div className="veh-cell"><img src={v.photo} alt="" /><b>{v.name.replace("Mercedes-Benz ", "")}</b></div></td>
                    <td className="hide-m" style={{ color: "var(--ink-500)" }}>{fmtDate(b.from)} → {fmtDate(b.to)}<div style={{ fontSize: 11, color: "var(--ink-300)" }}>{nights(b.from, b.to)} nuits</div></td>
                    <td><StatusBadge status={b.status} /></td>
                    <td className="hide-m"><span className="src-tag">{b.source}</span></td>
                    <td style={{ fontWeight: 700 }}>{eur(b.total)}</td>
                    <td>
                      <div className="row-act">
                        {b.status === "pending" && <button className="go-confirm" title="Confirmer" onClick={() => setStatus(b.id, "confirmed", "Réservation confirmée")}><Icon name="check" /></button>}
                        <button title="Modifier" onClick={() => setModal({ mode: "edit", booking: b })}><Icon name="pencil" /></button>
                        {b.status !== "cancelled" && b.status !== "completed" && <button className="go-cancel" title="Annuler" onClick={() => setStatus(b.id, "cancelled", "Réservation annulée")}><Icon name="x" /></button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {shown.length === 0 && <tr><td colSpan="8" style={{ textAlign: "center", padding: 40, color: "var(--ink-400)" }}>Aucune réservation pour ce filtre.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && <BookingModal mode={modal.mode} booking={modal.booking} onClose={() => setModal(null)} onSave={saveBooking} />}
    </div>
  );
}

function BookingModal({ mode, booking, onClose, onSave }) {
  const A = window.ADMIN;
  const [f, setF] = useState(booking || { customer: A.customers[0] ? A.customers[0].id : "", vehicle: A.vehicles[0] ? A.vehicles[0].id : "a-class", from: "", to: "", source: "Instagram", status: "confirmed", total: 0, note: "" });
  const [newCust, setNewCust] = useState(A.customers.length === 0); // start in "new" if no customers yet
  const [nc, setNc] = useState({ name: "", phone: "", city: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const setNcF = (k) => (e) => setNc({ ...nc, [k]: e.target.value });
  const v = A.vehicleById(f.vehicle) || A.vehicles[0];
  const n = f.from && f.to ? nights(f.from, f.to) : 0;
  const suggested = n > 0 && v ? n * v.day : 0;

  function submit() {
    if (newCust) {
      if (!nc.name.trim()) { toast("Indiquez le nom du client"); return; }
      onSave({ ...f, _newCustomer: { name: nc.name, phone: nc.phone, city: nc.city, source: f.source } });
    } else {
      if (!f.customer) { toast("Choisissez un client"); return; }
      onSave(f);
    }
  }

  return (
    <div className="overlay show" onClick={e => { if (e.target.classList.contains("overlay")) onClose(); }}>
      <div className="modal">
        <div className="modal-head"><h3>{mode === "new" ? "Nouvelle réservation" : "Modifier la réservation"}</h3><button className="x" onClick={onClose}><Icon name="x" /></button></div>
        <div className="modal-body">
          {/* Client : existant ou nouveau */}
          <div className="ff">
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Client
              <button type="button" className="link" style={{ fontSize: 12, fontWeight: 700, color: "var(--green-600)", background: "none" }} onClick={() => setNewCust(!newCust)}>
                {newCust ? "← Choisir un client existant" : "+ Nouveau client"}
              </button>
            </label>
            {!newCust
              ? <select value={f.customer} onChange={set("customer")}>{A.customers.map(c => <option key={c.id} value={c.id}>{c.name} · {c.city || ""}</option>)}</select>
              : <div style={{ background: "var(--paper)", border: "1px dashed var(--green-300)", borderRadius: 12, padding: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div className="ff" style={{ margin: 0, gridColumn: "1 / -1" }}><div className="inp"><Icon name="user" style={{ width: 16, height: 16, color: "var(--ink-400)" }} /><input value={nc.name} onChange={setNcF("name")} placeholder="Nom complet *" /></div></div>
                  <div className="ff" style={{ margin: 0 }}><div className="inp"><Icon name="phone" style={{ width: 16, height: 16, color: "var(--ink-400)" }} /><input value={nc.phone} onChange={setNcF("phone")} placeholder="Téléphone" /></div></div>
                  <div className="ff" style={{ margin: 0 }}><div className="inp"><Icon name="map-pin" style={{ width: 16, height: 16, color: "var(--ink-400)" }} /><input value={nc.city} onChange={setNcF("city")} placeholder="Ville" /></div></div>
                </div>}
          </div>
          <div className="grid2">
            <div className="ff"><label>Véhicule</label><select value={f.vehicle} onChange={set("vehicle")}>{A.vehicles.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
            <div className="ff"><label>Source</label><select value={f.source} onChange={set("source")}>{["Instagram", "WhatsApp", "Téléphone", "Walk-in", "Site web"].map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="ff"><label>Date de début</label><div className="inp"><input type="date" value={f.from} onChange={set("from")} /></div></div>
            <div className="ff"><label>Date de fin</label><div className="inp"><input type="date" value={f.to} onChange={set("to")} /></div></div>
            <div className="ff"><label>Statut</label><select value={f.status} onChange={set("status")}>{Object.entries(A.statusMeta).map(([k, m]) => <option key={k} value={k}>{m.label}</option>)}</select></div>
            <div className="ff"><label>Total (€) {suggested > 0 && <span style={{ color: "var(--ink-300)", fontWeight: 500 }}>· suggéré {eur(suggested)}</span>}</label><div className="inp"><span className="cur">€</span><input type="number" value={f.total} onChange={set("total")} placeholder={suggested || "0"} /></div></div>
          </div>
          <div className="ff"><label>Note interne</label><textarea value={f.note} onChange={set("note")} placeholder="Livraison, paiement, demandes spéciales…"></textarea></div>
        </div>
        <div className="modal-foot"><button className="btn-ghost" onClick={onClose}>Annuler</button><button className="btn-add btn-green" onClick={submit}><Icon name="check" />{mode === "new" ? "Créer" : "Enregistrer"}</button></div>
      </div>
    </div>
  );
}
Object.assign(window, { Bookings, BookingModal });
