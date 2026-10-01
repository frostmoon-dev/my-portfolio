// Marks a link that leaves the site.
export function ExternalMark() {
  return (
    <>
      <span aria-hidden="true" className="external-mark">
        ↗
      </span>
      <span className="sr-only"> (external site)</span>
    </>
  );
}
