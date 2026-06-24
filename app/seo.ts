export const siteConfig = {
  name: "Journey Kyrgyzstan",
  url: "https://journeykyrgyzstan.com",
  description:
    "Private tours in Kyrgyzstan with local guides, 4x4 vehicles, horseback adventures, alpine lakes, nomadic culture and custom routes from Bishkek.",
  ogImage: "/14.jpg",
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
