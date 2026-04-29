import TourPage from "../../components/TourPage";

export default function IssykKulThreeDaysTour() {
  return (
    <TourPage
      title="Issyk-Kul Lake 3 Days"
      subtitle="A compact private route around Kyrgyzstan's great alpine lake: Cholpon-Ata, Karakol, Jety-Oguz, Barskoon and Skazka Canyon."
      heroImage="/2.jpg"
      mapImage="/map3.jpg"
      mapQuery="Issyk-Kul Lake, Kyrgyzstan"
      about={[
        "This three-day Issyk-Kul route starts and ends in Bishkek and is designed for travelers who want lake views, canyons, waterfalls, red rocks and cultural stops in one smooth trip.",
        "The tour includes transportation, accommodation, three meals per day and English-speaking guides. Price starts from 300 Euro per person depending on group size.",
      ]}
      highlights={[
        "Bishkek - Cholpon-Ata - Karakol - Jety-Oguz - Barskoon - Skazka Canyons - Bishkek",
        "Accommodation and three meals per day included",
        "English-speaking guides",
      ]}
      days={[
        {
          title: "Day 1 - Bishkek to Cholpon-Ata",
          image: "/21.jpg",
          points: [
            "Depart Bishkek and drive toward the northern shore of Issyk-Kul Lake.",
            "🌊 Enjoy lake views, photo stops and time around Cholpon-Ata.",
            "🪨 Optional cultural stops can include petroglyphs, museums or a boat ride depending on the season.",
            "🍽️ Dinner and overnight stay near Issyk-Kul Lake.",
          ],
        },
        {
          title: "Day 2 - Karakol, Jety-Oguz and Barskoon",
          image: "/19.jpg",
          points: [
            "Continue toward Karakol and explore the eastern side of Issyk-Kul.",
            "🏜️ Visit Jety-Oguz red rocks and the Seven Bulls formation.",
            "💧 See Barskoon valley and waterfalls when conditions allow.",
            "🏨 Arrive in Karakol for dinner and overnight stay.",
          ],
        },
        {
          title: "Day 3 - Skazka Canyon and Return to Bishkek",
          image: "/20.jpg",
          points: [
            "🏜️ Explore Skazka Canyon, also known as Fairytale Canyon.",
            "📸 Drive along the south shore with scenic stops and lake views.",
            "🍽️ Stop for lunch on the way back to Bishkek.",
            "Return to Bishkek by evening.",
          ],
        },
      ]}
      activities={["Sightseeing", "Culture", "History", "Cuisine", "Canyons", "Lake Views"]}
    />
  );
}
