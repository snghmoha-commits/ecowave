/* Ecowave Rental — Leadership / Founders section */
function FounderCard({ p, t, lang, index }) {
  const [open, setOpen] = useState(false);
  const s = t.foundersSec;
  const A = window.assetUrl || ((x) => x);
  return (
    <div className={`founder-card ${open ? "open" : ""}`}>
      <div className="founder-portrait">
        {p.photo
          ? <img src={A(p.photo)} alt={p.name} />
          : <image-slot id={`founder-${p.id}`} shape="rect" placeholder={`${p.name} — portrait`}></image-slot>}
        <div className="founder-monogram" aria-hidden="true">{p.initials}</div>
        <span className="founder-role">{p.role[lang]}</span>
      </div>

      <div className="founder-body">
        <div className="founder-head">
          <h3>{p.name}</h3>
        </div>
        <p className="founder-intro">{p.intro[lang]}</p>

        <div className="founder-bio">
          <div className="founder-bio-inner">
            {p.bio[lang].map((para, i) => <p key={i}>{para}</p>)}

            <div className="founder-tags">
              <div className="ftag-label"><Icon name="award" style={{ width: 15, height: 15 }} />{s.expertise}</div>
              <div className="ftag-row">
                {p.expertise[lang].map((tg, i) => <span className="ftag" key={i}>{tg}</span>)}
              </div>
            </div>
            <div className="founder-tags">
              <div className="ftag-label"><Icon name="layers" style={{ width: 15, height: 15 }} />{s.sectors}</div>
              <div className="ftag-row">
                {p.sectors[lang].map((tg, i) => <span className="ftag ftag-sector" key={i}>{tg}</span>)}
              </div>
            </div>
          </div>
        </div>

        <button className="founder-toggle" onClick={() => setOpen(!open)}>
          {open ? s.less : s.more}
          <Icon name={open ? "chevron-up" : "chevron-down"} style={{ width: 17, height: 17 }} />
        </button>
      </div>
    </div>
  );
}

function Founders({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  const s = t.foundersSec;
  return (
    <section className="section" id="founders" style={{ background: "var(--mist)" }}>
      <div className="container">
        <div className="sec-head center"><div className="speedbar" style={{ marginLeft: "auto", marginRight: "auto" }}></div><span className="eyebrow">{s.eyebrow}</span><h2>{s.title}</h2><p>{s.lead}</p></div>
        <Reveal className="founders-grid" style={{ marginTop: 52 }}>
          {D.founders.map((p, i) => <FounderCard key={p.id} p={p} t={t} lang={lang} index={i} />)}
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { FounderCard, Founders });
