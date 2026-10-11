"use client";

import { useRef, useState } from "react";

// The envelope opens, the stationery slides out. Sending opens your own mail
// app with the letter filled in — there's no server, and nothing is stored.
export function Envelope({ to }: { to: string }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  function openEnvelope() {
    setOpen(true);
    window.setTimeout(() => nameRef.current?.focus(), 650);
  }

  function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();
    const subject = `A letter for the atelier${name ? ` from ${name}` : ""}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className={`envelope${open ? " is-open" : ""}`} data-reveal>
      <div className="envelope-back" aria-hidden="true" />
      <form className="stationery" onSubmit={send} aria-label="Write a letter" inert={!open}>
        <p className="mono stationery-to">To: Teha, at the atelier</p>
        <label>
          <span>Your name</span>
          <input ref={nameRef} name="name" autoComplete="name" />
        </label>
        <label>
          <span>Your letter</span>
          <textarea name="message" rows={5} required placeholder="Dear Teha," />
        </label>
        <div className="stationery-actions">
          <button type="submit" className="btn btn-primary">
            Seal &amp; send
          </button>
          <p className="stationery-note" aria-live="polite">
            {sent ? "Your mail app should have opened. If not, write to " : "Opens your mail app. Or write to "}
            <a href={`mailto:${to}`}>{to}</a>.
          </p>
        </div>
      </form>
      <div className="envelope-front" aria-hidden="true">
        <span className="envelope-flap" />
        <span className="envelope-seal" />
      </div>
      {!open && (
        <button type="button" className="btn envelope-open" onClick={openEnvelope}>
          Open the envelope
        </button>
      )}
    </div>
  );
}
