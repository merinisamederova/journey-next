import type { Metadata } from "next";
import BackHomeButton from "./components/BackHomeButton";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://journey-kyrgyzstan.vercel.app"),
  title: {
    default: "Journey Kyrgyzstan | Private Tours in Kyrgyzstan",
    template: "%s | Journey Kyrgyzstan",
  },
  description:
    "Private tours in Kyrgyzstan with local guides, 4x4 vehicles, horseback adventures, alpine lakes, nomadic culture and custom routes from Bishkek.",
  keywords: [
    "Kyrgyzstan tours",
    "private tours Kyrgyzstan",
    "Song-Kul tour",
    "Kel-Suu tour",
    "Issyk-Kul tour",
    "Kyrgyzstan travel",
    "Bishkek tours",
  ],
  openGraph: {
    title: "Journey Kyrgyzstan | Private Tours in Kyrgyzstan",
    description:
      "Explore Kyrgyzstan with private routes, local guides, mountain lakes, yurt stays, horseback riding and 4x4 adventures.",
    url: "https://journey-kyrgyzstan.vercel.app",
    siteName: "Journey Kyrgyzstan",
    images: [
      {
        url: "/14.jpg",
        width: 1200,
        height: 630,
        alt: "Journey Kyrgyzstan mountain tour",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Kyrgyzstan | Private Tours in Kyrgyzstan",
    description:
      "Private tours, local guides, alpine lakes, yurt stays and custom routes across Kyrgyzstan.",
    images: ["/14.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <BackHomeButton />
      </body>
    </html>
  );
}
