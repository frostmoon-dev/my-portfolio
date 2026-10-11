"use client";

import Link from "next/link";
import { useState } from "react";
import { projectFilters, projects } from "@/content/projects";
import type { ProjectKind } from "@/content/types";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useLedgerRows } from "@/hooks/useLedgerRows";

const KIND_LABEL: Record<ProjectKind, string> = { web: "Web app", theme: "Editor theme", tool: "Tool" };

// A numbered index. Hover or focus an entry and its archive plate slides in
// beside the list; on small screens the plate sits inside the entry.
export function ArchiveIndex() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]["id"]>("all");
  const [active, setActive] = useState(projects[0].id);
  const byFilter = (f: typeof filter) => projects.filter((p) => f === "all" || p.kind === f);
  // rows animate in like ledger lines; a filter change lifts them out first
  const { listRef, rows: shown, swap } = useLedgerRows(byFilter("all"));
  const choose = (f: typeof filter) => {
    if (f === filter) return;
    setFilter(f);
    swap(byFilter(f));
  };
  const activeProject = projects.find((p) => p.id === active) ?? projects[0];
  const activeNo = String(projects.indexOf(activeProject) + 1).padStart(2, "0");

  return (
    <div className="archive">
      <div className="archive-filters" role="group" aria-label="Filter the archives">
        {projectFilters.map((f) => (
          <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => choose(f.id)}>
            {f.label}
          </button>
        ))}
        <p className="mono muted" aria-live="polite">
          {byFilter(filter).length} {byFilter(filter).length === 1 ? "entry" : "entries"}
        </p>
      </div>

      <div className="archive-body">
        <ol className="archive-list" ref={listRef} data-motion="ledger-rows" data-motion-interactive>
          {shown.map((p, i) => {
            const no = String(projects.indexOf(p) + 1).padStart(2, "0");
            return (
              <li
                key={p.id}
                className={`archive-entry${active === p.id ? " is-active" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
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
