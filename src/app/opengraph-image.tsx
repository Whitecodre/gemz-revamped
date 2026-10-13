import { ImageResponse } from "next/og";

import { getLogoDataUri } from "@/lib/brand-image";

// The picture shown when the link is shared (WhatsApp, LinkedIn, X, Slack...).
// Next adds the og:image tags for it automatically. 1200x630 is the standard size.
export const alt = "Gemz Software: custom software solutions for organisations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ImageResponse draws HTML-like JSX to a PNG. It only supports flexbox layout and
// inline styles, which is why every container below sets `display: "flex"`.
export default async function Image() {
  const logo = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          color: "#f2fbf7",
          background: "linear-gradient(135deg, #07140e 0%, #0a1f16 55%, #0f3a2c 100%)",
        }}
      >
        {/* The mark is dark teal, so it sits on a white tile to stay visible. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 260,
            height: 260,
            borderRadius: 56,
            background: "#ffffff",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img>, not next/image */}
          <img src={logo} width={200} height={200} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>Gemz</div>
          <div style={{ marginTop: 6, fontSize: 22, letterSpacing: 10, color: "#5ee9b5" }}>
            SOFTWARE INNOVATIVE
          </div>
          <div style={{ marginTop: 40, fontSize: 46, lineHeight: 1.2, color: "#c3d8ce" }}>
            Custom software built around how your organisation works.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
