import manifest from "@/data/image-manifest.json";

export interface ImageInfo {
  width: number;
  height: number;
  thumb: string;
  blurDataUrl: string;
}

export function getImageInfo(src: string): ImageInfo | undefined {
  // Manifest keys are raw disk filenames (unencoded); src is percent-encoded.
  const decoded = normalizeSrc(src);
  const record = manifest as Record<string, ImageInfo>;
  return record[decoded] ?? record[src];
}

export function getAspectRatio(src: string): string {
  const info = getImageInfo(src);
  if (!info) return "4/5";
  return `${info.width}/${info.height}`;
}

/** Decode a percent-encoded filename to a raw path for matching the manifest */
export function normalizeSrc(src: string): string {
  try {
    return decodeURIComponent(src);
  } catch {
    return src;
  }
}
