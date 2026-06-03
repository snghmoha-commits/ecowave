/* Ecowave Admin — app shell: login (Supabase Auth), sidebar, router */
function App() {
  const [authed, setAuthed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState("overview");
  const [openNew, setOpenNew] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  // restore session + load data on mount
  useEffect(() => {
    (async () => {
      try {
        const s = await window.DB.currentSession();
        if (s) { await window.DB.loadAll(); setAuthed(true); }
      } catch (e) {}
      setLoaded(true);
    })();
  }, []);

  async function onAuthed() {
    try { await window.DB.loadAll(); } catch (e) { toast("Erreur de chargement des données"); }
    setAuthed(true);
  }
  async function logout() { try { await window.DB.signOut(); } catch (e) {} setAuthed(false); }

  function go(v, arg) {
    setView(v);
    setOpenNew(v === "bookings" && arg === "new");
    setSideOpen(false);
  }

  const A = window.ADMIN;
  const pending = authed ? A.bookings.filter(b => b.status === "pending").length : 0;
  const nav = [
    { k: "overview", label: "Tableau de bord", icon: "layout-dashboard" },
    { k: "bookings", label: "Réservations", icon: "calendar-check", badge: pending },
    { k: "calendar", label: "Disponibilités", icon: "calendar-x" },
    { k: "customers", label: "Clients", icon: "users" },
    { k: "revenue", label: "Revenus", icon: "trending-up" },
    { k: "vehicles", label: "Véhicules", icon: "car-front" },
  ];
  const titles = { overview: "Tableau de bord", bookings: "Réservations", calendar: "Disponibilités", customers: "Clients", revenue: "Revenus & statistiques", vehicles: "Véhicules" };

  if (!loaded) return <div id="login"><div style={{ color: "#fff", fontFamily: "var(--font-d)", fontSize: 18 }}>Chargement…</div></div>;
  if (!authed) return <Login onAuthed={onAuthed} />;

  return (
    <div className="layout">
      <div className={"scrim" + (sideOpen ? " show" : "")} onClick={() => setSideOpen(false)}></div>
      <aside className={"sidebar" + (sideOpen ? " open" : "")}>
        <div className="side-logo">
          <img src="../assets/logo-ecowave.png" alt="Ecowave Rental" style={{ height: 30 }} />
          <span className="side-admin-tag">Admin</span>
        </div>
        <div className="nav-group">Gestion</div>
        {nav.slice(0, 4).map(n => (
          <button key={n.k} className={"nav-item" + (view === n.k ? " active" : "")} onClick={() => go(n.k)}>
            <Icon name={n.icon} />{n.label}{n.badge > 0 && <span className="badge">{n.badge}</span>}
          </button>
        ))}
        <div className="nav-group">Business</div>
        {nav.slice(4).map(n => (
          <button key={n.k} className={"nav-item" + (view === n.k ? " active" : "")} onClick={() => go(n.k)}><Icon name={n.icon} />{n.label}</button>
        ))}
        <div className="side-foot">
          <div className="side-user">
            <div className="av">EW</div>
            <div style={{ flex: 1 }}><div className="nm">Ecowave Admin</div><div className="rl">Propriétaire</div></div>
            <button className="side-logout" title="Déconnexion" onClick={logout}><Icon name="log-out" /></button>
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <button className="burger" onClick={() => setSideOpen(true)}><Icon name="menu" /></button>
            <h1>{titles[view]}</h1>
          </div>
          <div className="right">
            <span className="pill-live"><span className="dot"></span>Site en ligne</span>
            <a className="btn-ghost" href="../index.html" target="_blank"><Icon name="external-link" />Voir le site</a>
          </div>
        </div>
        <div className="content">
          {view === "overview" && <Overview go={go} />}
          {view === "bookings" && <Bookings openNew={openNew} />}
          {view === "calendar" && <CalView />}
          {view === "customers" && <Customers />}
          {view === "revenue" && <Revenue />}
          {view === "vehicles" && <Vehicles />}
        </div>
      </div>
    </div>
  );
}

function Login({ onAuthed }) {
  const [email, setEmail] = useState("admin@ecowaverental.be");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit() {
    setErr(""); setBusy(true);
    try { await window.DB.signIn(email.trim(), pwd); onAuthed(); }
    catch (e) { setErr("Email ou mot de passe incorrect."); setBusy(false); }
  }
  return (
    <div id="login">
      <div className="login-card">
        <div className="login-logo"><span className="wave-logo"><img src="../assets/logo-ecowave.png" alt="Ecowave Rental" style={{ height: 30 }} /></span></div>
        <div className="sub">Espace d'administration</div>
        <div className="fld"><label>Email</label><div className="inp"><Icon name="mail" /><input value={email} onChange={e => setEmail(e.target.value)} /></div></div>
        <div className="fld"><label>Mot de passe</label><div className="inp"><Icon name="lock" /><input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="••••••••" /></div></div>
        {err && <div style={{ color: "var(--danger)", fontSize: 12.5, fontWeight: 600, marginBottom: 12, textAlign: "left" }}>{err}</div>}
        <button className="btn-primary" onClick={submit} disabled={busy}><Icon name="log-in" />{busy ? "Connexion…" : "Se connecter"}</button>
        <div className="login-hint">Accès réservé — Ecowave Rental</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
