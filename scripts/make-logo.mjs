// Build transparent web versions of the official logo (gold on black JPEG) for use on light backgrounds.
// Source: raw-images/_logo-official.jpeg (the "_" prefix keeps it out of `npm run images`).
//
// Usage: node scripts/make-logo.mjs
import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const SRC = path.join(ROOT, 'raw-images', '_logo-official.jpeg');
const OUT = path.join(ROOT, 'public', 'logo');
await mkdir(OUT, { recursive: true });

// Regions of the 1254×1254 source.
const MARK = { left: 340, top: 170, width: 600, height: 590 }; // "PD" monogram
const LOCKUP = { left: 170, top: 170, width: 914, height: 820 }; // monogram + PLATINUM / INTERIOR DESIGN

/** Black background → alpha. Bright gold becomes opaque, dark edges fade out smoothly. */
async function knockout(region) {
  const { data, info } = await sharp(SRC).extract(region).raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const m = Math.max(r, g, b);
    const a = Math.max(0, Math.min(1, (m - 18) / 110)); // ignore near-black noise; solid from ~128
    // Un-premultiply so semi-transparent edge pixels keep their gold hue instead of going muddy.
    const k = a > 0 ? Math.min(255 / m, 1 / a) : 0;
    out[j] = Math.min(255, r * k);
    out[j + 1] = Math.min(255, g * k);
    out[j + 2] = Math.min(255, b * k);
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 });
}

async function save(img, name, height) {
  const buf = await img.png().toBuffer();
  await sharp(buf).resize({ height }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${name}.png`));
  await sharp(buf).resize({ height }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${name}.webp`));
}

// White version: same alpha, colour forced to white (for the CTA watermark / dark photos).
async function whiten(img) {
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) data[i] = data[i + 1] = data[i + 2] = 255;
  return sharp(data, { raw: info });
}

await save(await knockout(MARK), 'mark-gold', 256);
await save(await whiten(await knockout(MARK)), 'mark-white', 512);
await save(await knockout(LOCKUP), 'logo-gold', 320);

// Favicons: monogram on its original black background.
const square = sharp(SRC).extract({ left: 337, top: 160, width: 600, height: 600 });
const sq = await square.toBuffer();
await sharp(sq).resize(64).png().toFile(path.join(ROOT, 'public', 'favicon.png'));
await sharp(sq).resize(180).png().toFile(path.join(ROOT, 'public', 'apple-touch-icon.png'));
console.log('Logo assets written to public/logo, public/favicon.png, public/apple-touch-icon.png');
