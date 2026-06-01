/* Ecowave Rental — Legal page (Mentions légales · CGL · Privacy) */
function LegalApp() {
  const [lang, setLangState] = useState(() => localStorage.getItem("ecowave_lang") || "nl");
  const setLang = (l) => { setLangState(l); localStorage.setItem("ecowave_lang", l); };
  const t = window.ECOWAVE_I18N[lang];
  const L = t.legalPage;
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  function Section({ id, data }) {
    return (
      <section className="legal-sec" id={id}>
        <h2>{data.title}</h2>
        {data.blocks.map((b, i) => (
          <div className="legal-block" key={i}>
            <h3>{b.h}</h3>
            <ul>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
          </div>
        ))}
      </section>
    );
  }

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} home="index.html" />
      <main>
        <PageHero t={t} eyebrow={L.eyebrow} title={L.title} lead={L.lead} />
        <section className="section" style={{ paddingTop: 64 }}>
          <div className="container legal-wrap">
            <nav className="legal-nav">
              <a href="#legal">{L.nav.legal}</a>
              <a href="#terms">{L.nav.terms}</a>
              <a href="#conditions">{L.nav.conditions}</a>
              <a href="#privacy">{L.nav.privacy}</a>
              <span className="legal-updated">{L.updated}</span>
            </nav>
            <div className="legal-body">
              <Section id="legal" data={L.legal} />
              <Section id="terms" data={L.terms} />
              <section className="legal-sec" id="conditions">
                <h2>{t.conditions.title}</h2>
                <div className="legal-cond-grid">
                  {t.conditions.items.map((it, i) => (
                    <div className="legal-cond" key={i}>
                      <div className="lc-ic"><Icon name={it.icon} /></div>
                      <div><b>{it.t}</b><span>{it.d}</span></div>
                    </div>
                  ))}
                </div>
              </section>
              <Section id="privacy" data={L.privacy} />
            </div>
          </div>
        </section>
        <PageCTA t={t} />
      </main>
      <Footer t={t} lang={lang} home="index.html" />
      <Chatbot t={t} lang={lang} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<LegalApp />);
