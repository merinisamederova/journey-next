import TourPage from "../../components/TourPage";

export default function SummitsOfKyrgyzstanTour() {
  return (
    <TourPage
      title="Summits of Kyrgyzstan"
      subtitle="Mountain programs with professional guides, equipment support and flexible routes for hiking, trekking and alpine objectives."
      heroImage="/5.jpg"
      mapImage="/17.jpg"
      about={[
        "Reach the summits of Kyrgyzstan with a professional team. The program is organized with experienced mountain guides and the equipment needed for the chosen route.",
        "This page is intentionally flexible: summit routes depend on season, weather, experience level and group goals. The team can adapt the plan for hiking, trekking or more technical mountain days.",
      ]}
      highlights={[
        "Professional mountain guides",
        "Equipment support for the selected route",
        "Custom hiking, trekking and alpinism programs",
        "Private transport and route planning from Bishkek",
      ]}
      days={[
        {
          title: "Step 1 - Plan the Route",
          image: "/18.jpg",
          points: [
            "Choose the mountain region and difficulty level with the guide team.",
            "🧭 Confirm season, weather window, equipment and transport needs.",
            "🎒 Prepare the route around your experience, fitness level and goals.",
            "🍽️ Final meeting with the guide team before departure.",
          ],
        },
        {
          title: "Step 2 - Acclimatization and Approach",
          image: "/15.jpg",
          points: [
            "Drive from Bishkek toward the chosen mountain area.",
            "🥾 Use the approach day for easy hiking, acclimatization and safety briefing.",
            "🏕️ Settle into camp or a mountain guesthouse depending on the route.",
            "🎒 Prepare equipment and check conditions with the guide.",
          ],
        },
        {
          title: "Step 3 - Summit or Trekking Day",
          image: "/16.jpg",
          points: [
            "🌄 Start early with the guide team and follow the safest route for the day.",
            "🏔️ Enjoy summit views, alpine terrain or a strong trekking objective.",
            "🍵 Return to camp for rest, tea and a warm meal.",
            "🚙 Drive back to Bishkek depending on the route plan.",
          ],
        },
      ]}
      activities={["Hiking", "Trekking", "Alpinism", "Offroad", "Mountain Views", "Custom Routes"]}
      services={["Guide", "Driver", "Gas", "Route Planning", "Equipment Support", "Safety Briefing"]}
      note="Final route, price and included equipment depend on the chosen summit, season and group experience."
    />
  );
}
