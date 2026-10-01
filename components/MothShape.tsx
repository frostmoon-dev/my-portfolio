// One moth silhouette, carried over from the first frostmoon portfolio.
export const MOTH_VIEWBOX = "0 0 72 29";

export function MothPaths() {
  return (
    <>
      <path d="M34.5 10C27 5.5 15 1.5 8 3C9.5 7 9 12.5 13.5 16C21 19 31 17.5 34 16Z" />
      <path d="M37.5 10C45 5.5 57 1.5 64 3C62.5 7 63 12.5 58.5 16C51 19 41 17.5 38 16Z" />
      <path d="M34 17C29 19 21 20.5 19 24.5C22 26.5 25 27 27.5 25.5C30.5 23.8 33.5 21.5 34.6 19.5Z" />
      <path d="M38 17C43 19 51 20.5 53 24.5C50 26.5 47 27 44.5 25.5C41.5 23.8 38.5 21.5 37.4 19.5Z" />
      <path d="M36 8C37.6 12 37.6 20 36 23.5C34.4 20 34.4 12 36 8Z" />
    </>
  );
}

export function Moth({ className }: { className?: string }) {
  return (
    <svg viewBox={MOTH_VIEWBOX} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <MothPaths />
    </svg>
  );
}
