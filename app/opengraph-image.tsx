import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.atelier} — ${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card in the Frosted Ledger style: icy paper, coffee ink, a
// hairline rule, and the night room as a small framed picture.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 88px",
          background: "#EAF2F3",
          color: "#332925",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 88,
            top: 72,
            width: 360,
            height: 270,
            display: "flex",
            borderRadius: 6,
            border: "1px solid #B9C7C9",
            background: "linear-gradient(#071231, #0F2658)",
          }}
        >
          <div style={{ position: "absolute", left: 175, top: 0, width: 6, height: 268, background: "#1c2c55", display: "flex" }} />
          <div style={{ position: "absolute", left: 0, top: 140, width: 358, height: 6, background: "#1c2c55", display: "flex" }} />
          <div style={{ position: "absolute", right: 46, top: 34, width: 50, height: 50, borderRadius: 50, boxShadow: "-14px 7px 0 0 #E7F1F3", display: "flex" }} />
        </div>
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#594841", display: "flex" }}>THE MIDNIGHT ATELIER</div>
        <div style={{ fontSize: 120, marginTop: 8, display: "flex", letterSpacing: -3 }}>{site.name}</div>
        <div style={{ width: 640, height: 1, background: "#B9C7C9", marginTop: 16, display: "flex" }} />
        <div style={{ fontSize: 34, color: "#332925", marginTop: 20, fontStyle: "italic", display: "flex" }}>{site.tagline}</div>
        <div style={{ fontSize: 24, color: "#2F6470", marginTop: 14, display: "flex" }}>{site.role}</div>
      </div>
    ),
    size,
  );
}
