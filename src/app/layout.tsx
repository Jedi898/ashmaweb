import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashmasinghthakuri.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ashma Singh Thakuri | Fashion Educator, Illustrator & Stylist",
    template: "%s | Ashma Singh Thakuri",
  },
  description:
    "Ashma Singh Thakuri (also known as Ashma Singh) is a Nepal-based fashion educator, digital illustrator, and editorial stylist. She teaches fashion design at IEC College of Art & Fashion and led styling presentations for Mr. Nepal 2024.",
  keywords: [
    "fashion educator",
    "fashion illustrator",
    "editorial stylist",
    "Ashma Singh Thakuri",
    "Nepal fashion",
    "IEC College",
    "fashion design",
    "digital illustration",
    "Ashma Singh",
    "Mr. Nepal 2024 stylist",
  ],
  applicationName: "Ashma Singh Thakuri",
  authors: [{ name: "Ashma Singh Thakuri" }],
  creator: "Ashma Singh Thakuri",
  publisher: "Ashma Singh Thakuri",
  category: "Portfolio",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ashma Singh Thakuri",
    title: "Ashma Singh Thakuri | Fashion Portfolio",
    description:
      "Ashma Singh Thakuri is a Nepal-based Fashion Educator, Digital Illustrator, and Editorial Stylist.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Ashma Singh Thakuri — Fashion Educator, Illustrator & Stylist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashma Singh Thakuri | Fashion Portfolio",
    description:
      "Ashma Singh Thakuri is a Nepal-based Fashion Educator, Digital Illustrator, and Editorial Stylist.",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/profile.webp",
    apple: "/profile.webp",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Ashma Singh",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
};

// Structured data — lets search engines understand the site & person.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Ashma Singh Thakuri",
      url: SITE_URL,
      description:
        "Portfolio of Ashma Singh Thakuri — Fashion Educator, Digital Illustrator & Editorial Stylist.",
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "About Ashma Singh Thakuri",
      description:
        "Professional profile of Ashma Singh Thakuri, including her fashion education experience, styling work, achievements, and academic background.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ashma Singh Thakuri",
      alternateName: "Ashma Singh",
      givenName: "Ashma",
      familyName: "Singh Thakuri",
      jobTitle: ["Fashion Educator", "Digital Illustrator", "Editorial Stylist"],
      description:
        "Ashma Singh Thakuri is a Nepal-based Fashion Educator, Digital Illustrator, and Editorial Stylist. She is a Fashion Design Instructor at IEC College of Art & Fashion and was the Official Styling Presentation Leader for Mr. Nepal 2024.",
      url: SITE_URL,
      image: `${SITE_URL}/profile.webp`,
      nationality: "Nepal",
      homeLocation: { "@type": "Country", name: "Nepal" },
      worksFor: {
        "@type": "CollegeOrUniversity",
        name: "IEC College of Art & Fashion",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "IEC College of Art & Fashion",
          sameAs: "https://iec.edu.np/",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Limkokwing University of Creative Technology",
        },
      ],
      sameAs: [
        "https://instagram.com/ashmasinght",
        "https://t.me/+9779707498890",
      ],
      hasOccupation: [
        {
          "@type": "Occupation",
          name: "Fashion Design Instructor",
          occupationLocation: { "@type": "Country", name: "Nepal" },
          skills: "Fashion design, fashion illustration, garment design, and portfolio development",
        },
        {
          "@type": "Occupation",
          name: "Editorial Stylist",
          occupationLocation: { "@type": "Country", name: "Nepal" },
          skills: "Editorial styling, wardrobe direction, and visual storytelling",
        },
      ],
      knowsAbout: [
        "Fashion Illustration",
        "Garment Construction",
        "Digital Illustration",
        "Editorial Styling",
        "Fashion Education",
        "Womenswear",
        "Menswear",
        "Kidswear",
      ],
      subjectOf: {
        "@type": "CreativeWork",
        name: "Official styling presentations for Mr. Nepal 2024",
        description:
          "Ashma Singh Thakuri led official styling presentations and creative wardrobe direction for the Mr. Nepal 2024 platform.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.variable} ${playfairDisplay.variable} min-h-full bg-[#0a0a0b] text-[#f5f0e8] font-sans antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
