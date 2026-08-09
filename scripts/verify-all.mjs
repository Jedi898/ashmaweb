import { readdirSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

const g1 = readdirSync("public/gallery");
const g2 = readdirSync("public/gallery2");

const g1Files = g1.filter((f) => f.endsWith(".webp"));
const g2Files = g2.filter((f) => f.endsWith(".webp"));

console.log("gallery webp files:", g1Files.length);
console.log("gallery2 webp files:", g2Files.length);

// Check all files are webp
console.log("gallery all webp:", g1.every((f) => f.endsWith(".webp")));
console.log("gallery2 all webp:", g2.every((f) => f.endsWith(".webp")));

// Personal images
["banner.webp", "profile.webp", "about.webp"].forEach((f) => {
  console.log(f, existsSync(path.join("public", f)) ? "OK" : "MISSING");
});

// Verify data file references
const content = readFileSync("src/data/gallery.ts", "utf8");
const refs = [...content.matchAll(/"([^"]+\.webp)"/g)].map((m) => m[1]);
console.log("Data file webp references:", refs.length);

// Check each data reference corresponds to a real file
// NOTE: data references are percent-encoded; files on disk use raw names
const decode = (s) => decodeURIComponent(s);
let missing = 0;
for (const ref of refs) {
  if (ref.startsWith("/gallery2/")) {
    const file = decode(ref.replace("/gallery2/", ""));
    if (!g2Files.includes(file)) {
      console.log("MISSING gallery2:", file);
      missing++;
    }
  } else if (ref.startsWith("/gallery/")) {
    const file = decode(ref.replace("/gallery/", ""));
    if (!g1Files.includes(file)) {
      console.log("MISSING gallery:", file);
      missing++;
    }
  }
}
console.log("Missing references:", missing);
