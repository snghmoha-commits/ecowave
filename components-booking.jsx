/* Ecowave Rental — Availability calendar + Booking form */
const MONTHS = {
  nl: ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],
  fr: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"],
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
};
const DOW = { nl: ["M","D","W","D","V","Z","Z"], fr: ["L","M","M","J","V","S","D"], en: ["M","T","W","T","F","S","S"] };

function ymd(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function fmt(d, lang) { return d ? `${d.getDate()} ${MONTHS[lang][d.getMonth()].slice(0,3)} ${d.getFullYear()}` : ""; }

// A few pre-booked days this & next month for realism
function bookedSet() {
  const now = new Date();
  const mk = (off, day) => { const d = new Date(now.getFullYear(), now.getMonth()+off, day); return ymd(d); };
  return new Set([mk(0,7), mk(0,8), mk(0,9), mk(0,20), mk(1,3), mk(1,4), mk(1,14), mk(1,15), mk(1,16)]);
}

function Calendar({ t, lang, range, setRange }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const booked = useRef(bookedSet()).current;

  const year = view.getFullYear(), month = view.getMonth();
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  function clickDay(d) {
    if (!d) return;
    const key = ymd(d);
    if (d < today || booked.has(key)) return;
    if (!range.start || (range.start && range.end)) {
      setRange({ start: d, end: null });
    } else {
      if (d < range.start) setRange({ start: d, end: null });
      else {
        // reject range crossing a booked day
        let cur = new Date(range.start); let ok = true;
        while (cur <= d) { if (booked.has(ymd(cur))) ok = false; cur.setDate(cur.getDate()+1); }
        setRange(ok ? { start: range.start, end: d } : { start: d, end: null });
      }
    }
  }

  function cls(d) {
    if (!d) return "cal-d muted";
    const key = ymd(d);
    if (d < today || booked.has(key)) return "cal-d disabled";
    const s = range.start, e = range.end;
    if (s && e) {
      if (key === ymd(s)) return "cal-d sel-start";
      if (key === ymd(e)) return "cal-d sel-end";
      if (d > s && d < e) return "cal-d in-range";
    } else if (s && key === ymd(s)) return "cal-d sel-single";
    return "cal-d";
  }

  const canPrev = !(year === today.getFullYear() && month === today.getMonth());

  return (
    <div className="panel">
      <div className="cal-head">
        <button className="cal-nav" disabled={!canPrev} style={{ opacity: canPrev ? 1 : 0.35 }}
          onClick={() => canPrev && setView(new Date(year, month - 1, 1))}><Icon name="chevron-left" style={{ width: 16, height: 16 }} /></button>
        <b>{MONTHS[lang][month]} {year}</b>
        <button className="cal-nav" onClick={() => setView(new Date(year, month + 1, 1))}><Icon name="chevron-right" style={{ width: 16, height: 16 }} /></button>
      </div>
      <div className="cal-dow">{DOW[lang].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="cal-days">
        {cells.map((d, i) => (
          <div key={i} className={cls(d)} onClick={() => clickDay(d)}>{d ? d.getDate() : ""}</div>
        ))}
      </div>
      <div className="cal-legend">
        <div className="lg"><span className="sw" style={{ background: "var(--green-600)" }}></span>{t.cal.legendSel}</div>
        <div className="lg"><span className="sw" style={{ background: "var(--green-50)" }}></span>{t.cal.legendRange}</div>
        <div className="lg"><span className="sw" style={{ background: "#fff", border: "1px solid var(--line)" }}></span><s>{t.cal.legendBooked}</s></div>
      </div>
    </div>
  );
}

function Field({ icon, label, error, children }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <div className={`form-input ${error ? "invalid" : ""}`}>
        <Icon name={icon} />{children}
      </div>
      {error && <span className="form-err"><Icon name="alert-circle" style={{ width: 13, height: 13 }} />{error}</span>}
    </div>
  );
}

function BookingForm({ t, lang, range }) {
  const D = window.ECOWAVE_DATA;
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function validate() {
    const er = {};
    if (!form.name.trim()) er.name = t.booking.errName;
    if (!/^[+0-9 ()-]{7,}$/.test(form.phone)) er.phone = t.booking.errPhone;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = t.booking.errEmail;
    if (!range.start || !range.end) er.dates = t.booking.errDates;
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    const msg = [
      `Hi Ecowave Rental! I'd like to reserve the ${D.vehicle.name}.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Pickup: ${fmt(range.start, lang)}`,
      `Return: ${fmt(range.end, lang)}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join("\n");
    setDone(true);
    openWhatsApp(msg);
  }

  return (
    <form className="panel" onSubmit={submit} noValidate>
      {done && <div className="success-msg"><Icon name="check-circle" />{t.booking.success}</div>}
      <Field icon="user" label={t.booking.name} error={errors.name}>
        <input value={form.name} onChange={set("name")} placeholder="Jan Janssens" />
      </Field>
      <div className="form-row">
        <Field icon="phone" label={t.booking.phone} error={errors.phone}>
          <input value={form.phone} onChange={set("phone")} placeholder="+32 …" />
        </Field>
        <Field icon="mail" label={t.booking.email} error={errors.email}>
          <input value={form.email} onChange={set("email")} placeholder="you@email.com" />
        </Field>
      </div>
      <div className="form-row">
        <Field icon="calendar" label={t.booking.pickup} error={errors.dates}>
          <input readOnly value={fmt(range.start, lang)} placeholder={t.booking.selectDates} />
        </Field>
        <Field icon="calendar-check" label={t.booking.ret}>
          <input readOnly value={fmt(range.end, lang)} placeholder={t.booking.selectDates} />
        </Field>
      </div>
      <Field icon="message-square" label={t.booking.notes}>
        <textarea rows="2" value={form.notes} onChange={set("notes")} placeholder={t.booking.notesPh}></textarea>
      </Field>
      <div className="form-note"><Icon name="info" />{t.booking.note}</div>
      <button type="submit" className="btn btn-wa btn-block btn-lg"><Icon name="message-circle" />{t.booking.submit}</button>
    </form>
  );
}

function BookingSection({ t, lang }) {
  const [range, setRange] = useState({ start: null, end: null });
  return (
    <section className="section" id="booking" style={{ background: "var(--mist)" }}>
      <div className="container">
        <SectionHead eyebrow={t.booking.eyebrow} title={t.booking.title} lead={t.booking.lead} center />
        <Reveal className="book-grid" style={{ marginTop: 48 }}>
          <Calendar t={t} lang={lang} range={range} setRange={setRange} />
          <BookingForm t={t} lang={lang} range={range} />
        </Reveal>
      </div>
    </section>
  );
}
Object.assign(window, { Calendar, BookingForm, BookingSection });
