// Site-wide constants: contact details + navigation.

export const CONTACT = {
  org: "thefutureworks",
  addressLines: [
    "Coventry University Campus",
    "Charles Ward Building (145)",
    "Cox Street, Coventry",
    "CV1 5FJ",
  ],
  phone: "+44 (0) 24 7615 8815",
  phoneHref: "tel:+442476158815",
  phoneShort: "02476 158815",
  email: "jobs@thefutureworks.co.uk",
  emailHref: "mailto:jobs@thefutureworks.co.uk",
  hours: ["Mon–Fri · 9:00am – 5:00pm", "Advice for employers is always free"],
  portalUrl: "https://portal.thefutureworks.co.uk",
} as const;

export interface NavSubItem {
  to: string;
  label: string;
  desc: string;
  icon: string;
}
export interface NavItem {
  to: string;
  label: string;
  sub?: NavSubItem[];
}

export const NAV: NavItem[] = [
  {
    to: "/vacancies",
    label: "Find work",
    sub: [
      { to: "/vacancies", label: "Browse all jobs", desc: "Live vacancies across the region", icon: "search" },
      { to: "/candidates", label: "For candidates", desc: "How we help you find work", icon: "users" },
      { to: "/apply", label: "Submit your CV", desc: "Apply for a live role", icon: "send" },
    ],
  },
  {
    to: "/employers",
    label: "Hire talent",
    sub: [
      { to: "/employers", label: "For employers", desc: "Permanent & temporary staffing", icon: "building" },
      { to: "/employers", label: "Our process", desc: "How we match and place", icon: "target" },
    ],
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    sub: [
      { to: "/dashboard", label: "Dashboard", desc: "Platform concept overview", icon: "chart" },
      { to: "/request-staff", label: "Request staff", desc: "Structured intake concept", icon: "building" },
      { to: "/dashboard/candidates", label: "Candidate dashboard", desc: "Synthetic candidate profiles", icon: "users" },
      { to: "/dashboard/employers", label: "Employer dashboard", desc: "Synthetic employer requests", icon: "briefcase" },
    ],
  },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];
