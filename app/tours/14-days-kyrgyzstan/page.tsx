import TourPage from "../../components/TourPage";

export default function FourteenDaysKyrgyzstan() {
  return (
    <TourPage
      title="14 Days Across Kyrgyzstan"
      subtitle="An epic private 4x4 journey through alpine lakes, Silk Road monuments, canyons, hot springs, nomadic culture and the best landscapes of Kyrgyzstan."
      heroImage="/14.jpg"
      mapImage="/map3.jpeg"
      about={[
        "This long route brings together Chon-Kemin, Song-Kul, Tash-Rabat, Kel-Suu, Issyk-Kul, Karakol, Altyn-Arashan, Grigorievka and Semenovka gorges, and Cholpon-Ata.",
        "It is built for travelers who want the full country experience: high mountain roads, yurt camps, guesthouses, remote valleys, beach time and flexible stops with a local driver-guide.",
      ]}
      days={[
        {
          title: "Day 1 - Bishkek to Chon-Kemin",
          image: "/slide1.jpg",
          points: [
            "Depart Bishkek in the morning for a scenic drive to Chon-Kemin valley.",
            "🏛️ Visit Burana Tower and the ancient city of Balasagyn on the way.",
            "🌿 Arrive in Chon-Kemin, enjoy mountain landscapes, fresh air and a peaceful rural atmosphere.",
            "🍽️ Dinner and overnight stay in a cozy local guesthouse.",
          ],
        },
        {
          title: "Day 2 - Chon-Kemin to Song-Kul",
          image: "/day1.jpg",
          points: [
            "After breakfast, drive through Boom Gorge with panoramic stops on the road.",
            "🌊 Stop near Orto-Tokoi reservoir for photos and mountain views.",
            "🏔️ Continue to Song-Kul Lake, one of the most beautiful high-altitude lakes in Kyrgyzstan.",
            "🍽️ Dinner and overnight stay in a traditional yurt near the lake.",
          ],
        },
        {
          title: "Day 3 - Full Day at Song-Kul",
          image: "/horse.jpg",
          points: [
            "Wake up beside Song-Kul Lake and enjoy a calm morning in the mountains.",
            "🥾 Spend the day trekking or walking around the lake and alpine meadows.",
            "🐎 Optional horse riding with local nomads can be organized.",
            "🌄 Dinner and second overnight stay in a yurt camp under the stars.",
          ],
        },
        {
          title: "Day 4 - Song-Kul to Tash-Rabat",
          image: "/slide5.jpg",
          points: [
            "After breakfast, depart Song-Kul and drive toward the ancient Silk Road route.",
            "🏰 Visit Tash-Rabat caravanserai, a historic stone fortress hidden in the mountains.",
            "📸 Explore the valley and take photos around the old Silk Road monument.",
            "🍽️ Dinner and overnight stay in a yurt camp.",
          ],
        },
        {
          title: "Day 5 - Tash-Rabat to Kel-Suu",
          image: "/kel3.jpg",
          points: [
            "Depart Tash-Rabat and drive through the remote Aksai valley.",
            "🏔️ Enjoy wild mountain scenery and endless open landscapes on the road.",
            "🌿 Arrive at Kok-Kiya yurt camp near Kel-Suu Lake.",
            "🍵 Rest with tea, dinner and mountain views at the camp.",
          ],
        },
        {
          title: "Day 6 - Kel-Suu to Naryn",
          image: "/kel1.webp",
          points: [
            "Start the morning with trekking or horse riding to Kel-Suu Lake.",
            "🌊 Explore the dramatic alpine lake surrounded by high cliffs.",
            "📸 Take time for photos and quiet moments in one of Kyrgyzstan's most remote places.",
            "🚙 Drive to Naryn for a hotel night, hot shower and rest.",
          ],
        },
        {
          title: "Days 7-9 - Issyk-Kul South Shore and Karakol",
          image: "/4.jpg",
          points: [
            "Drive toward Issyk-Kul with stops near Orto-Tokoy reservoir and Bokonbaevo village.",
            "🦅 Watch a traditional eagle hunting show with local masters.",
            "🏜️ Explore Skazka Canyon, Barskoon waterfalls and the red rocks of Jeti-Oguz.",
            "🏨 Continue to Karakol for hotel overnight stays and city exploration.",
          ],
        },
        {
          title: "Days 10-11 - Altyn-Arashan and Ala-Kul",
          image: "/7.jpg",
          points: [
            "Take an off-road UAZ ride to Altyn-Arashan valley.",
            "♨️ Relax in natural hot springs surrounded by mountain peaks.",
            "🥾 Enjoy horse riding or trekking toward Ala-Kul panoramas, depending on weather and group level.",
            "🏨 Return to Karakol for dinner and hotel overnight.",
          ],
        },
        {
          title: "Days 12-14 - Gorges, Cholpon-Ata and Bishkek",
          image: "/2.jpg",
          points: [
            "Visit Grigorievka and Semenovka gorges on the way to Cholpon-Ata.",
            "🌊 Relax by Issyk-Kul Lake and enjoy beach time when the season allows.",
            "🪨 Optional visit to petroglyphs, a boat trip or a local cultural museum.",
            "🚙 Drive back to Bishkek with souvenir stops and finish the tour.",
          ],
        },
      ]}
    />
  );
}
