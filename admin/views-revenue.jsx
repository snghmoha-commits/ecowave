/* Ecowave Admin — Revenue & reporting view */
function Revenue() {
  const A = window.ADMIN;
  const completed = A.bookings.filter(b => b.status !== "cancelled");
  const totalA = A.revenueMonthly.reduce((s, r) => s + r.a, 0);
  const totalC = A.revenueMonthly.reduce((s, r) => s + r.c, 0);
  const yearTotal = totalA + totalC;
  const maxBar = Math.max(...A.revenueMonthly.map(r => r.a + r.c));
  const avgBooking = Math.round(completed.reduce((s, b) => s + b.total, 0) / completed.length);

  const perVehicle = A.vehicles.map(v => {
    const bk = completed.filter(b => b.vehicle === v.id);
    const rev = bk.reduce((s, b) => s + b.total, 0);
    return { v, count: bk.length, rev };
  });
  const totalRev = perVehicle.reduce((s, p) => s + p.rev, 0);

  return (
    <div className="view show">
      <div className="sec-title"><div><h2>Revenus & statistiques</h2><div className="sub">Vue d'ensemble · 8 derniers mois</div></div>
        <button className="btn-ghost" onClick={() => toast("Export PDF (à venir)")}><Icon name="download" />Exporter</button>
      </div>

      <div className="kpis">
        <div className="kpi g"><div className="ktrend up"><Icon name="trending-up" />+18%</div><div className="ki"><Icon name="banknote" /></div><div className="kv">{eur(yearTotal)}</div><div className="kl">Chiffre d'affaires total</div></div>
        <div className="kpi b"><div className="ki"><Icon name="calendar-check" /></div><div className="kv">{completed.length}</div><div className="kl">Réservations honorées</div></div>
        <div className="kpi o"><div className="ki"><Icon name="receipt" /></div><div className="kv">{eur(avgBooking)}</div><div className="kl">Panier moyen</div></div>
        <div className="kpi p"><div className="ki"><Icon name="percent" /></div><div className="kv">68%</div><div className="kl">Taux d'occupation</div></div>
      </div>

      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-head"><h3>Revenus mensuels par véhicule</h3></div>
        <div className="chart" style={{ height: 240 }}>
          {A.revenueMonthly.map((r, i) => {
            const tot = r.a + r.c;
            return (
              <div className="bar-col" key={i} title={eur(tot)}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-500)" }}>{eur(tot)}</span>
                <div className="bar-stack" style={{ height: (tot / maxBar * 100) + "%" }}>
                  <div className="bar-c" style={{ height: (r.c / tot * 100) + "%" }}></div>
                  <div className="bar-a" style={{ height: (r.a / tot * 100) + "%" }}></div>
                </div>
                <span className="bm">{r.m}</span>
              </div>
            );
          })}
        </div>
        <div className="chart-legend">
          <div className="lg"><span className="sw" style={{ background: "var(--green-300)" }}></span>Classe A · {eur(totalA)}</div>
          <div className="lg"><span className="sw" style={{ background: "var(--green-600)" }}></span>Classe C · {eur(totalC)}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><h3>Performance par véhicule</h3></div>
        <div style={{ padding: 22 }}>
          {perVehicle.map(p => (
            <div key={p.v.id} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={p.v.photo} alt="" style={{ width: 40, height: 28, borderRadius: 6, objectFit: "cover" }} />
                  <div><b style={{ fontSize: 13.5 }}>{p.v.name.replace("Mercedes-Benz ", "")}</b><div style={{ fontSize: 11.5, color: "var(--ink-400)" }}>{p.count} réservations</div></div>
                </div>
                <b style={{ fontFamily: "var(--font-d)", fontSize: 17 }}>{eur(p.rev)}</b>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: "var(--mist)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 999, width: (p.rev / totalRev * 100) + "%", background: "linear-gradient(90deg,var(--green-600),var(--lime))" }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { Revenue });
