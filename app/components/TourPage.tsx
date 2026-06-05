import Image from "next/image";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingForm from "./BookingForm";
import GoogleMapBlock from "./GoogleMapBlock";
import { absoluteUrl, siteConfig } from "../seo";

type Day = {
  title: string;
  image: string;
  points: string[];
};

type TourPageProps = {
  slug?: string;
  title: string;
  subtitle: string;
  heroImage: string;
  mapImage?: string;
  mapQuery?: string;
  aboutTitle?: string;
  about: string[];
  days: Day[];
  highlights?: string[];
  activities?: string[];
  services?: string[];
  note?: string;
};

const faqs = [
  {
    question: "Can the tour be customized?",
    answer:
      "Yes. Routes, pace, accommodation and activities can be adjusted for private groups depending on the season and road conditions.",
  },
  {
    question: "Do I need previous horse riding or trekking experience?",
    answer:
      "Most tours are suitable for beginners. For horseback routes, local guides help choose calm horses and adjust the route to the group's level.",
  },
  {
    question: "What should I bring?",
    answer:
      "Warm layers, comfortable shoes, sun protection, a reusable water bottle, personal medicine and a power bank are recommended for mountain tours.",
  },
  {
    question: "What happens if the weather changes?",
    answer:
      "Mountain weather can change quickly. The guide may adjust timing, stops or activities to keep the trip comfortable and safe.",
  },
];

const defaultActivities = [
  "Trekking",
  "Horseback Riding",
  "Yurt Stay",
  "Offroad",
  "Culture",
  "History",
  "Cuisine",
];

const defaultServices = [
  "Guide",
  "Driver",
  "Gas",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Accommodation",
  "Entrance Tickets",
];

function FillImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return <Image src={src} alt={alt} fill className={className} priority={priority} />;
}

export default function TourPage({
  title,
  slug,
  subtitle,
  heroImage,
  mapImage,
  mapQuery,
  aboutTitle = "About the Tour",
  about,
  days,
  highlights = [],
  activities = defaultActivities,
  services = defaultServices,
  note = "Alcohol and beverages are not included. Horse riding can be organized when it is not included in the base price.",
}: TourPageProps) {
  const galleryImages = [heroImage, ...days.map((day) => day.image)].slice(0, 4);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: subtitle,
    url: slug ? absoluteUrl(`/tours/${slug}`) : siteConfig.url,
    image: absoluteUrl(heroImage),
    touristType: "Private travelers",
    provider: {
      "@type": "TravelAgency",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    itinerary: days.map((day, index) => ({
      "@type": "ItemList",
      position: index + 1,
      name: day.title,
      itemListElement: day.points.map((point, pointIndex) => ({
        "@type": "ListItem",
        position: pointIndex + 1,
        name: point,
      })),
    })),
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="relative h-[58vh] min-h-[440px] md:h-[68vh] flex items-center justify-center text-white text-center">
        <FillImage
          src={heroImage}
          alt={title}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-gray-200 text-base md:text-lg leading-relaxed">{subtitle}</p>
        </div>
      </section>

      <section className="py-14 md:py-18 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {mapQuery ? (
          <GoogleMapBlock title={title} query={mapQuery} />
        ) : (
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <FillImage
              src={mapImage ?? heroImage}
              alt={`${title} route`}
              className="object-cover"
            />
          </div>
        )}

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
            Tour overview
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{aboutTitle}</h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            {about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {highlights.length > 0 && (
            <ul className="mt-6 space-y-2 text-gray-700">
              {highlights.map((highlight) => (
                <li key={highlight} className="border-l-4 border-green-500 pl-3">
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
              Route
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">Itinerary</h2>
          </div>

          <div className="space-y-14 md:space-y-16">
          {days.map((day, index) => (
            <div key={day.title} className="grid md:grid-cols-2 gap-10 items-center">
              <div
                className={`relative h-[300px] md:h-[350px] rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <FillImage src={day.image} alt={day.title} className="object-cover" />
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-2xl font-bold mb-4 border-l-4 border-green-500 pl-3">
                  {day.title}
                </h3>
                <div className="text-gray-700 space-y-3 leading-relaxed">
                  {day.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Tour Highlights
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img} className="relative h-40 md:h-48 rounded-xl overflow-hidden">
              <FillImage src={img} alt={title} className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12 md:py-14">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h4 className="font-semibold mb-3">Included activities:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              {activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Included services:</h4>
            <ul className="text-gray-600 space-y-1 text-sm">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">{note}</p>
        </div>
      </section>

      <section className="py-14 md:py-16 max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700 mb-2">
            Good to know
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">FAQ</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {slug && <AvailabilityCalendar tourSlug={slug} />}

      <BookingForm tour={title} tourSlug={slug} />
    </main>
  );
}
