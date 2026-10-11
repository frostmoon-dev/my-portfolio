import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Instrument Serif for the expressive headings, Manrope for reading,
// JetBrains Mono for timestamps, indexes and anything technical.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.atelier}` },
  description: site.description,
  authors: [{ name: `${site.name} (${site.fullName})` }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.atelier,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#0a1b42",
  colorScheme: "dark",
};

// Runs before first paint: returning visitors (this tab) and deep links skip the arrival veil.
const arrivalInit = `try{if(sessionStorage.getItem("atelier-visited")==="1"||location.hash)document.documentElement.dataset.visited="1"}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: arrivalInit }} />
        <noscript>
          <style>{`.veil{display:none!important}.stage .line,.stage-kicker{opacity:1!important;transform:none!important;filter:none!important}.envelope .stationery{transform:none!important;opacity:1!important}.envelope-open{display:none}`}</style>
        </noscript>
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
