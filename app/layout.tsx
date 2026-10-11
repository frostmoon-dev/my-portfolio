import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Atkinson_Hyperlegible_Mono, Newsreader } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Frosted Ledger type: Newsreader for display (strong italics), Atkinson
// Hyperlegible for reading at 17px, and its mono sibling for numbers and code.
const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
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
  themeColor: "#eaf2f3",
  colorScheme: "light",
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
