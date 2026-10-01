import { site } from "@/content/site";
import { LiveMoon } from "../LiveMoon";
import { StatusClock } from "../StatusClock";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-sky" aria-hidden="true" />
      <div className="wrap hero-grid">
        <p className="hero-kicker intro intro-1">{site.heroKicker}</p>
        <h1 id="hero-title" className="hero-name">
          <span className="hero-name-inner">
            {site.name}
            <span className="hero-name-dot" aria-hidden="true">
              .
            </span>
          </span>
        </h1>
        <p className="hero-handle intro intro-3">
          a.k.a. <span>{site.handle}</span> · {site.role} · {site.location}
        </p>
        <p className="hero-line intro intro-4">{site.heroLine}</p>
        <div className="hero-actions intro intro-5">
          <a href="#projects" className="button button-primary">
            See my work
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#contact" className="button button-secondary">
            Contact me
          </a>
        </div>
        <dl className="status-ledger intro intro-6">
          <div>
            <dt>Status</dt>
            <dd>{site.status.label}</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{site.status.mode}</dd>
          </div>
          <div>
            <dt>Local time</dt>
            <dd>
              <StatusClock /> <span className="muted">MYT</span>
            </dd>
          </div>
        </dl>
        <LiveMoon className="intro" />
      </div>
    </section>
  );
}
