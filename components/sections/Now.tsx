import { now, nowUpdated } from "@/content/now";

export function Now() {
  return (
    <section id="now" className="section section-tight" aria-labelledby="now-title">
      <div className="wrap">
        <div className="now-card reveal">
          <div className="now-head">
            <h2 id="now-title">Now</h2>
            <p className="muted">
              Updated <time>{nowUpdated}</time>
            </p>
          </div>
          <dl className="now-list">
            {now.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
