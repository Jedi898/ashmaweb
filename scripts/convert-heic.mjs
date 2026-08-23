// Convert the 5 HEIC files to WebP using heic-convert (handles iref security limits)
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import convert from "heic-convert";

const heicFiles = [
  "Hand sketch color rendering",
  "Menu Design for Restaurant_",
  "Mood",
  "Mural Painting, Hadigaun",
  "Photography_",
];

async function main() {
  for (const name of heicFiles) {
    const inputPath = join("public", "gallery", name);
    const outputPath = join("public", "gallery", `${name}.webp`);
    const outJpeg = join("public", "gallery", `${name}.jpg`);

    if (!existsSync(inputPath)) {
      console.log(`[SKIP] ${name} not found`);
      continue;
    }
    if (existsSync(outputPath)) {
      console.log(`[SKIP] ${name}.webp already exists`);
      continue;
    }

    try {
      const input = readFileSync(inputPath);
      // Convert to JPEG buffer first (heic-convert outputs PNG/JPEG)
      const outputBuffer = await convert({
        buffer: input,
        format: "JPEG",
        quality: 0.9,
      });

      // Write temp JPEG
      writeFileSync(outJpeg, outputBuffer);
      console.log(`[OK] ${name} -> ${name}.jpg (HEIC→JPEG)`);
    } catch (err) {
      console.log(`[FAIL] ${name}: ${err.message}`);
    }
  }
}

main();
