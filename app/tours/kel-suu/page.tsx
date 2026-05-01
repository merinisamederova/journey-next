"use client";

import Image from "next/image"; 
import AvailabilityCalendar from "../../components/AvailabilityCalendar";
import BookingForm from "../../components/BookingForm";
import GoogleMapBlock from "../../components/GoogleMapBlock";

export default function KelSuuTour() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-white text-center">

        <Image
          src="/kel1.webp"
          alt="Kel-Suu Lake"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Kel-Suu Lake Expedition (3 Days)
          </h1>

          <p className="text-gray-200">
            Discover one of the most remote and breathtaking lakes in Kyrgyzstan.
          </p>
        </div>

      </section>


      {/* ABOUT + MAP */}
      <section className="py-16 md:py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <GoogleMapBlock title="Kel-Suu Lake" query="Kel-Suu Lake, Kyrgyzstan" />

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            About the Tour
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Kel-Suu Lake is a hidden alpine lake near the Chinese border, surrounded
            by dramatic cliffs and untouched wilderness.
          </p>

          <p className="text-gray-600 leading-relaxed">
            This expedition is perfect for travelers seeking adventure, isolation,
            and truly unique landscapes.
          </p>
        </div>

      </section>


      {/* ITINERARY */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* DAY 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <Image src="/kel2.jpg" alt="Day 1" fill className="object-cover" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 border-l-4 border-green-500 pl-3">
                Day 1
              </h3>

              <div className="text-black-600 space-y-3">
                <p>Early morning departure from Bishkek city, visit the Burana tower on the way</p>
                <p>Stop near Orto-Tokoy water reservoir</p>
                <p>Lunch with a beautiful scenery to the Reservoir</p>
                <p>Drive to Song-kul lake where we will meet local people, explore the area, take a pictures</p>
                <p>Have a short trecking and dinner in national yurt where we will taste amazing Kyrgyz Food.</p>
              </div>
            </div>

          </div>


          {/* DAY 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-3 border-l-4 border-green-500 pl-3">
                Day 2
              </h3>

              <div className="text-black-600 space-y-3">
                <p>Early morning departure from the Songkul lake to the Kelsuu lake.</p>
                <p>Road will be 4 hours.</p>
                <p>On the way we will stop near Ak-sai river.</p>
                <p>Horseriding to the Kelsuu lake over Kok-kiya valley!</p>
              </div>
            </div>

            <div className="relative h-[300px] rounded-xl overflow-hidden order-1 md:order-2">
              <Image src="/kel3.jpg" alt="Day 2" fill className="object-cover" />
            </div>

          </div>


          {/* DAY 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="relative h-[300px] rounded-xl overflow-hidden">
              <Image src="/kel4.jpg" alt="Day 3" fill className="object-cover" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 border-l-4 border-green-500 pl-3">
                Day 3
              </h3>

              <div className="text-black-600 space-y-3">
                <p>After a nice sleep, we will have alittle hike and capture amazing scenery of the Kok-kiya valley and we will head to the Bishkek city.</p>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* GALLERY */}
      <section className="py-16 max-w-6xl mx-auto px-6">

        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Tour Highlights
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {["/kel1.webp", "/kel2.jpg", "/kel3.jpg", "/kel4.jpg"].map((img, i) => (
            <div key={i} className="relative h-40 rounded-xl overflow-hidden">
              <Image src={img} alt="kel suu" fill className="object-cover" />
            </div>
          ))}

        </div>

      </section>


      <AvailabilityCalendar tourSlug="kel-suu" />

      <BookingForm tour="Kel-Suu Lake Expedition (3 Days)" tourSlug="kel-suu" />


      {/* FOOTER */}
<footer className="bg-gray-100 py-12 mt-16">

  <div className="max-w-6xl mx-auto px-6">

    {/* TOP PART */}
    <div className="grid md:grid-cols-3 gap-8 items-start mb-10">

      {/* Included activities */}
      <div>
        <h4 className="font-semibold mb-3">Included activities:</h4>
        <ul className="text-gray-600 space-y-1 text-sm">
          <li>Trekking</li>
          <li>Horseback Riding</li>
          <li>Yurt Stay</li>
          <li>Culture</li>
          <li>History</li>
          <li>Cuisine</li>
          <li>Camping</li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="font-semibold mb-3">Included services:</h4>
        <ul className="text-gray-600 space-y-1 text-sm">
          <li>Guide</li>
          <li>Driver</li>
          <li>Gas</li>
          <li>Breakfast</li>
          <li>Lunch</li>
          <li>Dinner</li>
          <li>Accommodation</li>
        </ul>
      </div>

      {/* Social */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4">

  <p className="font-medium text-center md:text-left">
    Watch a video about trip on our youtube and instagram 👉
  </p>

  <div className="flex gap-4">

    {/* YouTube */}
    <a
      href="https://www.youtube.com/watch?v=FvKYjPolw88"
      target="_blank"
    >
      <Image
        src="/youtube.png"
        alt="YouTube"
        width={40}
        height={40}
        className="hover:scale-110 transition"
      />
    </a>

    {/* Instagram */}
    <a
      href="https://www.instagram.com/reels/C3YEIJSoSdC/"
      target="_blank"
    >
      <Image
        src="/instagram.avif"
        alt="Instagram"
        width={40}
        height={40}
        className="hover:scale-110 transition"
      />
    </a>

  </div>

</div>
</div>

    {/* BOTTOM */}
    <p className="text-center text-gray-600 mt-8 text-sm">
      © 2025 Journey Kyrgyzstan. All rights reserved. Whatsapp: +996703367477
    </p>

  </div>

</footer>
    </main>
  );
}
