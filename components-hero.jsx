/* Ecowave Rental — Vehicle-centric hero (A-Class AMG Line centerpiece) */
function Hero({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  const v = D.vehicle;
  const wa = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(`Hi Ecowave Rental! I'd like to book the ${v.name} ${v.trim}.`)}`;
  return (
    <section className="vhero" id="top">
      <div className="container">
        <div className="vhero-grid">
          <div className="vhero-copy">
            <span className="eyebrow vhero-eyebrow">{t.hero.eyebrow}</span>
            <h1>{v.name} <span className="amg">{v.trim}</span></h1>
            <p className="vhero-tag">{t.hero.lead}</p>

            <div className="vchips">
              <span className="vchip"><Icon name="zap" />{v.specs.power[lang]}</span>
              <span className="vchip"><Icon name="gauge" />{v.specs.trans[lang]}</span>
              <span className="vchip"><Icon name="fuel" />{v.specs.fuel[lang]}</span>
              <span className="vchip"><Icon name="route" />{v.kmPerDay} {t.heroV.kmUnit}</span>
              <span className="vchip"><Icon name="calendar" />{v.year}</span>
            </div>

            <div className="vprice">
              <div className="pmain"><span className="cur">€</span><b>{v.pricePerDay}</b><span>{t.vehicle.perday}</span></div>
              <div className="pdep"><span className="l">{t.heroV.weekend}</span><b>€{v.priceWeekend}</b></div>
              <div className="pdep"><span className="l">{t.heroV.week}</span><b>€{v.priceWeek}</b></div>
            </div>

            <div className="vctas">
              <a className="btn btn-primary btn-lg" href="#booking"><Icon name="calendar-check" />{t.hero.availability}</a>
              <a className="btn btn-dark btn-lg" href="vehicle.html"><Icon name="car-front" />{t.heroV.details}</a>
              <a className="btn btn-wa btn-lg" href={wa} target="_blank" rel="noreferrer"><Icon name="message-circle" />{t.hero.whatsapp}</a>
            </div>
          </div>

          <div className="vhero-visual">
            <div className="vhero-glow"></div>
            <img className="vhero-img" src={(window.assetUrl||(x=>x))("assets/car-front.png")} alt={`${v.name} ${v.trim}`} />
            <div className="vhero-avail" style={{ position: "absolute", bottom: 18, left: 18, zIndex: 2, background: "rgba(11,15,13,0.72)", backdropFilter: "blur(8px)", borderColor: "rgba(45,225,31,0.5)" }}>
              <span className="dot"></span>{t.hero.badge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Hero });
