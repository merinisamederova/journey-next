import type { MetadataRoute } from "next";
import { tours } from "./data/tours";
import { absoluteUrl } from "./seo";

const staticRoutes = ["/", "/about", "/cars", "/gallery", "/reviews", "/tours"];
const extraTourRoutes = ["/tours/14-days-kyrgyzstan", "/tours/summits-of-kyrgyzstan"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const tourRoutes = tours.map((tour) => `/tours/${tour.slug}`);

  return [...staticRoutes, ...tourRoutes, ...extraTourRoutes].map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/tours") ? 0.9 : 0.7,
  }));
}
