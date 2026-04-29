import TourPage from "../../components/TourPage";

export default function SongKulChonKeminTour() {
  return (
    <TourPage
      title="3-Day Adventure to Song-Kul Lake and Chon-Kemin Valley"
      subtitle="A balanced private tour with alpine lake scenery, nomadic culture, Chon-Kemin National Park and a yurt stay at Song-Kul."
      heroImage="/3.jpg"
      mapImage="/map.jpg"
      mapQuery="Song-Kul Lake and Chon-Kemin National Park, Kyrgyzstan"
      about={[
        "Explore the serene alpine beauty of Song-Kul Lake, a breathtaking high-mountain lake at 3,016 meters above sea level.",
        "Experience authentic Kyrgyz nomadic culture, meet local herders, and discover the lush landscapes of Chon-Kemin National Park.",
      ]}
      highlights={[
        "Song-Kul Lake yurt stay",
        "Chon-Kemin National Park",
        "Burana Tower stop",
        "Optional horse riding or easy hiking",
      ]}
      days={[
        {
          title: "Day 1 - Bishkek to Chon-Kemin Valley",
          image: "/slide3.jpg",
          points: [
            "Morning departure from Bishkek and stop at Burana Tower for exploration.",
            "🍵 Stop for local refreshments and panoramic photo opportunities.",
            "🌿 Arrive in Chon-Kemin National Park, a lush valley framed by mountains.",
            "🐎 Optional horseback riding or easy hiking in the surrounding area.",
            "🍽️ Overnight stay in a cozy guesthouse with a traditional Kyrgyz dinner.",
          ],
        },
        {
          title: "Day 2 - Chon-Kemin to Song-Kul Lake",
          image: "/horse.jpg",
          points: [
            "Traditional breakfast and departure for the highlands.",
            "🏔️ Drive through dramatic mountain passes and remote villages en route to Song-Kul.",
            "🌊 Arrive at the lake in the afternoon with time to explore alpine meadows.",
            "🐎 Horseback riding experience with local nomads can be organized.",
            "🍽️ Settle into a yurt camp and enjoy dinner with local hosts.",
          ],
        },
        {
          title: "Day 3 - Song-Kul Lake to Bishkek",
          image: "/day3.jpg",
          points: [
            "🌄 Early morning walk or horse ride along the lake for sunrise views.",
            "🍽️ Breakfast in the yurt camp and leisure time for photos.",
            "🚙 Depart back to Bishkek with scenic stops and lunch break on the way.",
            "Arrive in Bishkek by evening with beautiful memories from the highlands.",
          ],
        },
      ]}
    />
  );
}
