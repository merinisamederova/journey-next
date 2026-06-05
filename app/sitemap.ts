import type { MetadataRoute } from "next";
import { tours } from "./data/tours";
import { absoluteUrl } from "./seo";
import { loadPublishedTours } from "./lib/tourStorage";

const staticRoutes = ["/", "/about", "/cars", "/gallery", "/reviews", "/tours"];
const extraTourRoutes = ["/tours/14-days-kyrgyzstan", "/tours/summits-of-kyrgyzstan"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const customTours = await loadPublishedTours();
  const tourRoutes = [...customTours, ...tours].map((tour) => `/tours/${tour.slug}`);

  return [...staticRoutes, ...tourRoutes, ...extraTourRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/tours") ? 0.9 : 0.7,
  }));
}
