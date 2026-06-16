import Link from "next/link";
import { Logo } from "./primitives";
import { Icon } from "./Icon";

const COLS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Candidates",
    links: [
      { label: "Find jobs", to: "/vacancies" },
      { label: "For candidates", to: "/candidates" },
      { label: "Submit your CV", to: "/apply" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Hire staff", to: "/employers" },
      { label: "Request staff", to: "/request-staff" },
      { label: "Our process", to: "/employers" },
      { label: "Our clients", to: "/about" },
    ],
  },
  {
    title: "Platform concept",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Candidate dashboard", to: "/dashboard/candidates" },
      { label: "Employer dashboard", to: "/dashboard/employers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Accreditations", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

import { CONTACT } from "@/data/site";

export function Footer() {
  return (
    <footer className="ink-deep" style={{ position: "relative", overflow: "hidden", paddingTop: 72 }}>
      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 34 }} className="footer-grid">
          <div>
            <Logo variant="dark" size={24} withTagline />
            <p className="t-mut" style={{ maxWidth: 320, marginTop: 20, fontSize: 14.5, lineHeight: 1.6 }}>
              A commercial recruitment agency owned by Coventry University. Helping candidates and employers across Coventry, Warwickshire and the West Midlands since 2005.
            </p>
            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7, fontSize: 14 }}>
              <a href={CONTACT.phoneHref} className="footer-link" style={{ display: "inline-flex", gap: 9, alignItems: "center" }}>
                <Icon name="phone" size={15} style={{ color: "var(--g-green)" }} /> {CONTACT.phone}
              </a>
              <a href={CONTACT.emailHref} className="footer-link" style={{ display: "inline-flex", gap: 9, alignItems: "center" }}>
                <Icon name="mail" size={15} style={{ color: "var(--g-green)" }} /> {CONTACT.email}
              </a>
              <span className="t-mut" style={{ display: "inline-flex", gap: 9, alignItems: "flex-start", fontSize: 13.5 }}>
                <Icon name="mapPin" size={15} style={{ color: "var(--g-green)", flex: "0 0 auto", marginTop: 2 }} /> Charles Ward Building (145), Cox Street, Coventry, CV1 5FJ
              </span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              {[["linkedin", "thefutureworks on LinkedIn"], ["external", "Visit our main website"]].map(([ic, label]) => (
                <a key={ic} href={CONTACT.portalUrl} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, border: "1px solid var(--line-2)", color: "#fff" }}>
                  <Icon name={ic} size={18} />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t-on-dark-dim)", marginBottom: 16 }}>{c.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {c.links.map((l) => <Link key={l.label} href={l.to} className="footer-link">{l.label}</Link>)}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 56, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--t-on-dark-dim)", letterSpacing: ".08em", textTransform: "uppercase" }}>Accredited &amp; trusted</span>
          {["REC Member", "BIOR Member", "Coventry University-owned"].map((b) => (
            <span key={b} className="chip on-dark" style={{ fontSize: 12 }}>{b}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 14, padding: "26px 0 34px", color: "var(--t-on-dark-dim)", fontSize: 13 }}>
          <span>© {new Date().getFullYear()} thefutureworks. Part of the Coventry University Group.</span>
          <span style={{ display: "flex", gap: 22 }}>
            <Link href="/about" className="footer-link">Privacy</Link>
            <Link href="/about" className="footer-link">Terms</Link>
            <Link href="/about" className="footer-link">Modern Slavery</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
