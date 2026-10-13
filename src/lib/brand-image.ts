import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Reads the brand mark from public/ and returns it as a data URI. The generated
// images (share card, favicon) are drawn on the server by ImageResponse, which
// needs the picture's bytes rather than a web address.
export async function getLogoDataUri() {
  const file = await readFile(join(process.cwd(), "public/brand/gemz-icon-transparent.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}
