"use client";

import Image from "next/image";

export default function SongKulTour() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center text-white text-center">

        <Image
          src="/horse.jpg"
          alt="Song Kul Lake"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            4-Day Horseback Adventure to Song-Kul Lake
          </h1>

          <p className="text-gray-200">
            Ride through mountains, live like nomads and explore one of the most beautiful lakes in Kyrgyzstan.
          </p>
        </div>
      </section>


      {/* MAP + DESCRIPTION */}
      <section className="py-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/map.jpg" 
            alt="Tour map"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            About the Tour
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            &ldquo;Ride Through the Mountains, Sleep Beneath the Stars&rdquo;
            Tour Highlights:
            Ride on horseback across alpine valleys and breathtaking passes
          </p>

          <p className="text-gray-600 leading-relaxed">
            Sleep in traditional yurts at high altitude beside the stunning Song-Kul Lake
            Experience Kyrgyz nomadic culture firsthand
            Small group, off-the-beaten-path adventure
          </p>
        </div>

      </section>


      {/* ITINERARY */}
      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6 space-y-20">

          {/* DAY 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden">
              <Image src="/day1.jpg" alt="Day 1" fill className="object-cover" />
            </div>

            <div>
  <h3 className="text-2xl font-bold mb-3">Day 1</h3>

  <div className="text-black-600 space-y-3">

    <p><strong>Bishkek → Kyzart → Kilemche</strong></p>

    <p>Depart Bishkek in the morning for a scenic drive to Kyzart village (approx. 5 hours).</p>

    <p>🍽️ Lunch with a local family upon arrival.</p>

    <p>In the afternoon, saddle up for your first horseback ride (3 hours) through rolling pastures and alpine trails to the Kilemche Valley.</p>

    <p>🌄 Arrive at a cozy yurt camp hosted by local shepherds.</p>

    <p>🍽️ Dinner and overnight stay in a yurt under the stars.</p>

  </div>
</div>
          </div>


          {/* DAY 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-3">Day 2</h3>
              <div>

  <div className="text-black-600 space-y-3">

    <p><strong>Kilemche → Song-Kul Lake (Via Tuz-Ashuu Pass)</strong></p>

    <p>After a hearty breakfast, continue the journey on horseback over the scenic Tuz-Ashuu Pass (~3 hours ride) with panoramic views of Song-Kul Lake appearing in the distance.</p>

    <p>🏞️ Arrive at the shores of Song-Kul, a pristine alpine lake at 3,016 meters above sea level.</p>

    <p>🍽️ Lunch at the yurt camp and free afternoon to relax, walk along the lake, or visit local herders.</p>

    <p>🌅 Dinner and overnight in yurts beside the lake.</p>

  </div>
</div>
            </div>

            <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden order-1 md:order-2">
              <Image src="/day2.jpg" alt="Day 2" fill className="object-cover" />
            </div>

          </div>


          {/* DAY 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden">
              <Image src="/day3.jpg" alt="Day 3" fill className="object-cover" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">Day 3</h3>

              <div className="text-black-600 space-y-3">

              <p><strong>Song-Kul (Tuz-Ashuu) → Kyrjol Camp (Lakeside Ride)</strong></p>

              <p>Enjoy a calm morning at Song-Kul before beginning a 3-hour lakeside ride from Tuz-Ashuu to Kyrjol camp, offering new vistas and a deeper connection to the lake&apos;s tranquil beauty.</p>

              <p>🍽️ Lunch upon arrival, with a free afternoon to rest, read, or explore.</p>

              <p>🌌 As evening falls, enjoy a warm dinner and another peaceful overnight in yurts with a view of the wide-open steppe.</p>
            </div>

            </div>

          </div>


          {/* DAY 4 */}
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-3">Day 4</h3>
              
            <div className="text-black-600 space-y-3">

              <p><strong>Kyrjol → Kyzart → Return to Bishkek</strong></p>

                <p>After breakfast, mount your horse for the final 3-hour ride back to Kyzart village.</p>

                <p>🍽️ Enjoy a farewell lunch with local hosts.</p>

                <p>🚐 After lunch, return by vehicle to Bishkek (~5 hours), arriving in the evening with unforgettable memories.</p>
            </div>
            </div>

            <div className="relative h-[300px] md:h-[350px] rounded-xl overflow-hidden order-1 md:order-2">
              <Image src="/day4.jpg" alt="Day 4" fill className="object-cover" />
            </div>

          </div>

        </div>

      </section>


      {/* BOOK BUTTON */}
      <section className="py-20 text-center">

        <h2 className="text-2xl md:text-3xl font-bold mb-6 px-4">
          Ready for this adventure?
        </h2>

        <a
          href="https://wa.me/996703367477"
          target="_blank"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg transition"
        >
          Book this tour
        </a>

      </section>


      {/* FOOTER CTA */}
      <footer className="bg-black text-white py-10 text-center">

        <p className="mb-4 text-gray-300">
          Contact us for booking and custom tours
        </p>

        <a
          href="https://wa.me/996703367477"
          target="_blank"
          className="inline-block bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition"
        >
          Chat on WhatsApp
        </a>

      </footer>

    </main>
  );
}
