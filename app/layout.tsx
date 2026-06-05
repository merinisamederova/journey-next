import type { Metadata } from "next";
import type { HeaderTourLink } from "./components/Header";
import BackHomeButton from "./components/BackHomeButton";
import Header from "./components/Header";
import "./globals.css";
import { tours } from "./data/tours";
import { loadPublishedTours } from "./lib/tourStorage";
import { absoluteUrl, siteConfig } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | Private Tours in Kyrgyzstan`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Kyrgyzstan tours",
    "private tours Kyrgyzstan",
    "Song-Kul tour",
    "Kel-Suu tour",
    "Issyk-Kul tour",
    "Kyrgyzstan travel",
    "Bishkek tours",
  ],
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
  icons: {
    icon: [
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", sizes: "48x48 96x96" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: `${siteConfig.name} | Private Tours in Kyrgyzstan`,
    description:
      "Explore Kyrgyzstan with private routes, local guides, mountain lakes, yurt stays, horseback riding and 4x4 adventures.",
    url: "/",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
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
    title: `${siteConfig.name} | Private Tours in Kyrgyzstan`,
    description:
      "Private tours, local guides, alpine lakes, yurt stays and custom routes across Kyrgyzstan.",
    images: [siteConfig.ogImage],
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  logo: absoluteUrl("/logo.jpg"),
  image: absoluteUrl(siteConfig.ogImage),
  areaServed: {
    "@type": "Country",
    name: "Kyrgyzstan",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "KG",
    addressLocality: "Bishkek",
  },
  sameAs: [
    "https://www.instagram.com/kyrgyzstan.journey/",
    "https://www.facebook.com/Journey.KG",
    "https://www.youtube.com/@journey.kyrgyzstan",
  ],
};

const extraTourLinks: HeaderTourLink[] = [
  { href: "/tours/14-days-kyrgyzstan", label: "14 Days Across Kyrgyzstan" },
  { href: "/tours/summits-of-kyrgyzstan", label: "Summits of Kyrgyzstan" },
];

function uniqueTourLinks(links: HeaderTourLink[]) {
  const seen = new Set<string>();

  return links.filter((link) => {
    if (seen.has(link.href)) {
      return false;
    }

    seen.add(link.href);
    return true;
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const customTours = await loadPublishedTours();
  const tourLinks = uniqueTourLinks([
    ...tours.map((tour) => ({
      href: `/tours/${tour.slug}`,
      label: tour.title,
    })),
    ...extraTourLinks,
    ...customTours.map((tour) => ({
      href: `/tours/${tour.slug}`,
      label: tour.title,
    })),
  ]);

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <Header tourLinks={tourLinks} />
        {children}
        <BackHomeButton />
      </body>
    </html>
  );
}
