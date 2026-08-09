import { readdirSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const THUMB_DIRS = ["public/gallery/thumbs", "public/gallery2/thumbs"];
const THUMB_WIDTH = 640;
const BLUR_WIDTH = 32;

// Collect all source images
const sources = [
  ...readdirSync("public/gallery")
    .filter((f) => f.endsWith(".webp"))
    .map((f) => ({ folder: "gallery", file: f })),
  ...readdirSync("public/gallery2")
    .filter((f) => f.endsWith(".webp"))
    .map((f) => ({ folder: "gallery2", file: f })),
];

// Placeholder entry for manifest
const manifest = {};

for (const dir of THUMB_DIRS) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

let count = 0;
const results = [];

for (const { folder, file } of sources) {
  const srcPath = path.join("public", folder, file);
  try {
    const img = sharp(srcPath);
    const meta = await img.metadata();
    if (!meta.width || !meta.height) {
      console.log("SKIP (no dimensions):", file);
      continue;
    }

    // Generate thumbnail (for grid)
    const thumbPath = path.join("public", folder, "thumbs", file);
    await sharp(srcPath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 72, effort: 6 })
      .toFile(thumbPath);

    // Generate blur placeholder (base64)
    const blurBuffer = await sharp(srcPath)
      .resize({ width: BLUR_WIDTH, withoutEnlargement: true })
      .webp({ quality: 20 })
      .toBuffer();
    const blurDataUrl = `data:image/webp;base64,${blurBuffer.toString("base64")}`;

    manifest[`/${folder}/${file}`] = {
      width: meta.width,
      height: meta.height,
      thumb: `/gallery${folder === "gallery" ? "" : "2"}/thumbs/${encodeURIComponent(file)}`,
      blurDataUrl,
    };

    results.push({ file, folder, thumb: manifest[`/${folder}/${file}`].thumb });
    count++;
  } catch (err) {
    console.log("FAIL:", file, err.message);
  }
}

// Write manifest
writeFileSync(
  "src/data/image-manifest.json",
  JSON.stringify(manifest, null, 2)
);

console.log(`Generated ${count} thumbnails + blur placeholders.`);
console.log("Manifest written to src/data/image-manifest.json");
