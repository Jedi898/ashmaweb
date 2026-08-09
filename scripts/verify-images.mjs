import { readdirSync, existsSync } from "node:fs";
import { readFileSync } from "node:fs";

// Read the data file
const data = readFileSync("src/data/gallery.ts", "utf8");

function extractArray(name) {
  const match = data.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  if (!match) return [];
  const items = match[1].match(/"([^"]+)"/g) || [];
  return items.map((s) => s.replace(/"/g, ""));
}

const g1 = extractArray("gallery1");
const g2 = extractArray("gallery2");
console.log("gallery1 entries in data:", g1.length);
console.log("gallery2 entries in data:", g2.length);

const disk1 = readdirSync("public/gallery");
const disk2 = readdirSync("public/gallery2");

const missing1 = g1.filter((enc) => {
  const decoded = decodeURIComponent(enc);
  return !disk1.includes(decoded);
});
const missing2 = g2.filter((enc) => {
  const decoded = decodeURIComponent(enc);
  return !disk2.includes(decoded);
});

console.log("\ngallery1 MISSING from disk:", missing1.length ? missing1 : "NONE");
console.log("gallery2 MISSING from disk:", missing2.length ? missing2 : "NONE");

const data1Decoded = new Set(g1.map(decodeURIComponent));
const data2Decoded = new Set(g2.map(decodeURIComponent));
const extra1 = disk1.filter((f) => !data1Decoded.has(f));
const extra2 = disk2.filter((f) => !data2Decoded.has(f));
console.log("\ngallery1 on disk but NOT in data:", extra1);
console.log("gallery2 on disk but NOT in data:", extra2);
