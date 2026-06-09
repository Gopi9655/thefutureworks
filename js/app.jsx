/* global React, ReactDOM, Icon, Orb, Logo, Btn, go */
const { useState: useS, useEffect: useE, useRef: useR } = React;

/* ============================================================
   ROUTER
   ============================================================ */
function parseHash() {
  let h = window.location.hash.replace(/^#/, "");
  if (!h || h === "/") return { name: "home", param: null };
  const parts = h.split("/").filter(Boolean);
  if (parts[0] === "job") return { name: "job", param: parts[1] || null };
  return { name: parts[0], param: parts[1] || null };
}

function useRoute() {
  const [route, setRoute] = useS(parseHash());
  useE(() => {
    const on = () => {
      setRoute(parseHash());
      const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "auto" });
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

/* ============================================================
   NAV
   ============================================================ */
const NAV = [
  { label: "Candidates", to: "/candidates", sub: [
    { label: "For candidates", to: "/candidates", icon: "users", desc: "Find your next role" },
    { label: "How it works", to: "/candidate-how", icon: "compass", desc: "Your journey, step by step" },
    { label: "Skills assessment", to: "/skills", icon: "target", desc: "Discover your strengths" },
    { label: "Case studies", to: "/case-studies", icon: "doc", desc: "Real placement stories" },
  ]},
  { label: "Employers", to: "/employers", sub: [
    { label: "For employers", to: "/employers", icon: "building", desc: "Hire the right people" },
    { label: "How it works", to: "/employer-how", icon: "layers", desc: "Our supply process" },
    { label: "Our clients", to: "/clients", icon: "handshake", desc: "Who we work with" },
    { label: "Testimonials", to: "/testimonials", icon: "quote", desc: "What people say" },
  ]},
  { label: "Vacancies", to: "/vacancies" },
  { label: "About", to: "/about", sub: [
    { label: "About us", to: "/about", icon: "globe2", desc: "Our story & mission" },
    { label: "Accreditations", to: "/accreditations", icon: "shield", desc: "Standards we meet" },
    { label: "Contact", to: "/contact", icon: "mail", desc: "Talk to our team" },
  ]},
];

function Nav({ route }) {
  const [solid, setSolid] = useS(false);
  const [open, setOpen] = useS(false);
  useE(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useE(() => { setOpen(false); }, [route]);

  const active = (to) => "/" + (route.name === "home" ? "" : route.name) === to;

  return (
    <header className={"nav " + (solid || open ? "solid" : "")}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#/" aria-label="thefutureworks home"><Logo variant="light" size={21} /></a>

        <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="nav-desktop">
          {NAV.map((item) => (
            <div key={item.label} className={"has-flyout"} style={{ position: "relative" }}>
              <a href={"#" + item.to} className={"nav-link " + (active(item.to) ? "active" : "")} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {item.label}
                {item.sub && <Icon name="chevronDown" size={14} stroke={2} style={{ opacity: .6 }} />}
              </a>
              {item.sub && (
                <div className="flyout">
                  <div style={{ background: "#fff", border: "1px solid var(--paper-line)", borderRadius: "var(--radius)", padding: 8, width: 290, boxShadow: "0 24px 56px -18px rgba(8,12,24,.18), 0 4px 14px -6px rgba(8,12,24,.07)" }}>
                    {item.sub.map((s) => (
                      <a key={s.to} href={"#" + s.to} style={{ display: "flex", gap: 12, padding: "11px 12px", borderRadius: 12, alignItems: "center", transition: "background .15s", textDecoration: "none" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "var(--paper-2)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                        <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(30,111,184,.09)", flex: "0 0 auto" }}>
                          <Icon name={s.icon} size={18} style={{ color: "var(--g-blue)" }} />
                        </span>
                        <span>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--t-ink)" }}>{s.label}</span>
                          <span style={{ display: "block", fontSize: 12, color: "var(--t-ink-mut)", marginTop: 1 }}>{s.desc}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="nav-cta">
          <a href="https://portal.thefutureworks.co.uk" target="_blank" rel="noopener" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="external" size={15} stroke={1.8} /> Portal
          </a>
          <Btn to="/vacancies" variant="primary" size="sm" icon="arrowRight">Find jobs</Btn>
        </div>

        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu"
          style={{ display: "none", background: "transparent", border: "1px solid var(--paper-line)", borderRadius: 10, width: 42, height: 42, color: "var(--t-ink)", placeItems: "center", cursor: "pointer" }}>
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="nav-mobile" style={{ background: "rgba(8,12,22,.97)", borderTop: "1px solid var(--line)", padding: "8px 20px 26px" }}>
          {NAV.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid var(--line)" }}>
              <a href={"#" + item.to} style={{ display: "block", padding: "15px 4px", color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18 }}>{item.label}</a>
              {item.sub && (
                <div style={{ paddingBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {item.sub.slice(1).map((s) => (
                    <a key={s.to} href={"#" + s.to} className="chip on-dark">{s.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <Btn to="/vacancies" variant="primary" icon="arrowRight" style={{ flex: 1 }}>Find jobs</Btn>
            <Btn href="https://portal.thefutureworks.co.uk" variant="ghost" icon="external">Portal</Btn>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const col = (title, links) => (
    <div>
      <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-on-dark-dim)", marginBottom: 16 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {links.map((l) => <a key={l.label} href={"#" + l.to} className="footer-link">{l.label}</a>)}
      </div>
    </div>
  );
  return (
    <footer className="ink-deep" style={{ position: "relative", overflow: "hidden", paddingTop: 72 }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40 }} className="footer-grid">
          <div>
            <Logo variant="dark" size={24} withTagline />
            <p className="t-mut" style={{ maxWidth: 320, marginTop: 20, fontSize: 14.5, lineHeight: 1.6 }}>
              A commercial recruitment agency owned by Coventry University. Helping candidates and employers across Coventry, Warwickshire and the West Midlands since 2005.
            </p>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7, fontSize: 14 }}>
              <a href={CONTACT.phoneHref} className="footer-link" style={{ display: "inline-flex", gap: 9, alignItems: "center" }}><Icon name="phone" size={15} style={{ color: "var(--g-green)" }} /> {CONTACT.phone}</a>
              <a href={CONTACT.emailHref} className="footer-link" style={{ display: "inline-flex", gap: 9, alignItems: "center" }}><Icon name="mail" size={15} style={{ color: "var(--g-green)" }} /> {CONTACT.email}</a>
              <span className="t-mut" style={{ display: "inline-flex", gap: 9, alignItems: "flex-start", fontSize: 13.5 }}><Icon name="mapPin" size={15} style={{ color: "var(--g-green)", flex: "0 0 auto", marginTop: 2 }} /> Charles Ward Building (145), Cox Street, Coventry, CV1 5FJ</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {[["linkedin", "thefutureworks on LinkedIn"], ["external", "Visit our main website"]].map(([ic, label], i) => (
                <a key={i} href="#/contact" aria-label={label} style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, border: "1px solid var(--line-2)", color: "#fff", transition: "background .2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,.07)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <Icon name={ic} size={18} />
                </a>
              ))}
            </div>
          </div>
          {col("Candidates", [
            { label: "Find jobs", to: "/vacancies" }, { label: "How it works", to: "/candidate-how" },
            { label: "Skills assessment", to: "/skills" }, { label: "Submit your CV", to: "/candidates" },
          ])}
          {col("Employers", [
            { label: "Hire staff", to: "/employers" }, { label: "Our process", to: "/employer-how" },
            { label: "Our clients", to: "/clients" }, { label: "Case studies", to: "/case-studies" },
          ])}
          {col("Company", [
            { label: "About us", to: "/about" }, { label: "Accreditations", to: "/accreditations" },
            { label: "Testimonials", to: "/testimonials" }, { label: "Contact", to: "/contact" },
          ])}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 56, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--t-on-dark-dim)", letterSpacing: ".08em", textTransform: "uppercase" }}>Accredited & trusted</span>
          {["REC Member", "BIOR Member", "Coventry University-owned"].map((b) => (
            <span key={b} className="chip on-dark" style={{ fontSize: 12 }}>{b}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14, padding: "26px 0 34px", color: "var(--t-on-dark-dim)", fontSize: 13 }}>
          <span>© {new Date().getFullYear()} thefutureworks. Part of the Coventry University Group.</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a href="#/about" className="footer-link">Privacy</a>
            <a href="#/about" className="footer-link">Terms</a>
            <a href="#/accreditations" className="footer-link">Modern Slavery</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   MOBILE CTA BAR — sticky bottom on small screens
   ============================================================ */
function MobileCTABar() {
  return (
    <div className="mobile-cta-bar">
      <Btn to="/vacancies" variant="primary" icon="arrowRight" style={{ flex: 1, justifyContent: "center" }}>Find Jobs</Btn>
      <Btn to="/employers" variant="outline" iconLeft="building" style={{ flex: 1, justifyContent: "center" }}>Hire Staff</Btn>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const route = useRoute();
  const PAGES = window.PAGES || {};
  let Page = PAGES[route.name];
  if (route.name === "job") Page = PAGES["job"];
  if (!Page) Page = PAGES["home"];

  return (
    <>
      <a href="#main-content" className="skip-link"
        onClick={(e) => { e.preventDefault(); const m = document.getElementById("main-content"); if (m) m.focus(); }}>
        Skip to main content
      </a>
      <Nav route={route} />
      <main id="main-content" tabIndex={-1} style={{ outline: "none" }} key={route.name + (route.param || "")}>
        <Page param={route.param} />
      </main>
      <Footer />
      <MobileCTABar />
      {window.TweaksRoot && <window.TweaksRoot />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

Object.assign(window, { App });
