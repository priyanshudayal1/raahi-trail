import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/site";
import { getTripsFromDb } from "./lib/tripsDb";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trips = await getTripsFromDb();
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/trips"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...trips.map((trip) => ({
      url: absoluteUrl(`/trips/${trip.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: trip.image ? [trip.image] : undefined,
    })),
  ];
}
