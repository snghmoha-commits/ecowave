/* Ecowave Rental — App root */
function App() {
  const [lang, setLangState] = useState(() => localStorage.getItem("ecowave_lang") || "nl");
  const setLang = (l) => { setLangState(l); localStorage.setItem("ecowave_lang", l); };
  const t = window.ECOWAVE_I18N[lang];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} lang={lang} />
        <StatBand t={t} lang={lang} />
        <PremiumInterior t={t} lang={lang} />
        <AMGFeatures t={t} lang={lang} />
        <FleetSection t={t} lang={lang} />
        <WhyChoose t={t} />
        <Process t={t} />
        <BookingSection t={t} lang={lang} />
        <Conditions t={t} />
        <DriverExperience t={t} />
        <Reviews t={t} lang={lang} />
        <Founders t={t} lang={lang} />
        <AIBand t={t} />
        <FAQ t={t} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <Chatbot t={t} lang={lang} />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
