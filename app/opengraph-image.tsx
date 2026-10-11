import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.atelier} — ${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card: the atelier window at night, the name, the tagline.
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
          background: "linear-gradient(160deg, #0F2658 0%, #0A1B42 60%, #071433 100%)",
          color: "#E8DDC9",
          position: "relative",
        }}
      >
        {/* window */}
        <div
          style={{
            position: "absolute",
            right: 88,
            top: 72,
            width: 360,
            height: 280,
            display: "flex",
            border: "10px solid #23345F",
            background: "linear-gradient(#071231, #12285A)",
          }}
        >
          <div style={{ position: "absolute", left: 170, top: 0, width: 8, height: 260, background: "#23345F", display: "flex" }} />
          <div style={{ position: "absolute", left: 0, top: 140, width: 340, height: 8, background: "#23345F", display: "flex" }} />
          <div style={{ position: "absolute", right: 40, top: 30, width: 56, height: 56, borderRadius: 56, boxShadow: "-16px 8px 0 0 #E8DDC9", display: "flex" }} />
        </div>
        <div style={{ fontSize: 24, letterSpacing: 8, color: "#D7B06A", display: "flex" }}>THE MIDNIGHT ATELIER</div>
        <div style={{ fontSize: 96, marginTop: 12, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 36, color: "#A9DCFF", marginTop: 8, display: "flex" }}>{site.tagline}</div>
        <div style={{ fontSize: 26, color: "#A7B0C4", marginTop: 18, display: "flex" }}>{site.role}</div>
      </div>
    ),
    size,
  );
}
