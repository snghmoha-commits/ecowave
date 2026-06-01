/* Ecowave Rental — photo-driven vehicle sections */

function StatBand({ t, lang }) {
  const v = window.ECOWAVE_DATA.vehicle;
  const stats = [
    { v: "±122", u: " pk", l: { nl: "Vermogen", fr: "Puissance", en: "Power" } },
    { v: "Auto", u: "", l: { nl: "Transmissie", fr: "Transmission", en: "Transmission" } },
    { v: "2017", u: "", l: { nl: "Bouwjaar", fr: "Année", en: "Year" } },
    { v: "AMG", u: " Line", l: { nl: "Uitvoering", fr: "Finition", en: "Trim" } },
  ];
  return (
    <section className="section-sm" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container">
        <Reveal className="stat-band">
          {stats.map((s, i) => (
            <div className="stat-cell" key={i}>
              <div className="sv">{s.v}<span className="u">{s.u}</span></div>
              <div className="sl">{s.l[lang]}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function PremiumInterior({ t, lang }) {
  const v = window.ECOWAVE_DATA.vehicle;
  return (
    <section className="section" id="interior">
      <div className="container">
        <Reveal className="split-2">
          <div className="split-media"><img src={(window.assetUrl||(x=>x))("assets/car-interior.png")} alt="Mercedes A-Class AMG Line interior" /></div>
          <div>
            <div className="speedbar"></div>
            <span className="eyebrow">{t.interiorSec.eyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem,3vw,2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: "12px 0 0" }}>{t.interiorSec.title}</h2>
            <p className="lead" style={{ marginTop: 14 }}>{t.interiorSec.lead}</p>
            <div className="feature-cards">
              {v.interior[lang].map((f, i) => (
                <div className="feature-card" key={i}>
                  <div className="fc-ic"><Icon name={f.icon} /></div>
                  <h4>{f.t}</h4><p>{f.d}</p>
                </div>
              ))}
            </div>
            <div className="sell-strip">
              {t.sell.map((s, i) => <span className="s" key={i}><Icon name="check-circle" />{s}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AMGFeatures({ t, lang }) {
  const v = window.ECOWAVE_DATA.vehicle;
  return (
    <section className="section" id="amg" style={{ background: "var(--mist)" }}>
      <div className="container">
        <div className="sec-head center"><div className="speedbar"></div><span className="eyebrow">{t.amgSec.eyebrow}</span><h2>{t.amgSec.title}</h2><p>{t.amgSec.lead}</p></div>
        <Reveal className="amg-grid" style={{ marginTop: 48 }}>
          {v.amg[lang].map((a, i) => (
            <div className="amg-card" key={i}>
              <div className="a-ic"><Icon name={a.icon} /></div>
              <h4>{a.t}</h4><p>{a.d}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function DriverExperience({ t }) {
  return (
    <section className="section-sm" id="experience">
      <div className="container">
        <Reveal className="driver-band">
          <img src={(window.assetUrl||(x=>x))("assets/lifestyle-night.png")} alt="Ecowave Rental — city life" />
          <div className="driver-grad"></div>
          <div className="driver-content">
            <span className="eyebrow" style={{ color: "var(--lime-soft)" }}>{t.driverSec.eyebrow}</span>
            <h2>{t.driverSec.title}</h2>
            <p>{t.driverSec.lead}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { StatBand, PremiumInterior, AMGFeatures, DriverExperience });
