// Generates the optimized public assets from the original (private) headshot.
//
// Usage: npm run assets
//        npm run assets -- "<path to another photo>"
//
// Default source: assets/profile_photo.png (git-ignored, never published).
//
// Outputs:
//   public/images/profile.webp   800x800 square headshot (metadata stripped)
//   public/og-image.png          1200x630 social share image
//   src/app/icon.png             32x32 favicon (DP monogram)
//   src/app/apple-icon.png       180x180 apple-touch-icon
//   src/app/favicon.ico          16/32/48 favicon for legacy browsers
//   public/icon-192.png          192x192 manifest icon
//   public/icon-512.png          512x512 manifest icon
//   public/images/projects/*.webp project screenshots (see SCREENSHOTS)
//
// The originals in assets/ are never copied into the repository.

import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = process.argv[2] ?? path.join(root, "assets/profile_photo.png");

if (!existsSync(source)) {
  console.error(`Photo not found: ${source}`);
  console.error('Usage: npm run assets -- "<path to photo>"');
  process.exit(1);
}

const NAVY = "#1E3A8A";
const NAVY_DARK = "#0B1120";
const TEAL = "#2DD4BF";

// Square crop centred on the face (tuned for the 1122x1402 original).
const CROP = { left: 61, top: 120, width: 1000, height: 1000 };

const out = (p) => path.join(root, p);

// Project screenshots: assets/<source> -> public/images/projects/<name>.webp
const SCREENSHOTS = [{ source: "neraca_lab.png", name: "neraca-lab" }];

async function profile() {
  await mkdir(out("public/images"), { recursive: true });
  const info = await sharp(source)
    .extract(CROP)
    .resize(800, 800)
    .webp({ quality: 80 })
    .toFile(out("public/images/profile.webp"));
  console.log("profile.webp", `${(info.size / 1024).toFixed(0)} KB`);
}

function monogramSvg(size, { rounded = true } = {}) {
  const radius = rounded ? Math.round(size * 0.22) : 0;
  const fontSize = Math.round(size * 0.46);
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif" font-weight="700"
        font-size="${fontSize}" fill="#FFFFFF" letter-spacing="${-size * 0.01}">DP</text>
    </svg>`);
}

async function icons() {
  await sharp(monogramSvg(32)).png().toFile(out("src/app/icon.png"));
  // Apple applies its own rounding, so use a full-bleed square.
  await sharp(monogramSvg(180, { rounded: false }))
    .png()
    .toFile(out("src/app/apple-icon.png"));
  await sharp(monogramSvg(192)).png().toFile(out("public/icon-192.png"));
  await sharp(monogramSvg(512)).png().toFile(out("public/icon-512.png"));

  // ICO container with embedded PNGs (supported by all modern browsers).
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(
    sizes.map((s) => sharp(monogramSvg(s)).png().toBuffer()),
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((s, i) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s, 0);
    entry.writeUInt8(s, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(pngs[i].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += pngs[i].length;
    return entry;
  });
  await writeFile(
    out("src/app/favicon.ico"),
    Buffer.concat([header, ...entries, ...pngs]),
  );
  console.log("icons done");
}

async function ogImage() {
  const W = 1200;
  const H = 630;
  const PHOTO = 360;

  const circleMask = Buffer.from(
    `<svg width="${PHOTO}" height="${PHOTO}"><circle cx="${PHOTO / 2}" cy="${PHOTO / 2}" r="${PHOTO / 2}" fill="#fff"/></svg>`,
  );
  const photo = await sharp(source)
    .extract(CROP)
    .resize(PHOTO, PHOTO)
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();

  const font = "Segoe UI, Arial, Helvetica, sans-serif";
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${NAVY_DARK}"/>
          <stop offset="1" stop-color="${NAVY}"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <circle cx="${W - 80 - PHOTO / 2}" cy="${H / 2}" r="${PHOTO / 2 + 8}" fill="none" stroke="${TEAL}" stroke-width="4"/>
      <text x="80" y="200" font-family="Consolas, monospace" font-size="26" fill="${TEAL}">// portfolio</text>
      <text x="80" y="275" font-family="${font}" font-weight="700" font-size="60" fill="#FFFFFF">David Donika</text>
      <text x="80" y="345" font-family="${font}" font-weight="700" font-size="60" fill="#FFFFFF">Panjaitan</text>
      <text x="80" y="415" font-family="${font}" font-size="30" fill="#CBD5E1">Senior Backend &amp; Full-Stack Developer</text>
      <text x="80" y="460" font-family="${font}" font-size="24" fill="#94A3B8">Java / Spring Boot · Node.js · Kafka · React</text>
      <text x="80" y="540" font-family="${font}" font-size="22" fill="#94A3B8">Jakarta, Indonesia</text>
    </svg>`);

  await sharp(background)
    .composite([{ input: photo, left: W - 80 - PHOTO, top: (H - PHOTO) / 2 }])
    .png({ compressionLevel: 9 })
    .toFile(out("public/og-image.png"));
  console.log("og-image.png done");
}

async function screenshots() {
  await mkdir(out("public/images/projects"), { recursive: true });
  for (const { source: file, name } of SCREENSHOTS) {
    const input = path.join(root, "assets", file);
    if (!existsSync(input)) {
      console.warn(`Skipped ${file}: not found in assets/`);
      continue;
    }
    // Keep the full width so small UI text stays sharp; flatten any alpha.
    const info = await sharp(input)
      .flatten({ background: "#ffffff" })
      .webp({ quality: 85, smartSubsample: true })
      .toFile(out(`public/images/projects/${name}.webp`));
    console.log(
      `${name}.webp`,
      `${info.width}x${info.height}`,
      `${(info.size / 1024).toFixed(0)} KB`,
    );
  }
}

await profile();
await icons();
await ogImage();
await screenshots();
