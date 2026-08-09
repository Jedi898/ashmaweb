// Final step: convert the 5 HEIC-derived JPEGs to WebP, remove temp files
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const files = [
  "Hand sketch color rendering",
  "Menu Design for Restaurant_",
  "Mood",
  "Mural Painting, Hadigaun",
  "Photography_",
];

async function main() {
  for (const name of files) {
    const jpgPath = join("public", "gallery", `${name}.jpg`);
    const webpPath = join("public", "gallery", `${name}.webp`);

    if (!existsSync(jpgPath)) {
      console.log(`[SKIP] ${name}.jpg not found`);
      continue;
    }
    if (existsSync(webpPath)) {
      rmSync(jpgPath, { force: true });
      console.log(`[DONE] ${name}.webp exists, removed temp jpg`);
      continue;
    }

    try {
      await sharp(jpgPath, { failOn: "none" })
        .rotate()
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);
      rmSync(jpgPath, { force: true });
      console.log(`[OK] ${name}.jpg -> ${name}.webp`);
    } catch (err) {
      console.log(`[FAIL] ${name}: ${err.message}`);
    }
  }
  console.log("\nDone!");
}

main();
