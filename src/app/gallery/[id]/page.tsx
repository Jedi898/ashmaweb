import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { galleries } from "@/data/gallery";
import GalleryPage from "@/components/GalleryPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashmasinghthakuri.com";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return galleries.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const gallery = galleries.find((g) => g.id === id);
  if (!gallery) return { title: "Gallery Not Found" };
  const url = `${SITE_URL}/gallery/${gallery.id}`;
  return {
    title: gallery.title,
    description: gallery.description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "Ashma Singh Thakuri",
      title: `${gallery.title} | Ashma Singh Thakuri`,
      description: gallery.description,
      images: [{ url: gallery.cover, alt: gallery.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${gallery.title} | Ashma Singh Thakuri`,
      description: gallery.description,
      images: [gallery.cover],
    },
  };
}

export default async function GalleryDetailPage({ params }: Props) {
  const { id } = await params;
  const gallery = galleries.find((g) => g.id === id);
  if (!gallery) notFound();

  return (
    <main className="relative min-h-screen bg-[#0a0a0b] text-[#f5f0e8]">
      <div className="relative z-10">
        <GalleryPage gallery={gallery} />
      </div>
    </main>
  );
}

