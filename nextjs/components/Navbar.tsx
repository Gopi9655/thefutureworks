"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./primitives";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { NAV, CONTACT } from "@/data/site";

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // close the mobile menu on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  const active = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(to));

  return (
    <header className={"nav " + (solid || open ? "solid" : "")}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link href="/" aria-label="thefutureworks home"><Logo variant="light" size={21} /></Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 30 }} className="nav-desktop" aria-label="Primary">
          {NAV.map((item) => (
            <div key={item.label} className="has-flyout" style={{ position: "relative" }}>
              <Link href={item.to} className={"nav-link " + (active(item.to) ? "active" : "")} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                {item.label}
                {item.sub && <Icon name="chevronDown" size={14} stroke={2} style={{ opacity: 0.6 }} />}
              </Link>
              {item.sub && (
                <div className="flyout">
                  <div style={{ background: "#fff", border: "1px solid var(--paper-line)", borderRadius: "var(--radius)", padding: 8, width: 290, boxShadow: "0 24px 56px -18px rgba(8,12,24,.18), 0 4px 14px -6px rgba(8,12,24,.07)" }}>
                    {item.sub.map((s, i) => (
                      <Link key={i} href={s.to} style={{ display: "flex", gap: 12, padding: "11px 12px", borderRadius: 12, alignItems: "center", textDecoration: "none" }}>
                        <span style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(30,111,184,.09)", flex: "0 0 auto" }}>
                          <Icon name={s.icon} size={18} style={{ color: "var(--g-blue)" }} />
                        </span>
                        <span>
                          <span style={{ display: "block", fontWeight: 700, fontSize: 14, color: "var(--t-ink)" }}>{s.label}</span>
                          <span style={{ display: "block", fontSize: 12, color: "var(--t-ink-mut)", marginTop: 1 }}>{s.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="nav-cta">
          <a href={CONTACT.portalUrl} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Icon name="external" size={15} stroke={1.8} /> Portal
          </a>
          <Button to="/vacancies" variant="primary" size="sm" icon="arrowRight">Find jobs</Button>
        </div>

        <button
          className="nav-burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{ display: "none", background: "transparent", border: "1px solid var(--paper-line)", borderRadius: 10, width: 42, height: 42, color: "var(--t-ink)", placeItems: "center", cursor: "pointer" }}
        >
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="nav-mobile" style={{ background: "rgba(8,12,22,.97)", borderTop: "1px solid var(--line)", padding: "8px 20px 26px" }}>
          {NAV.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid var(--line)" }}>
              <Link href={item.to} style={{ display: "block", padding: "15px 4px", color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18 }}>{item.label}</Link>
              {item.sub && (
                <div style={{ paddingBottom: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {item.sub.slice(1).map((s, i) => (
                    <Link key={i} href={s.to} className="chip on-dark">{s.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <Button to="/vacancies" variant="primary" icon="arrowRight" style={{ flex: 1 }}>Find jobs</Button>
            <Button href={CONTACT.portalUrl} variant="ghost" icon="external">Portal</Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
