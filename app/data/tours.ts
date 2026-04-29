export type TourDay = {
  title: string;
  image: string;
  points: string[];
};

export type TourContent = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  mapImage?: string;
  mapQuery?: string;
  about: string[];
  highlights?: string[];
  days: TourDay[];
  activities?: string[];
  services?: string[];
  note?: string;
};

export const tours: TourContent[] = [
  {
    slug: "issyk-kul-3-days",
    title: "Issyk-Kul Lake 3 Days",
    subtitle:
      "A compact private route around Kyrgyzstan's great alpine lake: Cholpon-Ata, Karakol, Jety-Oguz, Barskoon and Skazka Canyon.",
    heroImage: "/2.jpg",
    mapImage: "/map3.jpg",
    mapQuery: "Issyk-Kul Lake, Kyrgyzstan",
    about: [
      "This three-day Issyk-Kul route starts and ends in Bishkek and is designed for travelers who want lake views, canyons, waterfalls, red rocks and cultural stops in one smooth trip.",
      "The tour includes transportation, accommodation, three meals per day and English-speaking guides. Price starts from 300 Euro per person depending on group size.",
    ],
    highlights: [
      "Bishkek - Cholpon-Ata - Karakol - Jety-Oguz - Barskoon - Skazka Canyons - Bishkek",
      "Accommodation and three meals per day included",
      "English-speaking guides",
    ],
    days: [
      {
        title: "Day 1 - Bishkek to Cholpon-Ata",
        image: "/21.jpg",
        points: [
          "Depart Bishkek and drive toward the northern shore of Issyk-Kul Lake.",
          "Enjoy lake views, photo stops and time around Cholpon-Ata.",
          "Optional cultural stops can include petroglyphs, museums or a boat ride depending on the season.",
          "Dinner and overnight stay near Issyk-Kul Lake.",
        ],
      },
      {
        title: "Day 2 - Karakol, Jety-Oguz and Barskoon",
        image: "/19.jpg",
        points: [
          "Continue toward Karakol and explore the eastern side of Issyk-Kul.",
          "Visit Jety-Oguz red rocks and the Seven Bulls formation.",
          "See Barskoon valley and waterfalls when conditions allow.",
          "Arrive in Karakol for dinner and overnight stay.",
        ],
      },
      {
        title: "Day 3 - Skazka Canyon and Return to Bishkek",
        image: "/20.jpg",
        points: [
          "Explore Skazka Canyon, also known as Fairytale Canyon.",
          "Drive along the south shore with scenic stops and lake views.",
          "Stop for lunch on the way back to Bishkek.",
          "Return to Bishkek by evening.",
        ],
      },
    ],
    activities: ["Sightseeing", "Culture", "History", "Cuisine", "Canyons", "Lake Views"],
  },
  {
    slug: "song-kul-chon-kemin",
    title: "3-Day Adventure to Song-Kul Lake and Chon-Kemin Valley",
    subtitle:
      "A balanced private tour with alpine lake scenery, nomadic culture, Chon-Kemin National Park and a yurt stay at Song-Kul.",
    heroImage: "/3.jpg",
    mapImage: "/map.jpg",
    mapQuery: "Song-Kul Lake and Chon-Kemin National Park, Kyrgyzstan",
    about: [
      "Explore the serene alpine beauty of Song-Kul Lake, a breathtaking high-mountain lake at 3,016 meters above sea level.",
      "Experience authentic Kyrgyz nomadic culture, meet local herders, and discover the lush landscapes of Chon-Kemin National Park.",
    ],
    highlights: [
      "Song-Kul Lake yurt stay",
      "Chon-Kemin National Park",
      "Burana Tower stop",
      "Optional horse riding or easy hiking",
    ],
    days: [
      {
        title: "Day 1 - Bishkek to Chon-Kemin Valley",
        image: "/slide3.jpg",
        points: [
          "Morning departure from Bishkek and stop at Burana Tower for exploration.",
          "Stop for local refreshments and panoramic photo opportunities.",
          "Arrive in Chon-Kemin National Park, a lush valley framed by mountains.",
          "Optional horseback riding or easy hiking in the surrounding area.",
          "Overnight stay in a cozy guesthouse with a traditional Kyrgyz dinner.",
        ],
      },
      {
        title: "Day 2 - Chon-Kemin to Song-Kul Lake",
        image: "/horse.jpg",
        points: [
          "Traditional breakfast and departure for the highlands.",
          "Drive through dramatic mountain passes and remote villages en route to Song-Kul.",
          "Arrive at the lake in the afternoon with time to explore alpine meadows.",
          "Horseback riding experience with local nomads can be organized.",
          "Settle into a yurt camp and enjoy dinner with local hosts.",
        ],
      },
      {
        title: "Day 3 - Song-Kul Lake to Bishkek",
        image: "/day3.jpg",
        points: [
          "Early morning walk or horse ride along the lake for sunrise views.",
          "Breakfast in the yurt camp and leisure time for photos.",
          "Depart back to Bishkek with scenic stops and lunch break on the way.",
          "Arrive in Bishkek by evening with beautiful memories from the highlands.",
        ],
      },
    ],
  },
];

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}
