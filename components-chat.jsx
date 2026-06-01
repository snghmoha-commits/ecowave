/* Ecowave Rental — Floating AI chatbot widget (UI recreation, canned answers) */
function Chatbot({ t, lang }) {
  const D = window.ECOWAVE_DATA;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ from: "bot", text: t.chat.greeting }]);
  const [val, setVal] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("ecowave-open-chat", openChat);
    return () => window.removeEventListener("ecowave-open-chat", openChat);
  }, []);
  useEffect(() => { setMsgs([{ from: "bot", text: t.chat.greeting }]); }, [lang]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, open]);

  function answer(q) {
    const s = q.toLowerCase();
    const A = {
      nl: {
        avail: "De wagen is meestal beschikbaar — bekijk de kalender hierboven voor live data. Gereserveerde dagen zijn doorstreept.",
        price: `De ${D.vehicle.name} kost €${D.vehicle.pricePerDay}/24u, €${D.vehicle.priceWeekend}/weekend of €${D.vehicle.priceWeek}/week. Maandprijs op aanvraag. Inclusief ${D.vehicle.kmPerDay} km/dag, extra km €0,50/km.`,
        cond: "Min. leeftijd 20 jaar, rijbewijs sinds 1 jaar. Waarborg €50 (1 dag) of €100 (2+ dagen), cash of overschrijving.",
        book: "Reserveren gaat in 2 minuten: kies je data in de kalender en bevestig via WhatsApp.",
        fb: "Goede vraag! Voor details kun je ons direct bereiken via WhatsApp.",
      },
      fr: {
        avail: "Le véhicule est généralement disponible — consultez le calendrier ci-dessus. Les jours réservés sont barrés.",
        price: `La ${D.vehicle.name} coûte ${D.vehicle.pricePerDay} €/24h, ${D.vehicle.priceWeekend} €/week-end ou ${D.vehicle.priceWeek} €/semaine. Tarif mensuel sur demande. ${D.vehicle.kmPerDay} km/jour inclus, km supplémentaire 0,50 €/km.`,
        cond: "Âge min. 20 ans, permis depuis 1 an. Caution 50 € (1 jour) ou 100 € (2+ jours), espèces ou virement.",
        book: "Réservez en 2 minutes : choisissez vos dates dans le calendrier et confirmez via WhatsApp.",
        fb: "Bonne question ! Pour plus de détails, contactez-nous via WhatsApp.",
      },
      en: {
        avail: "The vehicle is usually available — check the calendar above for live data. Booked days are struck through.",
        price: `The ${D.vehicle.name} is €${D.vehicle.pricePerDay}/24h, €${D.vehicle.priceWeekend}/weekend or €${D.vehicle.priceWeek}/week. Monthly rate on request. Includes ${D.vehicle.kmPerDay} km/day, extra distance €0.50/km.`,
        cond: "Min. age 20, licence held 1 year. Deposit €50 (1 day) or €100 (2+ days), cash or bank transfer.",
        book: "Booking takes 2 minutes: pick your dates in the calendar and confirm via WhatsApp.",
        fb: "Great question! For specifics you can reach us directly on WhatsApp.",
      },
    }[lang];
    if (/(beschik|dispo|avail|date|kalender|calend)/.test(s)) return A.avail;
    if (/(prijs|prix|price|cost|kost|euro|€|dag|day|jour)/.test(s)) return A.price;
    if (/(voorwaard|condition|waarborg|caution|deposit|leeftijd|age|âge|km|verzeker|insur|assur)/.test(s)) return A.cond;
    if (/(reserv|book|réserv|whatsapp)/.test(s)) return A.book;
    return A.fb;
  }

  function send(text) {
    const q = (text || val).trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setVal("");
    setTimeout(() => setMsgs((m) => [...m, { from: "bot", text: answer(q) }]), 480);
  }

  return (
    <div className="chat-fab">
      {open && (
        <div className="chat-panel">
          <div className="chat-top">
            <div className="ava"><Icon name="sparkles" /></div>
            <div>
              <b>{t.chat.title}</b>
              <span><span className="on"></span>{t.chat.status}</span>
            </div>
            <button className="x" onClick={() => setOpen(false)}><Icon name="x" style={{ width: 16, height: 16 }} /></button>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {msgs.map((m, i) => <div key={i} className={`msg ${m.from}`}>{m.text}</div>)}
          </div>
          <div className="chat-chips">
            <button className="chat-chip" onClick={() => send(t.chat.c1)}>{t.chat.c1}</button>
            <button className="chat-chip" onClick={() => send(t.chat.c2)}>{t.chat.c2}</button>
            <button className="chat-chip" onClick={() => send(t.chat.c3)}>{t.chat.c3}</button>
          </div>
          <div className="chat-input">
            <input value={val} onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()} placeholder={t.chat.ph} />
            <button onClick={() => send()}><Icon name="arrow-up" style={{ width: 18, height: 18 }} /></button>
          </div>
          <div className="chat-powered">{t.chat.powered}</div>
        </div>
      )}
      <a className="fab fab-wa" href={`https://wa.me/${D.whatsapp}`} target="_blank" rel="noreferrer" title="WhatsApp">
        <Icon name="message-circle" />
      </a>
      <button className="fab fab-chat" onClick={() => setOpen(!open)} title={t.chat.title}>
        <Icon name={open ? "chevron-down" : "sparkles"} />
      </button>
    </div>
  );
}
Object.assign(window, { Chatbot });
