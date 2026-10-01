import { Moth } from "./MothShape";

// A few faint moths drifting down the page. Pure CSS, no pointer events,
// hidden from screen readers, and removed for prefers-reduced-motion.
const MOTHS = [
  { left: "6%", delay: "0s", duration: "46s", scale: 1, drift: "26px" },
  { left: "31%", delay: "-17s", duration: "58s", scale: 0.6, drift: "-34px" },
  { left: "57%", delay: "-33s", duration: "51s", scale: 0.8, drift: "38px" },
  { left: "82%", delay: "-9s", duration: "62s", scale: 0.7, drift: "-24px" },
];

export function Moths() {
  return (
    <div className="moths" aria-hidden="true">
      {MOTHS.map((m, i) => (
        <span
          key={i}
          className="moth"
          style={
            {
              left: m.left,
              animationDelay: m.delay,
              animationDuration: m.duration,
              "--moth-scale": m.scale,
              "--moth-drift": m.drift,
            } as React.CSSProperties
          }
        >
          <Moth />
        </span>
      ))}
    </div>
  );
}
