import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · ${site.handle} — ERP developer and builder of small worlds`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "#14100D",
          color: "#F2ECE3",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 110,
            top: 150,
            width: 300,
            height: 300,
            borderRadius: 300,
            boxShadow: "-60px 24px 0 0 #9CEBFF",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 30, color: "#E8A57C", display: "flex" }}>frostmoon</div>
        <div style={{ fontSize: 132, fontWeight: 700, marginTop: 8, display: "flex" }}>{site.name}</div>
        <div style={{ fontSize: 38, color: "#CCD6D6", marginTop: 12, maxWidth: 720, display: "flex" }}>
          ERP developer by day. Builder of small worlds by night.
        </div>
      </div>
    ),
    size,
  );
}
