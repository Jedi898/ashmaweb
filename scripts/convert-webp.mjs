// Convert all images (JPEG, PNG, HEIC) in public/ to WebP for fast rendering
// Handles gallery1, gallery2, and personal images (banner, profile, about)
import { readdirSync, statSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join, parse, extname } from "node:path";
import sharp from "sharp";

const publicDir = "public";
const dirs = ["gallery", "gallery2"];
const personalFiles = ["banner.png", "profile.JPG", "about.JPEG"];

// WebP quality: 82 is ideal for photo-vs-compression balance
// Progressive WebP saves 50-70% vs JPEG/PNG at near-identical quality
const WEBP_QUALITY = 82;

let converted = 0;
let skipped = 0;
let failed = [];

async function convertFile(filePath) {
  try {
    const parsed = parse(filePath);
    const ext = extname(filePath).toLowerCase();

    // Determine target name: strip original extension (even if none, like HEIC from github)
    const base = parsed.name;
    const webpPath = join(parsed.dir, `${base}.webp`);

    // Skip if already converted
    if (existsSync(webpPath)) {
      skipped++;
      return;
    }

    // If HEIC (no extension or .heic/.heif), sharp can decode it via libheif
    const wasHeic = ext === "" || ext === ".heic" || ext === ".heif";

    const image = sharp(filePath, { failOn: "none" });

    // Get metadata
    const meta = await image.metadata();

    // Convert to webp with quality
    await image
      .rotate() // auto-orient based on EXIF
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(webpPath);

    // Remove original after successful conversion
    rmSync(filePath, { force: true });

    converted++;
    console.log(
      `  [OK] ${filePath.split(/[\\/]/).slice(-2).join("/")} -> ${base}.webp` +
        ` (${wasHeic ? "HEIC→WEBP" : ext.slice(1).toUpperCase() + "→WEBP"}, ${meta.width}x${meta.height})`
    );
  } catch (err) {
    failed.push(filePath);
    console.log(`  [FAIL] ${filePath}: ${err.message}`);
  }
}

async function main() {
  console.log("=== Converting images to WebP ===");

  // 1. Personal images
  console.log("\n--- Personal images ---");
  for (const f of personalFiles) {
    const path = join(publicDir, f);
    if (existsSync(path)) await convertFile(path);
    else console.log(`  [SKIP] ${f} (not found)`);
  }

  // 2. Gallery folders
  for (const dir of dirs) {
    const fullDir = join(publicDir, dir);
    if (!existsSync(fullDir)) {
      console.log(`\n--- ${dir} (SKIP - not found) ---`);
      continue;
    }
    console.log(`\n--- ${dir} ---`);
    const files = readdirSync(fullDir);
    for (const file of files) {
      const filePath = join(fullDir, file);
      const st = statSync(filePath);
      if (st.isFile()) await convertFile(filePath);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Converted: ${converted}`);
  console.log(`Already WebP (skipped): ${skipped}`);
  if (failed.length) {
    console.log(`Failed: ${failed.length}`);
    failed.forEach((f) => console.log(`  [FAIL] ${f}`));
  }

  // Write a manifest of all produced webp files for the data file update
  const g1Files = readdirSync(join(publicDir, "gallery")).filter((f) =>
    f.toLowerCase().endsWith(".webp")
  );
  const g2Files = readdirSync(join(publicDir, "gallery2")).filter((f) =>
    f.toLowerCase().endsWith(".webp")
  );

  writeFileSync(
    "scripts/webp-manifest.json",
    JSON.stringify({ gallery: g1Files, gallery2: g2Files }, null, 2)
  );
  console.log("\nManifest written to scripts/webp-manifest.json");
  console.log("Done!");
}

main();

