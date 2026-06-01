/* Ecowave Rental — new homepage sections: Why, Process, Fleet, AI band, FAQ, Contact */

function WhyChoose({ t }) {
  return (
    <section className="section" id="why">
      <div className="container">
        <div className="sec-head center"><div className="speedbar"></div><span className="eyebrow">{t.why.eyebrow}</span><h2>{t.why.title}</h2><p>{t.why.lead}</p></div>
        <Reveal className="why-grid" style={{ marginTop: 52 }}>
          {t.why.items.map((it, i) => (
            <div className="why-card" key={i}>
              <div className="why-ic"><Icon name={it.icon} /></div>
              <h4>{it.t}</h4><p>{it.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Process({ t }) {
  return (
    <section className="section" id="process" style={{ background: "var(--mist)" }}>
      <div className="container">
        <div className="sec-head center"><div className="speedbar"></div><span className="eyebrow">{t.process.eyebrow}</span><h2>{t.process.title}</h2><p>{t.process.lead}</p></div>
        <Reveal className="process-grid" style={{ marginTop: 56 }}>
          {t.process.steps.map((s, i) => (
            <div className="proc-step" key={i}>
              <div className="proc-num">{i + 1}</div>
              <h4>{s.t}</h4><p>{s.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FleetCard({ v, t, lang }) {
  const A = window.assetUrl || ((x) => x);
  const soon = v.comingSoon || !v.available;
  const Tag = v.href ? "a" : "div";
  return (
    <Tag className={`vcard ${soon ? "is-soon" : ""} ${v.featured ? "is-featured" : ""}`} href={v.href || undefined}>
      <div className="vcard-media">
        {v.photo
          ? <img src={A(v.photo)} alt={v.name} className="vcard-img" />
          : <image-slot id={`fleet-${v.id}`} shape="rect" placeholder={v.name}></image-slot>}
        {v.featured && <span className="vcard-ribbon">{t.fleetSec.featured}</span>}
        <span className={`vcard-status ${v.available ? "on" : "soon"}`}>
          <span className="sdot"></span>{v.available ? t.fleetSec.available : t.fleetSec.soon}
        </span>
      </div>
      <div className="vcard-body">
        <div className="vcard-badges">
          {v.amgLine && <span className="vbadge amg">AMG Line</span>}
          <span className="vbadge cat">{v.cat[lang]}</span>
        </div>
        <h3 className="vcard-name">{v.name}</h3>

        <div className="vcard-specs">
          <div className="vspec"><Icon name="zap" /><div><b>{v.specs.power}</b><span>{t.fleetSec.lblPower}</span></div></div>
          <div className="vspec"><Icon name="users" /><div><b>{v.specs.seats}</b><span>{t.fleetSec.lblSeats}</span></div></div>
          <div className="vspec"><Icon name="fuel" /><div><b>{v.specs.fuel[lang]}</b><span>{t.fleetSec.lblFuel}</span></div></div>
        </div>

        <div className="vcard-foot">
          {v.price != null
            ? <div className="vcard-price"><span className="frm">{t.fleetSec.from}</span><div className="amt"><span className="cur">€</span><b>{v.price}</b><span className="per">{t.fleetSec.perday}</span></div></div>
            : <div className="vcard-price"><span className="soon-pill"><Icon name="sparkles" style={{ width: 14, height: 14 }} />{t.fleetSec.soonPrice}</span></div>}
          {v.available
            ? <span className="btn btn-primary vcard-cta">{t.fleetSec.view}<Icon name="arrow-right" style={{ width: 16, height: 16 }} /></span>
            : <span className="btn btn-ghost vcard-cta">{t.fleetSec.notify}<Icon name="bell" style={{ width: 15, height: 15 }} /></span>}
        </div>
      </div>
    </Tag>
  );
}

function FleetSection({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  return (
    <section className="section" id="fleet">
      <div className="container">
        <div className="sec-head"><div className="speedbar"></div><span className="eyebrow">{t.fleetSec.eyebrow}</span><h2>{t.fleetSec.title}</h2><p>{t.fleetSec.lead}</p></div>
        <Reveal className="vcard-grid" style={{ marginTop: 48 }}>
          {D.fleet.map((v) => <FleetCard key={v.id} v={v} t={t} lang={lang} />)}
        </Reveal>
      </div>
    </section>
  );
}

function AIBand({ t }) {
  const open = () => window.dispatchEvent(new Event("ecowave-open-chat"));
  return (
    <section className="section-sm" id="assistant">
      <div className="container">
        <Reveal className="ai-band">
          <div className="ai-inner">
            <div>
              <span className="eyebrow" style={{ color: "var(--green-300)" }}>{t.ai.eyebrow}</span>
              <h2>{t.ai.title}</h2>
              <p className="lead">{t.ai.lead}</p>
              <ul className="ai-bullets">
                {t.ai.bullets.map((b, i) => <li key={i}><Icon name="check-circle" />{b}</li>)}
              </ul>
              <button className="btn btn-primary btn-lg" onClick={open}><Icon name="sparkles" />{t.ai.cta}</button>
            </div>
            <div className="ai-card">
              <div className="ai-chat-prev">
                <div className="top"><div className="a"><Icon name="sparkles" /></div><b>{t.chat.title}</b></div>
                <div className="body">
                  <div className="b">{t.chat.c1}? {t.chat.greeting.split("?")[0]}?</div>
                  <div className="u">{t.chat.c2}</div>
                  <div className="b">€{window.ECOWAVE_DATA.vehicle.pricePerDay} {t.vehicle.perday} — {window.ECOWAVE_DATA.vehicle.kmPerDay} km {t.detail.incl.toLowerCase()}.</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-wrap">
      {items.map((it, i) => (
        <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}<Icon name="plus" />
          </button>
          <div className="faq-a" style={{ maxHeight: open === i ? "260px" : "0" }}>
            <div className="faq-a-inner">{it.a}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FAQ({ t }) {
  return (
    <section className="section" id="faq" style={{ background: "var(--mist)" }}>
      <div className="container">
        <div className="sec-head center"><div className="speedbar"></div><span className="eyebrow">{t.faq.eyebrow}</span><h2>{t.faq.title}</h2></div>
        <div style={{ marginTop: 12 }}>
          <FAQList items={t.faq.items} />
        </div>
      </div>
    </section>
  );
}

// Reusable contact / owner-enquiry form. ownerMode tweaks the WhatsApp prefill.
function ContactForm({ t, lang, ownerMode }) {
  const D = window.ECOWAVE_DATA;
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = t.booking.errName;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) er.email = t.booking.errEmail;
    setErrors(er);
    if (Object.keys(er).length) return;
    setDone(true);
    const intro = ownerMode
      ? "Hi Ecowave Rental! I'd like to list my car with the owner program."
      : "Hi Ecowave Rental!";
    const msg = [intro, `Name: ${f.name}`, `Email: ${f.email}`, f.phone ? `Phone: ${f.phone}` : null, f.message ? `Message: ${f.message}` : null].filter(Boolean).join("\n");
    openWhatsApp(msg);
  }
  return (
    <form className="panel" onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column" }}>
      {done && <div className="success-msg"><Icon name="check-circle" />{t.contact.success}</div>}
      <Field icon="user" label={t.contact.name} error={errors.name}><input value={f.name} onChange={set("name")} placeholder="Jan Janssens" /></Field>
      <div className="form-row">
        <Field icon="mail" label={t.contact.email} error={errors.email}><input value={f.email} onChange={set("email")} placeholder="you@email.com" /></Field>
        <Field icon="phone" label={t.contact.phone}><input value={f.phone} onChange={set("phone")} placeholder="+32 …" /></Field>
      </div>
      <Field icon="message-square" label={t.contact.message}><textarea rows="4" value={f.message} onChange={set("message")} placeholder={t.contact.messagePh}></textarea></Field>
      <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 4 }}><Icon name="send" />{t.contact.submit}</button>
    </form>
  );
}

function Contact({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="contact-grid">
          <div className="contact-info">
            <span className="eyebrow" style={{ color: "var(--green-300)" }}>{t.contact.eyebrow}</span>
            <h3>{t.contact.title}</h3>
            <p className="ci-lead">{t.contact.lead}</p>
            <div className="ci-list">
              <div className="ci-row"><div className="ci-ic"><Icon name="map-pin" /></div><div><div className="ci-l">{t.contact.locLabel}</div><div className="ci-v">{t.contact.loc}</div></div></div>
              <div className="ci-row"><div className="ci-ic"><Icon name="clock" /></div><div><div className="ci-l">{t.contact.hoursLabel}</div><div className="ci-v">{t.contact.hours}</div></div></div>
              <a className="ci-row" href={`tel:${D.phone.replace(/\s/g, "")}`}><div className="ci-ic"><Icon name="phone" /></div><div><div className="ci-l">{t.contact.phone}</div><div className="ci-v">{D.phone}</div></div></a>
              <a className="ci-row" href={`https://wa.me/${D.whatsapp}`} target="_blank" rel="noreferrer"><div className="ci-ic"><Icon name="message-circle" /></div><div><div className="ci-l">WhatsApp</div><div className="ci-v">{D.phone}</div></div></a>
              <a className="ci-row" href={`mailto:${D.email}`}><div className="ci-ic"><Icon name="mail" /></div><div><div className="ci-l">E-mail</div><div className="ci-v">{D.email}</div></div></a>
            </div>
            <a className="btn btn-wa btn-lg" href={`https://wa.me/${D.whatsapp}`} target="_blank" rel="noreferrer"><Icon name="message-circle" />{t.contact.wa}</a>
          </div>
          <ContactForm t={t} lang={lang} />
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { WhyChoose, Process, FleetSection, AIBand, FAQ, FAQList, Contact, ContactForm });
