export interface GalleryImage {
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
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%201.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%202.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%203.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%204.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%281%29.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%282%29.webp",
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection.webp",
  "An%20Incessant%20Flow%20of%20Time%20A.webp",
  "An%20Incessant%20Flow%20of%20Time%20Sketch%201.webp",
  "An%20Incessant%20Flow%20of%20Time%20Sketch%202.webp",
  "An%20Incessant%20Flow%20of%20Time%20Sketch%203.webp",
  "An%20Incessant%20Flow%20of%20Time_.webp",
  "Da%20Vinci%E2%80%99s%20Notebook%20Design%20Development.webp",
  "Da%20Vinci%E2%80%99s%20Notebook%20Final%20Garment.webp",
  "Da%20Vinci%E2%80%99s%20Notebook%20Final%20Rendering.webp",
  "Da%20Vinci%E2%80%99s%20Notebook.webp",
  "Da%20Vivci%E2%80%99s%20Notebook%20Design%20Development_.webp",
  "Digital%20Artistic%20Portrait%20%E2%80%9CThe%20Queen%E2%80%9D.webp",
  "Digital%20Artistic%20Portrait.webp",
  "Digital%20Artistic%20Surreal%20Portrait%20%E2%80%9CThe%20Hope%E2%80%9D.webp",
  "Digital%20Design%20of%20House%20Exterior.webp",
  "Digital%20Illustration%20into%20AI%20generated%20Image%281%29.webp",
  "Digital%20Illustration%20into%20AI%20generated%20Image.webp",
  "Fusion%20Tshirt%20Mockup%281%29.webp",
  "Fusion%20Tshirt%20Mockup%282%29.webp",
  "Fusion%20Tshirt%20Mockup.webp",
  "Hand%20Illustration%20Red%20Carpet%20Dress%20AI%20Generate%20Image.webp",
  "Hand%20Illustration%20Red%20Carpet%20Dress.webp",
  "Hand%20Illustration_%281%29.webp",
  "Hand%20Illustration_.webp",
  "Hand%20sketch%20color%20rendering.webp",
  "Hand%20Sketch%281%29.webp",
  "Hand%20Sketch%282%29.webp",
  "Hand%20Sketch%283%29.webp",
  "Hand%20Sketch%284%29.webp",
  "Hand%20Sketch.webp",
  "Hollywood%20Glam%20Color%20Board.webp",
  "Hollywood%20Glam%20Inspiration%20Board.webp",
  "Hollywood%20Glam%20Mood%20Board.webp",
  "Hollywood%20Glam%20Sketch%20%28Flat%29%201.webp",
  "Hollywood%20Glam%20Sketch%20%28Flat%29%202.webp",
  "Hollywood%20Glam%20Sketch%20%28Flat%29%203.webp",
  "Hollywood%20Glam%20Sketch%20%28Flat%29%204.webp",
  "Hollywood%20Glam%20Sketch%201.webp",
  "Hollywood%20Glam%20Sketch%202.webp",
  "Hollywood%20Glam%20Sketch%203.webp",
  "Hollywood%20Glam%20Sketch%204.webp",
  "Inspiring%20Bandipur%20S_S%202022%281%29.webp",
  "Inspiring%20Bandipur%20S_S%202022%282%29.webp",
  "Inspiring%20Bandipur%20S_S%202022%283%29.webp",
  "Inspiring%20Bandipur%20S_S%202022%284%29.webp",
  "Inspiring%20Bandipur%20S_S%202022.webp",
  "Logo%20Design%20for%20a%20Canadian%20Restaurant_.webp",
  "Menu%20Design%20for%20Restaurant_.webp",
  "Mood.webp",
  "Mural%20Painting%2C%20Hadigaun.webp",
  "Photography_.webp",
  "S_S%20Kids%20Wear%202020%281%29.webp",
  "S_S%20Kids%20Wear%202020%282%29.webp",
  "S_S%20Kids%20Wear%202020%283%29.webp",
  "S_S%20Kids%20Wear%202020%284%29.webp",
  "S_S%20Kids%20Wear%202020.webp",
  "S_S%20Kids%20Wear%202024.webp",
  "The%20Good%20Empty%20-Pen%20Art.webp",
  "Visiting%20Card%20design%20for%20Canadian%20restaurant_.webp",
];

const gallery2 = [
  "Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%201.webp",
  "An%20Incessant%20Flow%20of%20Time%20A%20%281%29.webp",
  "An%20Incessant%20Flow%20of%20Time%20A%20%282%29.webp",
  "An%20Incessant%20Flow%20of%20Time%20A.webp",
  "Auto_CAD.webp",
  "Auto_CAD_%281%29.webp",
  "Identity_Card_Design.webp",
  "Logo_Design.webp",
  "Logo_Design_%281%29.webp",
  "Logo_Design_%282%29.webp",
  "Magazine_style_mini_portfolio_1.webp",
  "Magazine_style_mini_portfolio_2.webp",
  "Magazine_style_mini_portfolio_3.webp",
  "Magazine_style_mini_portfolio_4.webp",
  "Pencil_Rendering.webp",
  "Pencil_Rendering_%281%29.webp",
  "Pencil_Rendering_%282%29.webp",
  "Pencil_Rendering_%283%29.webp",
  "PhotoSop_Basics.webp",
  "Swatch_Replication_.webp",
  "Visiting_Card_Desigm.webp",
  "Visiting_Card_Design.webp",
  "Womens_wear_Avant_Garde_18.webp",
  "Womens_wear_Avant_Garde_19.webp",
  "Womens_wear_Avant_Garde_20.webp",
  "Womens_wear_Avant_Garde_21.webp",
  "Womens_wear_Avant_Garde_22.webp",
];

const formatName = (encoded: string) => {
  const decoded = decodeURIComponent(encoded);
  const base = decoded.replace(/\.webp$/i, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\((\d+)\)/g, " $1")
    .trim();
};

const localSrc = (folder: string, encoded: string) => {
  return `/gallery${folder}/${encoded}`;
};

export const galleries: Gallery[] = [
  {
    id: "artistry",
    title: "The Artistry Collection",
    subtitle: "Ashma's Personal Work",
    description:
      "Fashion illustrations, editorial sketches, garment construction, and creative design work — a journey through the atelier of Ashma Singh Thakuri.",
    icon: "palette",
    cover: "/gallery/Adorning%20The%20Surficial%2C%20Graduation%20Collection%20Look%201.webp",
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
    cover: "/gallery2/Womens_wear_Avant_Garde_18.webp",
    coverAlt: "Student Work — Womenswear Avant Garde",
    imageCount: gallery2.length,
    images: gallery2.map((path) => ({
      name: formatName(path),
      src: localSrc("2", path),
    })),
  },
];
