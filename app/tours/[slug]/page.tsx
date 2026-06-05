import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TourPage from "../../components/TourPage";
import { loadPublishedTour } from "../../lib/tourStorage";

type DynamicTourPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: DynamicTourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await loadPublishedTour(slug);

  if (!tour) {
    return {
      title: "Tour not found",
    };
  }

  return {
    title: tour.title,
    description: tour.subtitle,
    alternates: {
      canonical: `/tours/${tour.slug}`,
    },
    openGraph: {
      title: `${tour.title} | Journey Kyrgyzstan`,
      description: tour.subtitle,
      url: `/tours/${tour.slug}`,
      images: [tour.heroImage],
    },
  };
}

export default async function DynamicTourPage({ params }: DynamicTourPageProps) {
  const { slug } = await params;
  const tour = await loadPublishedTour(slug);

  if (!tour) {
    notFound();
  }

  return <TourPage {...tour} />;
}
