import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/SkipLink";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTABar } from "@/components/MobileCTABar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "thefutureworks — Jobs for your future",
    template: "%s · thefutureworks",
  },
  description:
    "Coventry University's own recruitment agency. Find jobs and hire staff across Coventry, Warwickshire and the West Midlands.",
  metadataBase: new URL("https://www.thefutureworks.co.uk"),
  openGraph: {
    title: "thefutureworks — Jobs for your future",
    description: "Coventry University-owned recruitment across the West Midlands.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body>
        <SkipLink />
        <Navbar />
        <main id="main-content" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Footer />
        <MobileCTABar />
      </body>
    </html>
  );
}
