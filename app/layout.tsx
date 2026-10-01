import type { Metadata, Viewport } from "next";
import { Figtree, Taviraj } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

// Headings use Taviraj 600 (preloaded); the italic is only for small
// asides, so it loads later.
const taviraj = Taviraj({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-display",
  display: "swap",
});

const tavirajItalic = Taviraj({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-display-italic",
  display: "swap",
  preload: false,
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: `${site.name} (${site.fullName})` }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} · ${site.handle}`,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7F7" },
    { media: "(prefers-color-scheme: dark)", color: "#1C1714" },
  ],
};

// Runs before first paint so a saved theme never flashes the wrong colours.
const themeInit = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${taviraj.variable} ${tavirajItalic.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
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
