"use client";

import { useState } from "react";
import { projectFilters, projects } from "@/content/projects";
import type { ProjectKind } from "@/content/types";
import { ExternalMark } from "./ExternalMark";

type Filter = "all" | ProjectKind;

const KIND_LABEL: Record<ProjectKind, string> = { web: "Web app", theme: "Theme", tool: "Tool" };

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = projects.filter((p) => filter === "all" || p.kind === filter);

  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter projects">
        {projectFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="chip-button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>
      <ul className="project-grid">
        {shown.map((p) => (
          <li key={p.id} className="project-card">
            <div className="project-head">
              <span className="project-kind">{KIND_LABEL[p.kind]}</span>
              {p.isPrivate && <span className="project-private">Private repo</span>}
            </div>
            <h3 className="project-name">{p.name}</h3>
            {p.codename && p.codename !== p.name && <p className="project-codename">{p.codename}</p>}
            <p className="project-purpose">{p.purpose}</p>
            <p className="project-proud">
              <span className="project-proud-label">The good part</span>
              {p.proud}
            </p>
            <ul className="tag-list" aria-label="Stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {p.links && p.links.length > 0 && (
              <ul className="project-links">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} rel="noopener">
                      {l.label}
                      <ExternalMark />
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {p.note && <p className="project-note">{p.note}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
