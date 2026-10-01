import { site } from "@/content/site";
import { Moth } from "../MothShape";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Moth className="footer-moth" />
        <blockquote>
          <p>&ldquo;{site.motto}&rdquo;</p>
        </blockquote>
        <p className="footer-line">
          made with <span aria-hidden="true">♡</span>
          <span className="sr-only">love</span> by {site.handle} · {new Date().getFullYear()} ·{" "}
          <a href="#top">Back to top</a>
        </p>
      </div>
    </footer>
  );
}
