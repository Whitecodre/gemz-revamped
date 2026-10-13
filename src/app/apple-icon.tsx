import { ImageResponse } from "next/og";

import { getLogoDataUri } from "@/lib/brand-image";

// The icon iPhones and iPads use when a visitor adds the site to the home screen.
// Apple rounds the corners itself, so the tile is a plain white square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await getLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img>, not next/image */}
        <img src={logo} width={140} height={140} alt="" />
      </div>
    ),
    { ...size },
  );
}
