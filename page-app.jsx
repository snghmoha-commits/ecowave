/* Ecowave Rental — generic content-page mount (About / Vision / Invest) */
function ContentPageApp({ page }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("ecowave_lang") || "nl");
  const setLang = (l) => { setLangState(l); localStorage.setItem("ecowave_lang", l); };
  const t = window.ECOWAVE_I18N[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const Page = { about: AboutPage, vision: VisionPage, invest: InvestPage }[page];
  return (
    <React.Fragment>
      <Header t={t} lang={lang} setLang={setLang} home="index.html" />
      <main><Page t={t} lang={lang} /></main>
      <Footer t={t} lang={lang} home="index.html" />
      <Chatbot t={t} lang={lang} />
    </React.Fragment>
  );
}
const _page = document.body.getAttribute("data-page") || "about";
ReactDOM.createRoot(document.getElementById("root")).render(<ContentPageApp page={_page} />);
