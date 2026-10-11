import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ExternalMark } from "@/components/ui/ExternalMark";
import { ProjectCover } from "@/components/ui/ProjectCover";

// A case study for one archive entry. Only fields that exist are shown.

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params;
  const p = projects.find((x) => x.id === id);
  if (!p) return {};
  return { title: p.name, description: p.purpose };
}

const KIND = { web: "Web app", theme: "Editor theme", tool: "Tool" } as const;

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const index = projects.findIndex((x) => x.id === id);
  if (index < 0) notFound();
  const p = projects[index];
  const no = String(index + 1).padStart(2, "0");
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" tabIndex={-1} className="case">
      <div className="wrap case-wrap">
        <nav className="case-nav mono" aria-label="Breadcrumb">
          <Link href="/#archives">← The Archives</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">No. {no}</span>
        </nav>

        <header className="case-header">
          <h1>{p.name}</h1>
          <p className="mono case-meta">
            No. {no} · {KIND[p.kind]}
            {p.isPrivate && " · private repo"}
          </p>
          {p.codename && p.codename !== p.name && <p className="mono muted">{p.codename}</p>}
          <p className="case-purpose">{p.purpose}</p>
        </header>

        <div className="case-plate">
          <ProjectCover cover={p.cover} number={no} label={p.name} />
        </div>

        <div className="case-body">
          <section aria-labelledby="hard-part">
            <h2 id="hard-part" className="mono">The hard part, and the part I&apos;m proud of</h2>
            <p>{p.proud}</p>
          </section>
          {p.challenges && p.challenges.length > 0 && (
            <section aria-labelledby="challenges">
              <h2 id="challenges" className="mono">Technical challenges</h2>
              <ul>
                {p.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
          {p.contributions && p.contributions.length > 0 && (
            <section aria-labelledby="contributions">
              <h2 id="contributions" className="mono">My contributions</h2>
              <ul>
                {p.contributions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>
          )}
          {p.outcome && (
            <section aria-labelledby="outcome">
              <h2 id="outcome" className="mono">Outcome</h2>
              <p>{p.outcome}</p>
            </section>
          )}
          <aside className="case-meta">
            <h2 className="mono">Built with</h2>
            <ul className="tags">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {p.links && p.links.length > 0 ? (
              <>
                <h2 className="mono">Links</h2>
                <ul className="case-links">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} rel="noopener">
                        {l.label}
                        <ExternalMark />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              p.isPrivate && <p className="muted">Private repository, so there is no public link.</p>
            )}
            {p.note && <p className="case-note">{p.note}</p>}
          </aside>
        </div>

        <footer className="case-footer">
          <Link href={`/projects/${next.id}`} className="case-next">
            <span className="mono">Next entry</span>
            <span className="case-next-name">{next.name} →</span>
          </Link>
          <Link href="/" className="mono">
            Back to the atelier
          </Link>
        </footer>
      </div>
    </main>
  );
}
