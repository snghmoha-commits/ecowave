/* Ecowave Rental — Vehicle showcase with gallery */
function VehicleShowcase({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  const v = D.vehicle;
  const [active, setActive] = useState(0);
  const thumbs = [0, 1, 2, 3];
  const specOrder = ["fuel", "trans", "seats", "doors", "range", "ac"];

  return (
    <section className="section" id="vehicle">
      <div className="container">
        <SectionHead eyebrow={t.vehicle.eyebrow} title={t.vehicle.title} lead={t.vehicle.lead} />
        <Reveal className="vehicle" style={{ marginTop: 48 }}>
          <div className="gallery">
            <image-slot id={`veh-main-${active}`} class="gallery-main" shape="rounded" radius="28"
              placeholder={`${v.name} — main photo`}></image-slot>
            <div className="gallery-thumbs">
              {thumbs.map((i) => (
                <image-slot key={i} id={`veh-thumb-${i}`}
                  class={`gallery-thumb ${active === i ? "active" : ""}`}
                  shape="rounded" radius="14" placeholder={`#${i + 1}`}
                  onClick={() => setActive(i)}></image-slot>
              ))}
            </div>
          </div>

          <div className="vehicle-info">
            <span className="vehicle-cat"><Icon name="car-front" style={{ width: 14, height: 14 }} />{v.category[lang]}</span>
            <h3>{v.name}</h3>
            <div className="rev-stars" style={{ marginBottom: 4 }}>
              {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" style={{ width: 16, height: 16, color: "var(--gold-500)" }} />)}
              <span style={{ fontSize: 13, color: "var(--ink-400)", marginLeft: 6, fontWeight: 600 }}>5.0 · 38</span>
            </div>

            <div className="vehicle-specs">
              {specOrder.map((key) => {
                const s = v.specs[key];
                return (
                  <div className="spec-row" key={key}>
                    <Icon name={s.icon} />
                    <div><div className="sv">{s[lang]}</div></div>
                  </div>
                );
              })}
            </div>

            <div className="price-box">
              <div className="p-main">
                <span style={{ display: "block", fontSize: 12, color: "var(--ink-400)", marginBottom: 2 }}>{t.vehicle.from}</span>
                <b>€{v.pricePerDay}</b><span>{t.vehicle.perday}</span>
              </div>
              <div className="p-dep">
                <span>{t.vehicle.deposit}</span>
                <b>€{v.deposit1}–{v.deposit2}</b>
              </div>
            </div>

            <div className="vd-cta-stack" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a className="btn btn-primary btn-block btn-lg" href="vehicle.html"><Icon name="car-front" />{t.vehicle.reserveBtn}</a>
              <a className="btn btn-ghost btn-block" href="#booking">{t.hero.availability}<Icon name="arrow-right" style={{ width: 16, height: 16 }} /></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
Object.assign(window, { VehicleShowcase });
