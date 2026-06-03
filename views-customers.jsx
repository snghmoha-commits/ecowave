/* Ecowave Admin — Customers view + detail drawer */
function Customers() {
  const A = window.ADMIN;
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const shown = A.customers.filter(c => !q || (c.name + c.email + c.city + c.source).toLowerCase().includes(q.toLowerCase()));

  function custBookings(id) { return A.bookings.filter(b => b.customer === id); }

  return (
    <div className="view show">
      <div className="sec-title">
        <div><h2>Clients</h2><div className="sub">{A.customers.length} clients enregistrés</div></div>
        <button className="btn-add btn-green" onClick={() => toast("Formulaire d'ajout de client")}><Icon name="user-plus" />Ajouter un client</button>
      </div>
      <div className="toolbar"><div className="search"><Icon name="search" /><input placeholder="Rechercher un client…" value={q} onChange={e => setQ(e.target.value)} /></div></div>

      <div className="panel">
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Client</th><th className="hide-m">Ville</th><th className="hide-m">Source</th><th>Réservations</th><th className="hide-m">Client depuis</th><th></th></tr></thead>
            <tbody>
              {shown.map(c => {
                const bk = custBookings(c.id);
                return (
                  <tr key={c.id} className="clickable" onClick={() => setSel(c)}>
                    <td><div className="cust-cell"><div className="av">{initials(c.name)}</div><div><div className="nm">{c.name}</div><div className="meta">{c.email}</div></div></div></td>
                    <td className="hide-m" style={{ color: "var(--ink-500)" }}>{c.city}</td>
                    <td className="hide-m"><span className="src-tag">{c.source}</span></td>
                    <td style={{ fontWeight: 700 }}>{bk.length}</td>
                    <td className="hide-m" style={{ color: "var(--ink-400)" }}>{c.since}</td>
                    <td><div className="row-act"><button title="Voir la fiche"><Icon name="chevron-right" /></button></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {sel && <CustomerDrawer c={sel} bookings={custBookings(sel.id)} onClose={() => setSel(null)} />}
    </div>
  );
}

function CustomerDrawer({ c, bookings, onClose }) {
  const A = window.ADMIN;
  const total = bookings.filter(b => b.status !== "cancelled").reduce((s, b) => s + b.total, 0);
  return (
    <React.Fragment>
      <div className="scrim show" onClick={onClose}></div>
      <div className="drawer show">
        <div className="cust-hero">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div className="av">{initials(c.name)}</div>
            <button className="x" style={{ background: "rgba(255,255,255,.12)", color: "#fff", width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}><Icon name="x" /></button>
          </div>
          <h3>{c.name}</h3>
          <div className="ct">{c.city} · Client depuis {c.since}</div>
        </div>
        <div className="cust-info">
          <div className="ir"><Icon name="phone" /><span className="k">Téléphone</span><span className="v">{c.phone}</span></div>
          <div className="ir"><Icon name="mail" /><span className="k">Email</span><span className="v">{c.email}</span></div>
          <div className="ir"><Icon name="git-branch" /><span className="k">Source</span><span className="v">{c.source}</span></div>
          <div className="ir"><Icon name="banknote" /><span className="k">Total dépensé</span><span className="v">{eur(total)}</span></div>
        </div>
        {c.notes && <div className="notes-box"><b style={{ display: "block", marginBottom: 4 }}>📝 Note</b>{c.notes}</div>}
        <div style={{ padding: "0 26px 26px" }}>
          <h4 style={{ fontFamily: "var(--font-d)", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Historique ({bookings.length})</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {bookings.map(b => {
              const v = A.vehicleById(b.vehicle);
              return (
                <div key={b.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 13, display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={v.photo} alt="" style={{ width: 46, height: 32, borderRadius: 6, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{v.name.replace("Mercedes-Benz ", "")} · {b.id}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-400)" }}>{fmtDate(b.from)} → {fmtDate(b.to)}</div>
                  </div>
                  <div style={{ textAlign: "right" }}><StatusBadge status={b.status} /><div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{eur(b.total)}</div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
Object.assign(window, { Customers, CustomerDrawer });
