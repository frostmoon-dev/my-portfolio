import { site } from "@/content/site";
import { LiveMoon } from "../LiveMoon";
import { StatusClock } from "../StatusClock";

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">{site.heroKicker}</p>
          <h1 id="hero-title" className="hero-name">
            {site.name}
          </h1>
          <p className="hero-handle">
            a.k.a. <span>{site.handle}</span> · {site.role} · {site.location}
          </p>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              See my work
            </a>
            <a href="#contact" className="button button-secondary">
              Contact me
            </a>
          </div>
          <dl className="status-ledger">
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
        </div>
        <LiveMoon />
      </div>
    </section>
  );
}
