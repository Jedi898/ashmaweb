import { readdirSync, writeFileSync } from "node:fs";

// Encode filename for URL (percent-encoding)
const encode = (name) => {
  return name
    .replace(/%/g, "%25")
    .replace(/ /g, "%20")
    .replace(/,/g, "%2C")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/’/g, "%E2%80%99")
    .replace(/“/g, "%E2%80%9C")
    .replace(/”/g, "%E2%80%9D")
    .replace(/_/g, "_");
};

const g1files = readdirSync("public/gallery").filter((f) => f.endsWith(".webp"));
const g2files = readdirSync("public/gallery2").filter((f) => f.endsWith(".webp"));

const gallery1 = g1files.map((f) => encode(f));
const gallery2 = g2files.map((f) => encode(f));

const formatName = `(encoded: string) => {
  const decoded = decodeURIComponent(encoded);
  const base = decoded.replace(/\\.webp$/i, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\\((\\d+)\\)/g, " $1")
    .trim();
}`;

const localSrc = `(folder: string, encoded: string) => {
  return \`/gallery\${folder}/\${encoded}\`;
}`;

// Determine covers
const g1Cover = gallery1.find((f) => f.includes("Adorning")) || gallery1[0];
const g2Cover = gallery2.find((f) => f.includes("Womens_wear")) || gallery2[0];

const fileContent = `export interface GalleryImage {
  name: string;
  src: string;
}

export interface Gallery {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  cover: string;
  coverAlt: string;
  imageCount: number;
  images: GalleryImage[];
}

// Local public folder paths (WebP-optimized)
const gallery1 = [
${gallery1.map((f) => `  "${f}",`).join("\n")}
];

const gallery2 = [
${gallery2.map((f) => `  "${f}",`).join("\n")}
];

const formatName = ${formatName};

const localSrc = ${localSrc};

export const galleries: Gallery[] = [
  {
    id: "artistry",
    title: "The Artistry Collection",
    subtitle: "Ashma's Personal Work",
    description:
      "Fashion illustrations, editorial sketches, garment construction, and creative design work — a journey through the atelier of Ashma Singh Thakuri.",
    icon: "palette",
    cover: "/gallery/${g1Cover}",
    coverAlt: "Adorning The Surficial — Graduation Collection Look 1",
    imageCount: gallery1.length,
    images: gallery1.map((path) => ({
      name: formatName(path),
      src: localSrc("", path),
    })),
  },
  {
    id: "students",
    title: "The Student Gallery",
    subtitle: "Work From the Classroom",
    description:
      "Avant-garde womenswear, menswear specsheets, AutoCAD renders, and portfolio pieces crafted by students under Ashma's mentorship at IEC College.",
    icon: "users",
    cover: "/gallery2/${g2Cover}",
    coverAlt: "Student Work — Womenswear Avant Garde",
    imageCount: gallery2.length,
    images: gallery2.map((path) => ({
      name: formatName(path),
      src: localSrc("2", path),
    })),
  },
];
`;

writeFileSync("src/data/gallery.ts", fileContent);
console.log("gallery1 count:", gallery1.length);
console.log("gallery2 count:", gallery2.length);
console.log("g1Cover:", g1Cover);
console.log("g2Cover:", g2Cover);
console.log("Data file regenerated.");
