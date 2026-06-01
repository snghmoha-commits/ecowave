/* Ecowave Rental — About / Vision / Invest page components */

function PageHero({ t, eyebrow, title, lead, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow"></div>
      <div className="container">
        <div className="page-hero-inner">
          <div className="speedbar"></div>
          <span className="eyebrow page-hero-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {children && <div className="page-hero-cta">{children}</div>}
        </div>
      </div>
    </section>
  );
}

function PageCTA({ t }) {
  const D = window.ECOWAVE_DATA;
  const wa = `https://wa.me/${D.whatsapp}`;
  return (
    <section className="section">
      <div className="container">
        <Reveal className="cta-band">
          <h2>{t.pageCta.title}</h2>
          <p>{t.pageCta.lead}</p>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href="vehicle.html"><Icon name="car-front" />{t.pageCta.book}</a>
            <a className="btn btn-wa btn-lg" href={wa} target="_blank" rel="noreferrer"><Icon name="message-circle" />{t.pageCta.wa}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function AboutPage({ t, lang }) {
  const a = t.aboutPage;
  return (
    <React.Fragment>
      <PageHero t={t} eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      <section className="section-sm" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <Reveal className="stat-band-light">
            {a.stats.map((s, i) => (
              <div className="sc" key={i}><div className="sv">{s.v}</div><div className="sl">{s.l}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <Reveal className="story-split">
            <img src={(window.assetUrl||(x=>x))("assets/car-rear.png")} alt="Mercedes A-Class AMG Line" />
            <div className="prose-block">
              <div className="speedbar"></div>
              <span className="eyebrow">{a.story.eyebrow}</span>
              <h2>{a.story.title}</h2>
              <p>{a.story.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--mist)" }}>
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">{a.mission.eyebrow}</span><h2>{a.mission.title}</h2><p>{a.mission.body}</p></div>
          <Reveal className="val-grid" style={{ marginTop: 48 }}>
            {a.values.map((v, i) => (
              <div className="val-card" key={i}>
                <div className="v-ic"><Icon name={v.icon} /></div>
                <h4>{v.t}</h4><p>{v.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Founders t={t} lang={lang} />

      <PageCTA t={t} />
    </React.Fragment>
  );
}

/* ---------------- VISION ---------------- */
function VisionPage({ t }) {
  const v = t.visionPage;
  return (
    <React.Fragment>
      <PageHero t={t} eyebrow={v.eyebrow} title={v.title} lead={v.lead} />

      <section className="section">
        <div className="container">
          <Reveal className="pillar-grid">
            {v.pillars.map((p, i) => (
              <div className="pillar" key={i}>
                <div className="p-ic"><Icon name={p.icon} /></div>
                <div><h4>{p.t}</h4><p>{p.d}</p></div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--mist)" }}>
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">{v.roadmap.eyebrow}</span><h2>{v.roadmap.title}</h2></div>
          <Reveal className="roadmap" style={{ marginTop: 56 }}>
            {v.roadmap.steps.map((s, i) => (
              <div className="rm-step" key={i}>
                <div className="rm-dot"></div>
                <div className="ry">{s.y}</div>
                <h4>{s.t}</h4><p>{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <PageCTA t={t} />
    </React.Fragment>
  );
}

/* ---------------- INVEST ---------------- */
function InvestPage({ t, lang }) {
  const iv = t.investPage;
  const D = window.ECOWAVE_DATA;
  const wa = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent("Hi Ecowave Rental! I'm interested in the Invest / owner partnership program.")}`;
  return (
    <React.Fragment>
      <PageHero t={t} eyebrow={iv.eyebrow} title={iv.title} lead={iv.lead}>
        <a className="btn btn-primary btn-lg" href="#invest-contact"><Icon name="handshake" />{iv.ctaPrimary}</a>
        <a className="btn btn-wa btn-lg" href={wa} target="_blank" rel="noreferrer"><Icon name="message-circle" />{iv.ctaWa}</a>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">{iv.how.eyebrow}</span><h2>{iv.how.title}</h2></div>
          <Reveal className="how-grid" style={{ marginTop: 48 }}>
            {iv.how.steps.map((s, i) => (
              <div className="how-card" key={i}>
                <div className="how-num">0{i + 1}</div>
                <div className="h-ic"><Icon name={s.icon} /></div>
                <h4>{s.t}</h4><p>{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal className="revenue-card">
            <div className="rc-copy">
              <span className="eyebrow" style={{ color: "var(--lime-soft)" }}>{iv.revenue.eyebrow}</span>
              <h2>{iv.revenue.title}</h2>
              <p className="rc-note">{iv.revenue.note}</p>
            </div>
            <div className="split-bars">
              {iv.revenue.split.map((sp, i) => (
                <div className="split-row" key={i}>
                  <div className="sr-top"><span className="sr-pct">{sp.pct}</span><span className="sr-l">{sp.l}</span></div>
                  <div className="split-track"><div className="split-fill" style={{ width: sp.pct }}></div></div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--mist)", paddingTop: 96 }}>
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">Benefits</span><h2>{lang === "fr" ? "Les avantages pour vous" : lang === "nl" ? "De voordelen voor jou" : "The benefits for you"}</h2></div>
          <Reveal className="val-grid" style={{ marginTop: 48 }}>
            {iv.benefits.map((b, i) => (
              <div className="val-card" key={i}>
                <div className="v-ic"><Icon name={b.icon} /></div>
                <h4>{b.t}</h4><p>{b.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="req-split">
            <div className="prose-block">
              <div className="speedbar"></div>
              <span className="eyebrow">{iv.requirements.eyebrow}</span>
              <h2>{iv.requirements.title}</h2>
            </div>
            <div className="req-list">
              {iv.requirements.items.map((r, i) => (
                <div className="req-item" key={i}><div className="rq-ic"><Icon name="check" /></div><span>{r}</span></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ background: "var(--mist)" }} id="invest-faq">
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">{iv.faq.eyebrow}</span><h2>{iv.faq.title}</h2></div>
          <Reveal style={{ marginTop: 44, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
            <FAQList items={iv.faq.items} />
          </Reveal>
        </div>
      </section>

      <section className="section" id="invest-contact">
        <div className="container">
          <div className="sec-head center"><span className="eyebrow">{t.contact.eyebrow}</span><h2>{iv.ctaPrimary}</h2></div>
          <div style={{ maxWidth: 620, margin: "44px auto 0" }}>
            <ContactForm t={t} lang={lang} ownerMode />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { PageHero, PageCTA, AboutPage, VisionPage, InvestPage });
