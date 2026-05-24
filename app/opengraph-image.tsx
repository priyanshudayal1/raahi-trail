import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0A0A0A",
          color: "white",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ color: "#00C46A", fontSize: 36, fontWeight: 800 }}>
          Raahi Trail
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginTop: 26,
            maxWidth: 920,
            textAlign: "center",
          }}
        >
          Curated group trips across India
        </div>
        <div style={{ color: "#FFD400", fontSize: 34, marginTop: 34 }}>
          Plan mat karo. Bas nikal jao.
        </div>
      </div>
    ),
    size,
  );
}
