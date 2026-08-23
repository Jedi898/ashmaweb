import { readdir, rename, rm, stat } from "node:fs/promises";
import { join } from "node:path";

// Fix garbled Unicode filenames in public/gallery2
// Pattern: files containing mojibake of U+2019 right single quote (â€™ in latin1)

const dir = "e:/ashma-web/public/gallery2";

// The mojibake bytes: â€™ = 0xE2 0x80 0x99 which decoded as latin1 = "â€™"
const mojibakeApostrophe = "\u00e2\u20ac\u2122"; // "â€™" as JS chars (but really the 3 bytes)
const properApostrophe = "\u2019"; // '

async function main() {
  console.log("=== Fixing garbled filenames in gallery2 ===");

  const files = await readdir(dir);
  let fixed = 0;

  for (const name of files) {
    // Check if the filename contains the mojibake sequence
    // The actual bytes on disk are E2 80 99. When Node reads them as utf8,
    // they become the proper U+2019 char. But the listing showed "â€™",
    // meaning the bytes were saved as UTF-8 of the latin1-interpretation.
    // This means the actual bytes on disk are: C3 A2 E2 82 AC E2 84 A2

    // Detect via latin1 interpretation: "â€™"
    if (name.includes(mojibakeApostrophe)) {
      const newName = name.replaceAll(mojibakeApostrophe, properApostrophe);
      const oldPath = join(dir, name);
      const newPath = join(dir, newName);

      try {
        await stat(newPath);
        // New path exists — remove the garbled duplicate
        await rm(oldPath, { force: true });
        console.log(`  [DUP] Removed garbled duplicate: ${name}`);
      } catch {
        await rename(oldPath, newPath);
        console.log(`  [FIX] ${name} -> ${newName}`);
      }
      fixed++;
    }
  }

  console.log(`\n=== Verification ===`);
  const remaining = (await readdir(dir)).filter((n) =>
    n.includes(mojibakeApostrophe)
  );
  const total = (await readdir(dir)).length;
  console.log(`Total files in public/gallery2: ${total}`);
  console.log(
    remaining.length === 0
      ? "No garbled files remaining. All clean!"
      : `Remaining garbled: ${remaining.join(", ")}`
  );
  console.log(`\nFixed ${fixed} files. Done!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

