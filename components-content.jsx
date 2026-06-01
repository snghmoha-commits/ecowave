/* Ecowave Rental — Conditions + Reviews */
function Conditions({ t }) {
  return (
    <section className="section" id="conditions">
      <div className="container">
        <SectionHead eyebrow={t.conditions.eyebrow} title={t.conditions.title} lead={t.conditions.lead} center />
        <Reveal className="cond-grid" style={{ marginTop: 48 }}>
          {t.conditions.items.map((it, i) => (
            <div className="cond-card" key={i}>
              <div className="cond-ic"><Icon name={it.icon} /></div>
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Reviews({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  return (
    <section className="section" id="reviews" style={{ background: "var(--mist)" }}>
      <div className="container">
        <SectionHead eyebrow={t.reviews.eyebrow} title={t.reviews.title} lead={t.reviews.lead} center />
        <Reveal className="rev-grid" style={{ marginTop: 48 }}>
          {D.reviews.map((r, i) => (
            <div className="rev-card" key={i}>
              <div className="rev-stars">
                {[0,1,2,3,4].map((s) => <Icon key={s} name="star" style={{ width: 17, height: 17, color: "var(--gold-500)" }} />)}
              </div>
              <p className="rev-text">“{r.text[lang]}”</p>
              <div className="rev-author">
                <div className="rev-avatar">{r.initials}</div>
                <div>
                  <div className="ra-name">{r.name}</div>
                  <div className="ra-meta">{r.city[lang]}</div>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
Object.assign(window, { Conditions, Reviews });
