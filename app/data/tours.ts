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
    slug: "kel-suu",
    title: "Kel-Suu Lake Expedition (3 Days)",
    subtitle:
      "Discover one of the most remote and breathtaking alpine lakes in Kyrgyzstan.",
    heroImage: "/kel1.webp",
    mapQuery: "Kel-Suu Lake, Kyrgyzstan",
    about: [
      "Kel-Suu Lake is a hidden alpine lake near the Chinese border, surrounded by dramatic cliffs and untouched wilderness.",
      "This expedition is perfect for travelers seeking adventure, isolation and truly unique landscapes.",
    ],
    days: [
      {
        title: "Day 1 - Bishkek to Song-Kul Lake",
        image: "/kel2.jpg",
        points: [
          "Early morning departure from Bishkek city and visit Burana Tower on the way.",
          "Stop near Orto-Tokoy water reservoir for photos and mountain views.",
          "Lunch with beautiful scenery around the reservoir.",
          "Drive to Song-Kul Lake, meet local people and explore the area.",
          "Short trekking and dinner in a national yurt with Kyrgyz food.",
        ],
      },
      {
        title: "Day 2 - Song-Kul to Kel-Suu Lake",
        image: "/kel3.jpg",
        points: [
          "Early morning departure from Song-Kul Lake to Kel-Suu Lake.",
          "The road takes around four hours through remote mountain landscapes.",
          "Stop near the Ak-Sai river on the way.",
          "Horse riding to Kel-Suu Lake through Kok-Kiya valley.",
        ],
      },
      {
        title: "Day 3 - Kel-Suu to Bishkek",
        image: "/kel4.jpg",
        points: [
          "After breakfast, take a short hike and enjoy the scenery of Kok-Kiya valley.",
          "Capture final photos of the cliffs, valley and alpine landscapes.",
          "Drive back to Bishkek city.",
        ],
      },
    ],
    activities: ["Trekking", "Horseback Riding", "Yurt Stay", "Culture", "History", "Cuisine", "Camping"],
    services: ["Guide", "Driver", "Gas", "Breakfast", "Lunch", "Dinner", "Accommodation"],
  },
  {
    slug: "song-kul",
    title: "4-Day Horseback Adventure to Song-Kul Lake",
    subtitle:
      "Ride through mountains, live like nomads and explore one of the most beautiful lakes in Kyrgyzstan.",
    heroImage: "/horse.jpg",
    mapQuery: "Song-Kul Lake, Kyrgyzstan",
    about: [
      "Ride through alpine valleys and breathtaking mountain passes before sleeping in traditional yurts beneath wide open skies.",
      "This route is built around horseback riding, nomadic culture and slow days in the highlands beside Song-Kul Lake.",
    ],
    days: [
      {
        title: "Day 1 - Bishkek to Kyzart and Kilemche",
        image: "/day1.jpg",
        points: [
          "Depart Bishkek in the morning for a scenic drive to Kyzart village, around five hours.",
          "Lunch with a local family upon arrival.",
          "In the afternoon, saddle up for your first horseback ride through rolling pastures and alpine trails to Kilemche Valley.",
          "Arrive at a cozy yurt camp hosted by local shepherds.",
          "Dinner and overnight stay in a yurt under the stars.",
        ],
      },
      {
        title: "Day 2 - Kilemche to Song-Kul Lake",
        image: "/day2.jpg",
        points: [
          "After breakfast, continue the journey on horseback over Tuz-Ashuu Pass.",
          "Enjoy panoramic views as Song-Kul Lake appears in the distance.",
          "Arrive at the shores of Song-Kul, a pristine alpine lake at 3,016 meters above sea level.",
          "Lunch at the yurt camp and free afternoon to relax, walk along the lake or visit local herders.",
          "Dinner and overnight in yurts beside the lake.",
        ],
      },
      {
        title: "Day 3 - Lakeside Ride to Kyrjol Camp",
        image: "/day3.jpg",
        points: [
          "Enjoy a calm morning at Song-Kul before beginning a lakeside ride from Tuz-Ashuu to Kyrjol camp.",
          "The route offers new vistas and a deeper connection to the lake's quiet beauty.",
          "Lunch upon arrival, with a free afternoon to rest, read or explore.",
          "Dinner and another peaceful overnight in yurts with a view of the wide-open steppe.",
        ],
      },
      {
        title: "Day 4 - Kyrjol to Kyzart and Bishkek",
        image: "/day4.jpg",
        points: [
          "After breakfast, mount your horse for the final ride back to Kyzart village.",
          "Enjoy a farewell lunch with local hosts.",
          "After lunch, return by vehicle to Bishkek, arriving in the evening with unforgettable memories.",
        ],
      },
    ],
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
