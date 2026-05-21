import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kyrgyzstan Tour Gallery",
  description:
    "Photos from private tours across Kyrgyzstan: alpine lakes, canyons, yurt camps, horses, mountains and nomadic landscapes.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Kyrgyzstan Tour Gallery | Journey Kyrgyzstan",
    description:
      "Explore photos from private tours across Kyrgyzstan's lakes, mountains, canyons and nomadic routes.",
    url: "/gallery",
    images: ["/g1.webp"],
  },
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
