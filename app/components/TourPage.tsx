import Image from "next/image";
import AvailabilityCalendar from "./AvailabilityCalendar";
import BookingForm from "./BookingForm";
import GoogleMapBlock from "./GoogleMapBlock";

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

  return (
    <main className="bg-white">
      <section className="relative h-[62vh] md:h-[72vh] flex items-center justify-center text-white text-center">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-200 text-base md:text-lg">{subtitle}</p>
        </div>
      </section>

      <section className="py-16 md:py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {mapQuery ? (
          <GoogleMapBlock title={title} query={mapQuery} />
        ) : (
          <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={mapImage ?? heroImage}
              alt={`${title} route`}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>
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

      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {days.map((day, index) => (
            <div key={day.title} className="grid md:grid-cols-2 gap-10 items-center">
              <div
                className={`relative h-[300px] md:h-[350px] rounded-xl overflow-hidden ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image src={day.image} alt={day.title} fill className="object-cover" />
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <h3 className="text-2xl font-bold mb-4 border-l-4 border-green-500 pl-3">
                  {day.title}
                </h3>
                <div className="text-gray-700 space-y-3">
                  {day.points.map((point) => (
                    <p key={point}>{point}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Tour Highlights
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img} className="relative h-40 rounded-xl overflow-hidden">
              <Image src={img} alt={title} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
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

      {slug && <AvailabilityCalendar tourSlug={slug} />}

      <BookingForm tour={title} tourSlug={slug} />
    </main>
  );
}
