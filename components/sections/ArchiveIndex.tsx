"use client";

import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects } from "@/content/projects";
import type { ProjectKind } from "@/content/types";
import { ProjectCover } from "@/components/ui/ProjectCover";

const KIND_LABEL: Record<ProjectKind, string> = { web: "Web app", theme: "Editor theme", tool: "Tool" };

// A numbered index. Hover or focus an entry and its archive plate slides in
// beside the list; on small screens the plate sits inside the entry.
export function ArchiveIndex() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [active, setActive] = useState(projects[0].id);
  const shown = projects.filter((p) => filter === "all" || p.kind === filter);
  const activeProject = projects.find((p) => p.id === active) ?? projects[0];
  const activeNo = String(projects.indexOf(activeProject) + 1).padStart(2, "0");

  return (
    <div className="archive">
      <div className="archive-filters" role="group" aria-label="Filter the archives" data-reveal>
        {projectFilters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
        <p className="mono muted" aria-live="polite">
          {shown.length} {shown.length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="archive-body">
        <ol className="archive-list">
          {shown.map((p) => {
            const no = String(projects.indexOf(p) + 1).padStart(2, "0");
            return (
              <li key={p.id} className={`archive-entry${active === p.id ? " is-active" : ""}`} data-reveal>
                <Link
                  href={`/projects/${p.id}`}
                  onMouseEnter={() => setActive(p.id)}
                  onFocus={() => setActive(p.id)}
                  className="archive-link"
                >
                  <span className="mono archive-no">No. {no}</span>
                  <span className="archive-title">
                    <span className="archive-name">{p.name}</span>
                    <span className="archive-purpose">{p.purpose}</span>
                  </span>
                  <span className="mono archive-kind">
                    {KIND_LABEL[p.kind]}
                    {p.isPrivate && <> · private</>}
                  </span>
                  <span className="archive-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <div className="archive-plate" aria-hidden="true">
          <div className="archive-plate-inner" key={activeProject.id}>
            <ProjectCover cover={activeProject.cover} number={activeNo} label={activeProject.name} />
            <p className="mono archive-plate-stack">{activeProject.stack.join(" · ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
