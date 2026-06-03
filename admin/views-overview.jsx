/* Ecowave Admin — shared helpers + Overview view */
const { useState, useEffect, useRef, useMemo } = React;

function Icon({ name, style, cls }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    try {
      host.textContent = "";
      const svg = window.makeLucideSvg ? window.makeLucideSvg(name) : null;
      if (svg) host.appendChild(svg);
    } catch (e) { /* an icon must never crash the app */ }
  }, [name]);
  return <span className={"ic " + (cls || "")} ref={ref} style={{ display: "inline-flex", lineHeight: 0, ...style }}></span>;
}

let _toastTimer;
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.querySelector("#toastmsg").textContent = msg;
  el.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("show"), 2400);
}
window.toast = toast;

function initials(name) { return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase(); }
function eur(n) { return "€" + n.toLocaleString("fr-BE"); }
function fmtDate(s) {
  const [y, m, d] = s.split("-");
  const months = ["jan", "fév", "mar", "avr", "mai", "juin", "juil", "août", "sep", "oct", "nov", "déc"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]}`;
}
function nights(from, to) { return Math.round((new Date(to) - new Date(from)) / 86400000); }

function StatusBadge({ status }) {
  const m = window.ADMIN.statusMeta[status];
  return <span className="status" style={{ color: m.color, background: m.bg }}><Icon name={m.icon} />{m.label}</span>;
}

function Overview({ go }) {
  const A = window.ADMIN;
  const bookings = A.bookings || [];
  const now = bookings.filter(b => b.status === "active").length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const rev = (A.revenueMonthly && A.revenueMonthly.length) ? A.revenueMonthly : [{ m: "—", a: 0, c: 0 }];
  const monthRev = rev[rev.length - 2] || rev[rev.length - 1] || { a: 0, c: 0 };
  const monthTotal = (monthRev.a || 0) + (monthRev.c || 0);
  const recent = bookings.slice(0, 5);
  const maxBar = Math.max(1, ...rev.map(r => (r.a || 0) + (r.c || 0)));

  return (
    <div className="view show">
      <div className="kpis">
        <div className="kpi g">
          <div className="ktrend up"><Icon name="trending-up" />+12%</div>
          <div className="ki"><Icon name="banknote" /></div>
          <div className="kv">{eur(monthTotal)}</div>
          <div className="kl">Revenus — Mai 2026</div>
        </div>
        <div className="kpi b">
          <div className="ki"><Icon name="car-front" /></div>
          <div className="kv">{now}</div>
          <div className="kl">Location{now > 1 ? "s" : ""} en cours</div>
        </div>
        <div className="kpi o">
          <div className="ktrend up"><Icon name="arrow-up" />{pending}</div>
          <div className="ki"><Icon name="clock" /></div>
          <div className="kv">{pending + confirmed}</div>
          <div className="kl">Réservations à venir</div>
        </div>
        <div className="kpi p">
          <div className="ki"><Icon name="users" /></div>
          <div className="kv">{A.customers.length}</div>
          <div className="kl">Clients enregistrés</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Revenus mensuels</h3><button className="link" onClick={() => go("revenue")}>Détails →</button></div>
          <div className="chart">
            {A.revenueMonthly.map((r, i) => {
              const tot = r.a + r.c, h = (tot / maxBar) * 100;
              return (
                <div className="bar-col" key={i} title={eur(tot)}>
                  <div className="bar-stack" style={{ height: h + "%" }}>
                    <div className="bar-c" style={{ height: (r.c / tot * 100) + "%" }}></div>
                    <div className="bar-a" style={{ height: (r.a / tot * 100) + "%" }}></div>
                  </div>
                  <span className="bm">{r.m}</span>
                </div>
              );
            })}
          </div>
          <div className="chart-legend">
            <div className="lg"><span className="sw" style={{ background: "var(--green-300)" }}></span>Classe A</div>
            <div className="lg"><span className="sw" style={{ background: "var(--green-600)" }}></span>Classe C</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h3>Actions rapides</h3></div>
          <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn-add btn-green" style={{ justifyContent: "flex-start" }} onClick={() => go("bookings", "new")}><Icon name="plus" />Nouvelle réservation</button>
            <button className="btn-ghost" style={{ justifyContent: "flex-start" }} onClick={() => go("calendar")}><Icon name="calendar-x" />Bloquer des dates</button>
            <button className="btn-ghost" style={{ justifyContent: "flex-start" }} onClick={() => go("customers")}><Icon name="user-plus" />Voir les clients</button>
            <button className="btn-ghost" style={{ justifyContent: "flex-start" }} onClick={() => go("vehicles")}><Icon name="settings-2" />Gérer les véhicules</button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Réservations récentes</h3><button className="link" onClick={() => go("bookings")}>Tout voir →</button></div>
        <div style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Réf.</th><th>Client</th><th className="hide-m">Véhicule</th><th className="hide-m">Dates</th><th>Statut</th><th>Total</th></tr></thead>
            <tbody>
              {recent.map(b => {
                const c = A.customerById(b.customer), v = A.vehicleById(b.vehicle);
                return (
                  <tr key={b.id} className="clickable" onClick={() => go("bookings")}>
                    <td style={{ fontWeight: 700, color: "var(--ink-500)" }}>{b.id}</td>
                    <td><div className="cust-cell"><div className="av">{initials(c.name)}</div><div><div className="nm">{c.name}</div><div className="meta">{b.source}</div></div></div></td>
                    <td className="hide-m"><div className="veh-cell"><img src={v.photo} alt="" /><b>{v.name.replace("Mercedes-Benz ", "")}</b></div></td>
                    <td className="hide-m" style={{ color: "var(--ink-500)" }}>{fmtDate(b.from)} → {fmtDate(b.to)}</td>
                    <td><StatusBadge status={b.status} /></td>
                    <td style={{ fontWeight: 700 }}>{eur(b.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Icon, toast, initials, eur, fmtDate, nights, StatusBadge, Overview });
