import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// One family for everything. Atkinson Hyperlegible Next was drawn by the
// Braille Institute so letters that look alike (I l 1, O 0, rn m) stay
// distinct. It is variable (200-800), so headings get weight, not a second
// font. The mono sibling sets numbers, dates and code.
// Next.js has no metrics for this font, so it cannot build a size-adjusted
// fallback. Verdana is close in width and x-height, which keeps the swap calm.
const sans = Atkinson_Hyperlegible_Next({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Verdana", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const mono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
  adjustFontFallback: false,
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
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: arrivalInit }} />
        <noscript>
          <style>{`.veil{display:none!important}.envelope .stationery{transform:none!important;opacity:1!important}.envelope-open{display:none}`}</style>
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
