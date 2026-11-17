// Regenerates raster brand assets from HTML templates with Playwright (Chromium).
// Run after changing the logo/brand colors:  npm run brand:assets
// Outputs: src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico, public/og.png
import { createRequire } from "node:module";
// Uses a globally available Playwright (set NODE_PATH="$(npm root -g)") or a local one.
const { chromium } = createRequire(import.meta.url)("playwright");
import { readFile, writeFile } from "node:fs/promises";

const iconSvg = await readFile("src/app/icon.svg", "utf8");

const og = `<!doctype html><html><head><style>
  html,body{margin:0;width:1200px;height:630px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Arial,sans-serif}
  body{background:#eef1f7;position:relative;overflow:hidden;color:#111216}
  .b{position:absolute;border-radius:50%;filter:blur(80px);opacity:.7}
  .b1{width:620px;height:620px;left:-160px;top:-260px;background:#7cb4ff}
  .b2{width:520px;height:520px;right:-120px;top:120px;background:#c9b8ff}
  .b3{width:420px;height:420px;left:380px;bottom:-260px;background:#9fe3d6}
  .card{position:absolute;inset:64px;border-radius:40px;background:rgba(255,255,255,.6);border:2px solid rgba(255,255,255,.8);
    box-shadow:0 30px 60px -30px rgba(17,18,22,.25);padding:64px;display:flex;flex-direction:column;justify-content:space-between}
  .top{display:flex;align-items:center;gap:20px;font-size:40px;font-weight:800;letter-spacing:-.02em}
  .top svg{width:72px;height:72px}
  h1{margin:0;font-size:68px;line-height:1.05;letter-spacing:-.035em;max-width:900px}
  p{margin:0;font-size:28px;color:#4f535d}
</style></head><body><div class="b b1"></div><div class="b b2"></div><div class="b b3"></div>
<div class="card"><div class="top">${iconSvg}<span>MIBC</span></div>
<div><h1>Where future business leaders begin.</h1><p style="margin-top:18px">Student-driven business club · North South University</p></div></div></body></html>`;

const iconPage = (size) =>
  `<!doctype html><html><body style="margin:0;background:transparent">${iconSvg.replace(
    "<svg ",
    `<svg width="${size}" height="${size}" `,
  )}</body></html>`;

const browser = await chromium.launch();
async function shot(html, width, height, path, omitBackground = false) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html);
  const buf = await page.screenshot({ type: "png", omitBackground });
  await page.close();
  if (path) await writeFile(path, buf);
  return buf;
}

await shot(og, 1200, 630, "public/og.png");
await shot(iconPage(512), 512, 512, "src/app/icon.png", true);
// Apple touch icons should be opaque.
await shot(iconPage(180), 180, 180, "src/app/apple-icon.png");
const png32 = await shot(iconPage(32), 32, 32, null, true);
await browser.close();

// favicon.ico containing a single 32x32 PNG image.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
await writeFile("src/app/favicon.ico", Buffer.concat([header, png32]));
console.log("Brand assets generated.");
