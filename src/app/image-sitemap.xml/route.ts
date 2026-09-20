import { galleries } from "@/data/gallery";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashmasinghthakuri.com";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&apos;",
        '\"': "&quot;",
      })[character] ?? character
  );

const imagePages = [
  {
    url: "/",
    images: [
      {
        src: "/profile.webp",
        title: "Ashma Singh Thakuri profile portrait",
        caption:
          "Ashma Singh Thakuri, fashion educator, digital illustrator, and editorial stylist",
      },
      {
        src: "/about.webp",
        title: "Ashma Singh Thakuri fashion educator",
        caption: "Ashma Singh Thakuri based in Nepal",
      },
    ],
  },
  ...galleries.map((gallery) => ({
    url: `/gallery/${gallery.id}`,
    images: gallery.images.map((image) => ({
      src: image.src,
      title: `${image.name} by Ashma Singh Thakuri`,
      caption: `${image.name}, part of Ashma Singh Thakuri's ${gallery.title}`,
    })),
  })),
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imagePages
  .map(
    (page) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${page.url}`)}</loc>
${page.images
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(`${SITE_URL}${image.src}`)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`
  )
  .join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}