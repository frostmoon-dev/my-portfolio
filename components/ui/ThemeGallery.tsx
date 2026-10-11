"use client";

import { useMemo, useRef, useState } from "react";
import { themePacks } from "@/content/themes";
import type { ThemePalette } from "@/content/types";
import { readable } from "@/lib/contrast";
import { ExternalMark } from "./ExternalMark";

const VARIANT_LABEL = { light: "Light", dark: "Dark", "high-contrast": "High contrast" } as const;

// "Honkai: Star Rail - Robin (Dark)" → "Robin"
function characterName(label: string) {
  return label
    .replace(/\s*\((dark|high contrast)\)\s*$/i, "")
    .replace(/^.*?(\s-\s|\s:\s)/, "")
    .replace(/\s+(dark|high contrast)$/i, "")
    .trim();
}

type Character = { name: string; variants: ThemePalette[] };

function groupByCharacter(themes: ThemePalette[]): Character[] {
  const map = new Map<string, ThemePalette[]>();
  for (const t of themes) {
    const name = characterName(t.label);
    map.set(name, [...(map.get(name) ?? []), t]);
  }
  const order = { light: 0, dark: 1, "high-contrast": 2 };
  return [...map.entries()]
    .map(([name, variants]) => ({ name, variants: variants.sort((a, b) => order[a.variant] - order[b.variant]) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function Swatches({ t }: { t: ThemePalette }) {
  const colors = [t.bg, t.accent, t.keyword, t.string, t.fn, t.number];
  return (
    <span className="swatch-strip" aria-hidden="true">
      {colors.map((c, i) => (
        <span key={i} style={{ background: c }} />
      ))}
    </span>
  );
}

// An X++ snippet painted with the chosen theme: two halves of my work, in one window.
function MiniEditor({ t }: { t: ThemePalette }) {
  // Colours below 4.5:1 on the editor background are nudged until they pass.
  const ink = (hex: string) => ({ color: readable(hex, t.bg) });
  const k = ink(t.keyword);
  const s = ink(t.string);
  const f = ink(t.fn);
  const ty = ink(t.type);
  const n = ink(t.number);
  const c = ink(t.comment);
  const v = ink(t.variable);
  return (
    <div className="mini-editor" style={{ background: t.bg, ...ink(t.fg) }} aria-hidden="true">
      <div className="mini-editor-bar" style={{ background: t.accent }}>
        <span />
        <span />
        <span />
        <em>FrostGreeting.xpp</em>
      </div>
      <pre>
        <code>
          <span style={c}>{"/// Delight in the means, too."}</span>
          {"\n"}
          <span style={k}>internal final class</span> <span style={ty}>FrostGreeting</span>
          {"\n{\n    "}
          <span style={k}>public static str</span> <span style={f}>greet</span>(<span style={k}>str</span>{" "}
          <span style={v}>_name</span>)
          {"\n    {\n        "}
          <span style={k}>int</span> <span style={v}>cups</span> = <span style={n}>3</span>;
          {"\n        "}
          <span style={k}>return</span> <span style={f}>strFmt</span>(<span style={s}>{'"@Frost:Greeting"'}</span>,{" "}
          <span style={v}>_name</span>, <span style={v}>cups</span>);
          {"\n    }\n}"}
        </code>
      </pre>
    </div>
  );
}

type Palettes = Record<string, { version: string; themes: ThemePalette[] }>;

// Palettes come in as props from the server component, so the theme data
// stays out of the JavaScript bundle.
export function ThemeGallery({ themePalettes }: { themePalettes: Palettes }) {
  const [packIndex, setPackIndex] = useState(0);
  const pack = themePacks[packIndex];
  const characters = useMemo(() => groupByCharacter(themePalettes[pack.id]?.themes ?? []), [pack.id, themePalettes]);
  const [selected, setSelected] = useState<ThemePalette>(() => {
    const first = themePalettes[themePacks[0].id].themes;
    return first.find((t) => t.variant === "dark") ?? first[0];
  });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function choosePack(i: number) {
    setPackIndex(i);
    const themes = themePalettes[themePacks[i].id]?.themes ?? [];
    const pick = themes.find((t) => t.variant === "dark") ?? themes[0];
    if (pick) setSelected(pick);
  }

  function onTabKey(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % themePacks.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + themePacks.length) % themePacks.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = themePacks.length - 1;
    else return;
    e.preventDefault();
    choosePack(next);
    tabRefs.current[next]?.focus();
  }

  const total = themePalettes[pack.id]?.themes.length ?? 0;

  return (
    <div className="theme-gallery">
      <div role="tablist" aria-label="Theme packs" className="tab-list">
        {themePacks.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`pack-tab-${p.id}`}
            aria-selected={i === packIndex}
            aria-controls="pack-panel"
            tabIndex={i === packIndex ? 0 : -1}
            onClick={() => choosePack(i)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {p.name}
            <span className="tab-count">{themePalettes[p.id]?.themes.length ?? 0}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id="pack-panel" aria-labelledby={`pack-tab-${pack.id}`} className="theme-panel">
        <div className="theme-preview">
          <MiniEditor t={selected} />
          <p className="theme-preview-caption" aria-live="polite">
            Previewing <strong>{selected.label}</strong>
          </p>
          <p className="theme-preview-note">
            Original colours below. In the preview, any colour under 4.5:1 contrast is lifted a little so it
            stays readable.
          </p>
          <dl className="theme-hexes">
            {(
              [
                ["Background", selected.bg],
                ["Text", selected.fg],
                ["Keyword", selected.keyword],
                ["String", selected.string],
                ["Function", selected.fn],
              ] as const
            ).map(([name, hex]) => (
              <div key={name}>
                <dt>
                  <span className="hex-dot" style={{ background: hex }} aria-hidden="true" />
                  {name}
                </dt>
                <dd className="tabular">{hex}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="theme-list-wrap">
          <p className="theme-pack-blurb">
            {pack.blurb} <span className="muted">{total} themes.</span>
          </p>
          <ul className="theme-list">
            {characters.map((ch) => (
              <li key={ch.name} className="theme-character">
                <span className="theme-character-name">{ch.name}</span>
                <span className="theme-variants">
                  {ch.variants.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      className="theme-variant"
                      aria-pressed={selected.label === t.label}
                      aria-label={`Preview ${ch.name}, ${VARIANT_LABEL[t.variant]}`}
                      onClick={() => setSelected(t)}
                    >
                      <Swatches t={t} />
                      <span className="theme-variant-label" aria-hidden="true">
                        {VARIANT_LABEL[t.variant]}
                      </span>
                    </button>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          <p className="theme-credit">
            {pack.credit && <span>{pack.credit} </span>}
            {pack.marketplace ? (
              <a href={pack.marketplace} rel="noopener">
                Install from the VS Code Marketplace
                <ExternalMark />
              </a>
            ) : (
              <span>Not on the Marketplace yet.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
