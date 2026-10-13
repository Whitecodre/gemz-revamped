import { ImageResponse } from "next/og";

import { getLogoDataUri } from "@/lib/brand-image";

// The browser-tab icon. 192px is a multiple of 48, the size Google asks for to
// show the icon beside search results. The browser scales it down for the tab.
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

// No background: the transparent mark sits straight on the tab, with the picture
// drawn at full size because the logo file already has its own margin.
export default async function Icon() {
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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain <img>, not next/image */}
        <img src={logo} width={192} height={192} alt="" />
      </div>
    ),
    { ...size },
  );
}
