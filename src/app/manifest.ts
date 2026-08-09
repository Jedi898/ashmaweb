import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ashma Singh Thakuri | Fashion Educator, Illustrator & Stylist",
    short_name: "Ashma Singh",
    description:
      "Portfolio of Ashma Singh Thakuri — Fashion Educator, Digital Illustrator & Editorial Stylist based in Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
{
        src: "/profile.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
