import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Local Guides",
  description:
    "Meet Journey Kyrgyzstan's local guides and drivers who organize private mountain tours, cultural routes and custom trips across Kyrgyzstan.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Local Guides | Journey Kyrgyzstan",
    description:
      "Meet the local guides behind private tours, mountain adventures and cultural routes across Kyrgyzstan.",
    url: "/about",
    images: ["/about-bg.jpg"],
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
