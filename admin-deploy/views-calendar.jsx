/* Ecowave Admin — Calendar / availability view */
function CalView() {
  const A = window.ADMIN;
  const [vid, setVid] = useState("a-class");
  const [month, setMonth] = useState(5); // June (0-idx) 2026
  const [blocked, setBlocked] = useState(() => JSON.parse(JSON.stringify(A.blocked)));
  const year = 2026;

  // booked date set for this vehicle
  const bookedSet = useMemo(() => {
    const s = new Set();
    A.bookings.filter(b => b.vehicle === vid && b.status !== "cancelled").forEach(b => {
      let d = new Date(b.from); const end = new Date(b.to);
      while (d < end) { s.add(d.toISOString().slice(0, 10)); d.setDate(d.getDate() + 1); }
    });
    return s;
  }, [vid]);

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  const first = (new Date(year, month, 1).getDay() + 6) % 7;
  const dim = new Date(year, month + 1, 0).getDate();
  const cells = []; for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);

  function key(d) { return `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`; }
  async function toggle(d) {
    const k = key(d);
    if (bookedSet.has(k)) { toast("Date réservée — gérez-la via la réservation"); return; }
    const arr = blocked[vid] || [];
    const has = arr.includes(k);
    setBlocked({ ...blocked, [vid]: has ? arr.filter(x => x !== k) : [...arr, k] });
    window.ADMIN.blocked = { ...blocked, [vid]: has ? arr.filter(x => x !== k) : [...arr, k] };
    try {
      await window.DB.setBlocked(vid, k, !has);
      toast(has ? `${d} ${monthNames[month].toLowerCase()} libéré` : `${d} ${monthNames[month].toLowerCase()} bloqué`);
    } catch (e) { toast("Erreur — réessayez"); }
  }

  return (
    <div className="view show">
      <div className="sec-title"><div><h2>Disponibilités</h2><div className="sub">Bloquez des dates et visualisez les réservations — anti double-réservation</div></div></div>

      <div className="cal-tabs">
        {A.vehicles.map(v => (
          <button key={v.id} className={"cal-tab" + (vid === v.id ? " active" : "")} onClick={() => setVid(v.id)}>
            <img src={v.photo} alt="" />{v.name.replace("Mercedes-Benz ", "")}
          </button>
        ))}
      </div>

      <div className="calwrap">
        <div className="calhead">
          <button className="calnav" onClick={() => setMonth(Math.max(0, month - 1))}><Icon name="chevron-left" /></button>
          <b>{monthNames[month]} {year}</b>
          <button className="calnav" onClick={() => setMonth(Math.min(11, month + 1))}><Icon name="chevron-right" /></button>
        </div>
        <div className="dow"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
        <div className="days">
          {cells.map((d, i) => {
            if (!d) return <div className="day muted" key={i}></div>;
            const k = key(d);
            const isBooked = bookedSet.has(k);
            const isBlocked = (blocked[vid] || []).includes(k);
            const cls = "day" + (isBooked ? " booked" : isBlocked ? " blocked" : "");
            return <div className={cls} key={i} onClick={() => toggle(d)}>{d}{isBooked && <span className="mk">réservé</span>}{isBlocked && !isBooked && <span className="mk">bloqué</span>}</div>;
          })}
        </div>
        <div className="callegend">
          <div className="lg"><span className="sw" style={{ background: "#fff", border: "1px solid var(--line)" }}></span>Disponible</div>
          <div className="lg"><span className="sw" style={{ background: "var(--info-bg)", border: "1px solid #b8d4e0" }}></span>Réservé</div>
          <div className="lg"><span className="sw" style={{ background: "var(--danger-bg)", border: "1px solid #e8bdb8" }}></span>Bloqué (manuel)</div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { CalView });
