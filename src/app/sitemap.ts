import type { MetadataRoute } from "next";
import { galleries } from "@/data/gallery";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashmasinghthakuri.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const galleryRoutes: MetadataRoute.Sitemap = galleries.map((g) => ({
    url: `${SITE_URL}/gallery/${g.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...galleryRoutes,
  ];
}
