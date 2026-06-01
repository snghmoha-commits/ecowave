/* Ecowave Rental — chrome: Header, Footer, TrustStrip, helpers */
const { useState, useEffect, useRef } = React;

// Icon renders Lucide into its own inner node so React never diffs the SVG
// that Lucide injects (avoids the <i>→<svg> replacement clash on re-render).
// Build a wa.me URL (modern format) with optional prefilled text.
function waUrl(text) {
  const D = window.ECOWAVE_DATA;
  return `https://wa.me/${D.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : "");
}
// Open WhatsApp robustly: window.open can be blocked (sandboxed iframe / popup
// blocker). Fall back to a synthesised anchor click, then to top-level nav.
function openWhatsApp(text) {
  const url = waUrl(text);
  let w = null;
  try { w = window.open(url, "_blank", "noopener,noreferrer"); } catch (e) { w = null; }
  if (w) return;
  try {
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    document.body.appendChild(a); a.click(); a.remove();
  } catch (e) {
    try { (window.top || window).location.href = url; } catch (e2) { window.location.href = url; }
  }
}

function Icon({ name, style }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    host.appendChild(i);
    window.lucide.createIcons();
  }, [name]);
  return <span className="ic" ref={ref} style={{ display: "inline-flex", lineHeight: 0, ...style }}></span>;
}

// Reveal-on-scroll wrapper. Content is visible by DEFAULT and visibility never
// depends on the animation completing or the page being visible. We only "arm"
// (hide) an element if (a) it's below the fold AND (b) the page is currently
// visible so the entrance animation can actually run. Revealing removes the
// armed class outright (so a frozen/never-finishing animation can't keep it
// hidden), and a visibility/pagehide guard force-reveals anything still armed.
function Reveal({ children, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => { el.classList.remove("reveal-armed"); el.classList.add("in"); };
    // Don't hide content in a non-visible context (preview card / thumbnail /
    // screenshot / background tab) — it would never animate back in.
    if (document.visibilityState !== "visible") return;
    // already in view at mount → leave visible, no animation
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.classList.add("reveal-armed");
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } });
      }, { threshold: 0.08 });
      io.observe(el);
    }
    const t = setTimeout(reveal, 1500); // safety net
    const onVis = () => { if (document.visibilityState !== "visible") reveal(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", reveal);
    return () => {
      if (io) io.disconnect(); clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", reveal);
    };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

function SectionHead({ eyebrow, title, lead, center }) {
  return (
    <div className={`sec-head ${center ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </div>
  );
}

function Header({ t, lang, setLang, home = "" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);
  const h = (anchor) => (home ? `${home}${anchor}` : anchor);
  const links = [
    { href: "vehicle.html", label: t.nav.vehicle || t.nav.fleet },
    { href: h("#booking"), label: t.nav.booking },
    { href: "about.html", label: t.nav.about },
    { href: "vision.html", label: t.nav.vision },
    { href: "invest.html", label: t.nav.invest },
    { href: h("#contact"), label: t.nav.contact },
  ];
  return (
    <header className={`hdr ${scrolled || menu ? "scrolled" : ""}`}>
      <div className="container hdr-inner">
        <a href={home || "#top"} className="hdr-logo"><img src={(window.assetUrl||(x=>x))("assets/logo-ecowave.png")} alt="Ecowave Rental" style={{ height: 30 }} /></a>
        <nav className="hdr-nav">
          {links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="hdr-right">
          <div className="lang">
            {["nl", "fr", "en"].map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a className="btn btn-primary hdr-reserve" href={h("#booking")}><Icon name="calendar-check" />{t.hero.reserve}</a>
          <button className="hdr-burger" aria-label="Menu" onClick={() => setMenu(!menu)}>
            <Icon name={menu ? "x" : "menu"} />
          </button>
        </div>
      </div>

      <div className={`hdr-mobile ${menu ? "open" : ""}`}>
        <nav className="hdr-mobile-nav">
          {links.map((l, i) => <a key={i} href={l.href} onClick={() => setMenu(false)}>{l.label}<Icon name="arrow-right" style={{ width: 18, height: 18 }} /></a>)}
        </nav>
        <div className="hdr-mobile-foot">
          <div className="lang">
            {["nl", "fr", "en"].map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <a className="btn btn-primary btn-lg btn-block" href={h("#booking")} onClick={() => setMenu(false)}><Icon name="calendar-check" />{t.hero.reserve}</a>
        </div>
      </div>
    </header>
  );
}

function TrustStrip({ t }) {
  const items = [
    { icon: "calendar-x", b: t.trust.t1, s: t.trust.t1s },
    { icon: "message-circle", b: t.trust.t2, s: t.trust.t2s },
    { icon: "shield-check", b: t.trust.t3, s: t.trust.t3s },
    { icon: "badge-euro", b: t.trust.t4, s: t.trust.t4s },
  ];
  return (
    <div className="section-sm" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="container">
        <Reveal className="trust-strip">
          {items.map((it, i) => (
            <div className="trust-item" key={i}>
              <div className="ti-ic"><Icon name={it.icon} /></div>
              <div><b>{it.b}</b><span>{it.s}</span></div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

function Footer({ t, lang, home = "" }) {
  const D = window.ECOWAVE_DATA;
  const h = (anchor) => (home ? `${home}${anchor}` : anchor);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <img src={(window.assetUrl||(x=>x))("assets/logo-ecowave.png")} alt="Ecowave Rental" style={{ height: 42 }} />
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h5>{t.footer.explore}</h5>
            <ul>
              <li><a href="vehicle.html">{t.nav.vehicle}</a></li>
              <li><a href="about.html">{t.nav.about}</a></li>
              <li><a href="vision.html">{t.nav.vision}</a></li>
              <li><a href="invest.html">{t.nav.invest}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t.footer.contact}</h5>
            <ul>
              <li><a href={`https://wa.me/${D.whatsapp}`}>WhatsApp</a></li>
              <li><a href={`mailto:${D.email}`}>{D.email}</a></li>
              <li><a href={home ? `${home}#contact` : "#contact"}>Brussel · Antwerpen</a></li>
              <li><a href="legal.html">{t.footer.legal}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t.footer.legal}</h5>
            <ul>
              <li><a href="legal.html#terms">{t.footer.terms}</a></li>
              <li><a href="legal.html#privacy">{t.footer.privacy}</a></li>
              <li><a href="legal.html#legal">{t.footer.legalNotice}</a></li>
              <li><a href="legal.html#conditions">{t.nav.conditions || "Rental conditions"}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {D.company.legalName} · {t.footer.rights}</span>
          <span>{D.company.street}, {D.company.city} · BTW {D.company.vat}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Reveal, SectionHead, Header, TrustStrip, Footer, waUrl, openWhatsApp });
