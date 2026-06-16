export interface PlatformRouteLink {
  href: string;
  label: string;
  description: string;
  icon: string;
}

export const platformRoutes: PlatformRouteLink[] = [
  {
    href: "/request-staff",
    label: "Request staff",
    description: "Structured employer intake scaffold for future brief capture.",
    icon: "building",
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Concept overview of demand, candidate readiness and match signals.",
    icon: "chart",
  },
  {
    href: "/dashboard/candidates",
    label: "Candidates",
    description: "Synthetic candidate profile cards for the v2 platform model.",
    icon: "users",
  },
  {
    href: "/dashboard/employers",
    label: "Employers",
    description: "Synthetic employer request and job record views.",
    icon: "briefcase",
  },
];
