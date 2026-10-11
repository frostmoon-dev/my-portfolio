import { atelierObjects } from "@/content/atelier";
import type { AtelierObjectId } from "@/content/types";

// The atelier as a flat painting. It is the first thing that renders, the
// fallback when WebGL is missing or reduced motion is on, and works without
// JavaScript: every object is a real link.

const info = new Map(atelierObjects.map((o) => [o.id, o]));

function Spot({ id, children }: { id: AtelierObjectId; children: React.ReactNode }) {
  const o = info.get(id)!;
  return (
    <a href={`#${o.target}`} className="poster-spot" aria-label={`${o.name}: ${o.label}`}>
      <title>{`${o.name} — ${o.label}`}</title>
      {children}
    </a>
  );
}

const books = [
  [180, 26, 120, "#22355f"], [208, 18, 104, "#a3ad91"], [228, 30, 126, "#2d6ac8"], [262, 22, 112, "#e8ddc9"],
  [290, 16, 96, "#7b4652"], [310, 28, 120, "#3b4f80"], [342, 22, 108, "#d7b06a"], [368, 24, 118, "#6f7a62"],
];

export function AtelierPoster() {
  return (
    <svg className="atelier-poster" viewBox="-280 0 1880 1000" preserveAspectRatio="xMidYMid slice" role="group" aria-label="An illustration of the midnight atelier. Each object opens a section.">
      <defs>
        <linearGradient id="p-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c1d47" />
          <stop offset="1" stopColor="#14295e" />
        </linearGradient>
        <linearGradient id="p-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#071231" />
          <stop offset="0.6" stopColor="#12285a" />
          <stop offset="1" stopColor="#3b3d58" />
        </linearGradient>
        <radialGradient id="p-lamp" cx="0.36" cy="0.62" r="0.42">
          <stop offset="0" stopColor="#ffcf94" stopOpacity="0.42" />
          <stop offset="0.5" stopColor="#ffcf94" stopOpacity="0.1" />
          <stop offset="1" stopColor="#ffcf94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="p-screen" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8fc4ff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#8fc4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="p-moon" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.35" stopColor="#a9dcff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#a9dcff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="p-window">
          <rect x="560" y="110" width="600" height="440" />
        </clipPath>
      </defs>

      <rect x="-280" width="1880" height="1000" fill="url(#p-wall)" />
      <rect x="-280" y="900" width="1880" height="100" fill="#0b1636" />
      <ellipse cx="900" cy="950" rx="620" ry="60" fill="#1d2f5a" opacity="0.7" />

      {/* window */}
      <Spot id="window">
        <g clipPath="url(#p-window)">
          <rect x="560" y="110" width="600" height="440" fill="url(#p-sky)" />
          <circle cx="1040" cy="190" r="70" fill="url(#p-moon)" />
          <circle cx="1040" cy="190" r="28" fill="#e8ddc9" />
          <circle cx="1052" cy="184" r="26" fill="#0d1f4b" opacity="0.85" />
          <g stroke="#a9dcff" strokeWidth="1.5" opacity="0.6">
            <line x1="600" y1="300" x2="660" y2="250" />
            <line x1="660" y1="250" x2="730" y2="275" />
            <line x1="730" y1="275" x2="790" y2="210" />
            <line x1="790" y1="210" x2="860" y2="240" strokeDasharray="5 6" />
            <line x1="860" y1="240" x2="920" y2="180" strokeDasharray="5 6" />
          </g>
          <g fill="#e8ddc9">
            <circle cx="600" cy="300" r="4" />
            <circle cx="660" cy="250" r="4" />
            <circle cx="730" cy="275" r="4" />
            <circle cx="790" cy="210" r="4" />
          </g>
          <g fill="none" stroke="#a9dcff">
            <circle cx="860" cy="240" r="5" />
            <circle cx="920" cy="180" r="5" />
          </g>
          <path d="M560 560 V430 h40 v-60 h50 v90 h30 v-130 h60 v150 h40 v-70 h70 v80 h40 v-120 h55 v110 h35 v-50 h60 v70 h45 v-100 h55 v170 Z" fill="#0a1532" />
          <g fill="#ffd9a0" opacity="0.8">
            <rect x="612" y="392" width="8" height="10" />
            <rect x="700" y="340" width="8" height="10" />
            <rect x="716" y="380" width="8" height="10" />
            <rect x="842" y="440" width="8" height="10" />
            <rect x="912" y="350" width="8" height="10" />
            <rect x="1058" y="430" width="8" height="10" />
            <rect x="1110" y="420" width="8" height="10" fill="#a9dcff" />
          </g>
          <g className="poster-rain" stroke="#cfe6ff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4">
            {Array.from({ length: 22 }, (_, i) => (
              <line key={i} x1={575 + i * 27} y1={120 + ((i * 53) % 300)} x2={575 + i * 27} y2={150 + ((i * 53) % 300)} />
            ))}
          </g>
        </g>
        <g fill="#23345f">
          <rect x="550" y="100" width="620" height="12" />
          <rect x="550" y="100" width="12" height="460" />
          <rect x="1158" y="100" width="12" height="460" />
          <rect x="855" y="110" width="8" height="440" />
          <rect x="560" y="335" width="600" height="8" />
        </g>
        <rect x="530" y="550" width="660" height="18" rx="4" fill="#c9bda6" />
      </Spot>

      {/* curtain */}
      <path d="M470 90 C 500 300, 470 500, 500 640 L 560 640 C 540 500, 560 300, 548 90 Z" fill="#22355f" />

      {/* cat on the sill */}
      <g fill="#2a2f45">
        <ellipse cx="640" cy="532" rx="50" ry="22" />
        <circle cx="682" cy="526" r="16" />
        <path d="M672 514 l4 -14 l8 12 Z M688 512 l6 -12 l4 14 Z" />
      </g>
      {/* plant */}
      <g>
        <path d="M1090 550 l-6 -36 h44 l-6 36 Z" fill="#9a6a58" />
        <g fill="#7f9172">
          <path d="M1106 516 C 1080 480, 1070 470, 1062 450 C 1090 462, 1100 480, 1106 516" />
          <path d="M1106 516 C 1110 470, 1120 455, 1130 440 C 1132 470, 1120 490, 1106 516" />
          <path d="M1106 516 C 1130 495, 1150 490, 1160 480 C 1150 505, 1130 512, 1106 516" />
        </g>
      </g>

      {/* bookshelf */}
      <Spot id="bookshelf">
        <rect x="150" y="170" width="270" height="760" fill="#33282a" />
        {[300, 470, 640, 810].map((y) => (
          <g key={y}>
            <rect x="160" y={y} width="250" height="12" fill="#4a3a35" />
            {books.map(([x, w, h, c], i) => (
              <rect key={i} x={x as number} y={y - (h as number)} width={w as number} height={h as number} fill={c as string} opacity={0.85 + (i % 3) * 0.05} />
            ))}
          </g>
        ))}
      </Spot>

      {/* desk */}
      <rect x="380" y="640" width="1050" height="30" rx="6" fill="#4a3a35" />
      <rect x="400" y="670" width="22" height="260" fill="#33282a" />
      <Spot id="drawer">
        <rect x="1220" y="670" width="190" height="260" fill="#33282a" />
        <rect x="1232" y="684" width="166" height="96" rx="4" fill="#6b5446" />
        <rect x="1290" y="726" width="50" height="8" rx="4" fill="#d7b06a" />
        <rect x="1232" y="792" width="166" height="124" rx="4" fill="#5c4a3f" />
      </Spot>

      {/* lamp + its light */}
      <ellipse cx="560" cy="650" rx="380" ry="260" fill="url(#p-lamp)" />
      <g>
        <ellipse cx="470" cy="636" rx="46" ry="10" fill="#1a2440" />
        <path d="M470 630 L 500 470 L 610 430" stroke="#d7b06a" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M580 410 L 660 440 L 640 480 L 560 460 Z" fill="#a3ad91" />
        <circle cx="612" cy="470" r="12" fill="#ffe2b0" />
      </g>

      {/* monitor */}
      <ellipse cx="930" cy="500" rx="260" ry="180" fill="url(#p-screen)" />
      <Spot id="monitor">
        <rect x="770" y="380" width="320" height="200" rx="8" fill="#1a2440" />
        <rect x="782" y="392" width="296" height="176" rx="3" fill="#0b1733" />
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={800 + (i % 3) * 18} y={410 + i * 19} width={60 + ((i * 37) % 140)} height="7" rx="3.5" fill={["#a9dcff", "#a3ad91", "#d7b06a", "#e8ddc9"][i % 4]} opacity="0.8" />
          ))}
        </g>
        <rect x="910" y="580" width="20" height="48" fill="#1a2440" />
        <rect x="870" y="626" width="100" height="12" rx="4" fill="#1a2440" />
      </Spot>

      {/* notebook */}
      <Spot id="notebook">
        <path d="M600 660 L 640 618 L 860 618 L 830 660 Z" fill="#6f7a62" />
        <path d="M612 654 L 646 622 L 746 622 L 724 654 Z" fill="#ece3d1" />
        <path d="M728 654 L 750 622 L 850 622 L 822 654 Z" fill="#efe7d6" />
        <g stroke="#0f2658" strokeOpacity="0.5" strokeWidth="1.5">
          <line x1="650" y1="632" x2="728" y2="632" />
          <line x1="644" y1="640" x2="720" y2="640" />
          <line x1="760" y1="632" x2="830" y2="632" />
        </g>
      </Spot>

      {/* letter */}
      <Spot id="letter">
        <path d="M940 664 L 960 632 L 1060 636 L 1046 668 Z" fill="#efe5d2" />
        <path d="M960 632 L 1004 654 L 1060 636" stroke="#c9bda6" strokeWidth="2" fill="none" />
        <circle cx="1004" cy="652" r="7" fill="#8e2f3b" />
      </Spot>

      {/* iced coffee */}
      <Spot id="coffee">
        <path d="M1118 560 L 1172 560 L 1166 640 L 1124 640 Z" fill="#cfe6ff" opacity="0.25" />
        <path d="M1122 590 L 1168 590 L 1166 638 L 1124 638 Z" fill="#5b3a2a" />
        <path d="M1121 582 L 1169 582 L 1168 596 L 1122 596 Z" fill="#b98a64" />
        <line x1="1150" y1="540" x2="1140" y2="600" stroke="#a9dcff" strokeWidth="5" strokeLinecap="round" />
      </Spot>
    </svg>
  );
}
