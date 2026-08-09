import { readdirSync, statSync, readFileSync } from "node:fs";

const m = JSON.parse(readFileSync("src/data/image-manifest.json", "utf8"));
const t1 = readdirSync("public/gallery/thumbs");
const t2 = readdirSync("public/gallery2/thumbs");
const g1 = readdirSync("public/gallery").filter((f) => f.endsWith(".webp"));
const g2 = readdirSync("public/gallery2").filter((f) => f.endsWith(".webp"));

const sum = (arr, folder) =>
  arr.reduce((a, f) => a + statSync(`public/${folder}/${f}`).size, 0);

const g1full = sum(g1, "gallery");
const g1thumb = sum(t1, "gallery/thumbs");
const g2full = sum(g2, "gallery2");
const g2thumb = sum(t2, "gallery2/thumbs");

console.log("=== GALLERY OPTIMIZATION SUMMARY ===");
console.log("Manifest entries:", Object.keys(m).length);
console.log("--- Gallery 1 ---");
console.log(
  "Full originals:",
  g1.length,
  "|",
  (g1full / 1024 / 1024).toFixed(1) + "MB",
  "| avg:",
  Math.round(g1full / 1024 / g1.length) + "KB"
);
console.log(
  "Thumbnails:",
  t1.length,
  "|",
  (g1thumb / 1024 / 1024).toFixed(1) + "MB",
  "| avg:",
  Math.round(g1thumb / 1024 / t1.length) + "KB"
);
console.log("Reduction:", Math.round((1 - g1thumb / g1full) * 100) + "%");
console.log("--- Gallery 2 ---");
console.log(
  "Full originals:",
  g2.length,
  "|",
  (g2full / 1024 / 1024).toFixed(1) + "MB",
  "| avg:",
  Math.round(g2full / 1024 / g2.length) + "KB"
);
console.log(
  "Thumbnails:",
  t2.length,
  "|",
  (g2thumb / 1024 / 1024).toFixed(1) + "MB",
  "| avg:",
  Math.round(g2thumb / 1024 / t2.length) + "KB"
);
console.log("Reduction:", Math.round((1 - g2thumb / g2full) * 100) + "%");

// Verify all data srcs resolve in manifest
const data = readFileSync("src/data/gallery.ts", "utf8");
const refs = data.match(/localSrc\(\"[^\"]*\", \"[^\"]+\"\)/g) || [];
let missing = 0;
for (const r of refs) {
  const match = r.match(/localSrc\(\"(\d*)\", \"([^\"]+)\"\)/);
  const folder = match[1] ? "gallery2" : "gallery";
  const enc = match[2];
  const dec = decodeURIComponent(enc);
  const key = "/" + folder + "/" + dec;
  if (!m[key]) missing++;
}
console.log("Data refs missing from manifest:", missing);
