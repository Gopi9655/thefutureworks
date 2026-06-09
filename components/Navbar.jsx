/* Navbar — sticky nav with flyouts + mobile menu */
function Nav({ route }) {
  const [solid, setSolid] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(function() {
    var on = function() { setSolid(window.scrollY > 24); };
    on(); window.addEventListener("scroll", on, { passive: true });
    return function() { window.removeEventListener("scroll", on); };
  }, []);
  React.useEffect(function() { setOpen(false); }, [route]);

  var active = function(to) { return "/" + (route.name === "home" ? "" : route.name) === to; };

  var handleKey = function(e) { if (e.key === "Escape" && open) { setOpen(false); e.currentTarget.querySelector(".nav-burger").focus(); } };

  return (
    <header className={"nav " + (solid || open ? "solid" : "")} onKeyDown={handleKey}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#/" aria-label="thefutureworks home"><Logo variant="dark" size={21} /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="nav-desktop" aria-label="Main navigation">
          {NAV.map(function(item) {
            return (
              <div key={item.label} className="has-flyout" style={{ position: "relative" }}>
                <a href={"#" + item.to} className={"nav-link " + (active(item.to) ? "active" : "")}
                  aria-current={active(item.to) ? "page" : undefined}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {item.label}
                  {item.sub && <Icon name="chevronDown" size={14} stroke={2} style={{ opacity: .6 }} />}
                </a>
                {item.sub && (
                  <div className="flyout" role="menu" aria-label={item.label + " submenu"}>
                    <div className="glass" style={{ padding: 10, width: 290, boxShadow: "0 30px 70px -30px rgba(0,0,0,.7)" }}>
                      {item.sub.map(function(s) {
                        return (
                          <a key={s.to} href={"#" + s.to} role="menuitem"
                            style={{ display: "flex", gap: 12, padding: "11px 12px", borderRadius: 12, alignItems: "center", transition: "background .15s" }}
                            onMouseEnter={function(e) { e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}
                            onMouseLeave={function(e) { e.currentTarget.style.background = "transparent"; }}>
                            <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(225,29,42,.12)", flex: "0 0 auto" }}>
                              <Icon name={s.icon} size={18} style={{ color: "var(--red-400)" }} />
                            </span>
                            <span>
                              <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "#fff" }}>{s.label}</span>
                              <span style={{ display: "block", fontSize: 12, color: "var(--t-on-dark-mut)", marginTop: 1 }}>{s.desc}</span>
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="nav-cta">
          <a href="https://portal.thefutureworks.co.uk" target="_blank" rel="noopener" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="external" size={15} stroke={1.8} /> Portal
          </a>
          <Btn to="/vacancies" variant="primary" size="sm" icon="arrowRight">Find jobs</Btn>
        </div>
        <button className="nav-burger" onClick={function() { setOpen(!open); }}
          aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
          style={{ display: "none", background: "transparent", border: "1px solid var(--line-2)", borderRadius: 10, width: 42, height: 42, color: "#fff", placeItems: "center", cursor: "pointer" }}>
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>
      {open && (
        <nav className="nav-mobile" aria-label="Mobile navigation" style={{ background: "rgba(8,12,22,.97)", borderTop: "1px solid var(--line)", padding: "8px 20px 26px" }}>
          {NAV.map(function(item) {
            return (
              <div key={item.label} style={{ borderBottom: "1px solid var(--line)" }}>
                <a href={"#" + item.to} style={{ display: "block", padding: "15px 4px", color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18 }}>{item.label}</a>
                {item.sub && (
                  <div style={{ paddingBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {item.sub.slice(1).map(function(s) { return <a key={s.to} href={"#" + s.to} className="chip on-dark">{s.label}</a>; })}
                  </div>
                )}
              </div>
            );
          })}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <Btn to="/vacancies" variant="primary" icon="arrowRight" style={{ flex: 1 }}>Find jobs</Btn>
            <Btn href="https://portal.thefutureworks.co.uk" variant="ghost" icon="external">Portal</Btn>
          </div>
        </nav>
      )}
    </header>
  );
}
Object.assign(window, { Nav });
