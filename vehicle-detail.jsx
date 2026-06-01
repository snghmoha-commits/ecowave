/* Ecowave Rental — Vehicle detail page (serves any vehicle by ?v=<id>) */
function VehicleDetail({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  const params = new URLSearchParams(window.location.search);
  const vid = params.get("v") || "a-class";
  const v = D.getVehicle(vid);
  const isAClass = vid === "a-class";
  const [active, setActive] = useState(0);
  const A = window.assetUrl || ((x) => x);
  const photos = v.gallery || ["assets/car-front.png"];
  const dec = (n) => n.toFixed(2).replace(".", lang === "en" ? "." : ",");

  function reserve() {
    const msg = `Hi Ecowave Rental! I'd like to reserve the ${v.name} ${v.trim}. Could you confirm availability?`;
    openWhatsApp(msg);
  }

  return (
    <React.Fragment>
      {/* Full-bleed hero */}
      <section className="vd-hero">
        <img className="vd-hero-img" src={A(photos[0])} alt={`${v.name} ${v.trim}`} />
        <div className="vd-hero-grad"></div>
        <div className="vd-hero-content">
          <div className="container">
            <a className="vd-back" href="index.html#fleet"><Icon name="arrow-left" />{t.detail.back}</a>
            <div className="vd-avail"><span className="dot"></span>{t.detail.available}</div>
            <h1>{v.name} <span style={{ color: "var(--lime)" }}>{v.trim}</span></h1>
            <p className="vd-sub">{v.tagline[lang]}</p>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <section className="section">
        <div className="container">
          <div className="vd-layout">
            <div>
              {/* Gallery */}
              <span className="eyebrow">{t.detail.gallery}</span>
              <img className="rgallery-main" src={A(photos[active])} alt={`${v.name} ${v.trim}`} style={{ marginTop: 14 }} />
              <div className="rgallery-thumbs">
                {photos.map((p, i) => (
                  <img key={i} src={A(p)} className={active === i ? "active" : ""} onClick={() => setActive(i)} alt={`${v.name} photo ${i + 1}`} />
                ))}
              </div>

              {/* Highlights */}
              <h3 style={{ marginTop: 48, fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em" }}>{t.detail.highlights}</h3>
              <div className="vd-highlights">
                {v.highlights[lang].map((hl, i) => (
                  <div className="vd-hl" key={i}><Icon name="check-circle" />{hl}</div>
                ))}
              </div>

              {/* Specs */}
              <h3 style={{ marginTop: 48, fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em" }}>{t.detail.specs}</h3>
              <div className="vd-spectable">
                {v.tech.map((s, i) => (
                  <div className="vd-specrow" key={i}>
                    <Icon name={s.icon} />
                    <span className="l">{s.label[lang]}</span>
                    <span className="v">{s.val[lang]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky pricing */}
            <aside>
              <div className="vd-pricing">
                <span className="eyebrow">{v.category[lang]}</span>
                <div className="pp" style={{ marginTop: 10 }}><span className="cur">€</span><b>{v.pricePerDay}</b><span>{t.detail.perday}</span></div>
                <div className="rev-stars" style={{ marginTop: 8 }}>
                  {[0,1,2,3,4].map((i) => <Icon key={i} name="star" style={{ width: 15, height: 15, color: "var(--gold-500)" }} />)}
                  <span style={{ fontSize: 13, color: "var(--ink-400)", marginLeft: 6, fontWeight: 600 }}>5.0 · 38</span>
                </div>
                <div className="pr-meta">
                  <div className="r"><span className="k"><Icon name="calendar-days" />{t.heroV.weekend}</span><span className="vv">€{v.priceWeekend}</span></div>
                  {v.priceWeek != null && <div className="r"><span className="k"><Icon name="calendar-range" />{t.heroV.week}</span><span className="vv">€{v.priceWeek}</span></div>}
                  <div className="r"><span className="k"><Icon name="calendar" />{t.heroV.month}</span><span className="vv">{t.heroV.onRequest}</span></div>
                  <div className="r"><span className="k"><Icon name="route" />{v.kmPerDay} {t.heroV.kmUnit}</span><span className="vv">{t.detail.incl}</span></div>
                  <div className="r"><span className="k"><Icon name="plus" />{t.heroV.extraKm}</span><span className="vv">{v.extraKm != null ? `€${dec(v.extraKm)}/km` : t.heroV.tbc}</span></div>
                  <div className="r"><span className="k"><Icon name="wallet" />{t.detail.deposit}</span><span className="vv">€{v.securityDeposit.toLocaleString("nl-BE")}</span></div>
                  <div className="r"><span className="k"><Icon name="shield-check" />{t.trust.t3}</span><span className="vv">✓</span></div>
                </div>
                <div className="vd-cta-stack">
                  <button className="btn btn-wa btn-lg btn-block" onClick={reserve}><Icon name="message-circle" />{t.detail.book}</button>
                  <a className="btn btn-dark btn-lg btn-block" href="index.html#booking"><Icon name="calendar-check" />{t.hero.availability}</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* A-Class only: rich photo-driven marketing sections (A-Class-specific copy) */}
      {isAClass && <AMGFeatures t={t} lang={lang} />}
      {isAClass && <DriverExperience t={t} />}
      <Conditions t={t} />
    </React.Fragment>
  );
}

function DetailApp() {
  const [lang, setLangState] = useState(() => localStorage.getItem("ecowave_lang") || "nl");
  const setLang = (l) => { setLangState(l); localStorage.setItem("ecowave_lang", l); };
  const t = window.ECOWAVE_I18N[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} home="index.html" />
      <main><VehicleDetail t={t} lang={lang} /></main>
      <Footer t={t} lang={lang} home="index.html" />
      <Chatbot t={t} lang={lang} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<DetailApp />);
