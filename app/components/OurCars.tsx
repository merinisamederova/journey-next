"use client";
{/* OUR CARS */}

import Image from "next/image";

export default function OurCars() {
  return (

<section id="cars" className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100">

  <div className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6">

    {/* Title */}
    <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 tracking-wide">
      Our Cars
    </h2>

   <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-2">
      Comfortable 4x4 vehicles with professional drivers. Perfect for mountain
      roads and long-distance travel across Kyrgyzstan. 
      Price includes: car, guide and driver, petrol. All our support in the programm planning, organising the activities and assistance with all necessary bookings. Camping equipment: tent, table, chairs. Cars are appointed upon the availability and price depends on the ammount of days: 1-4 days = €200 per car / per day, 5-10 days=€180 , 11 - 15 =€ 160. All cars same price except Huynday Starex its from 250 € per day.
    </p>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">

      {/* Car 1 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car1.jpg"
      alt="Subaru Forester"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Subaru Forester 2020
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Comfortable • Reliable • Mountain ready
    </p>
  </div>

</div>


      {/* Car 2 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">
    <Image
      src="/car2.jpg"
      alt="Toyota RAV4"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Toyota RAV4 2019
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Smooth rides • City & nature • All-terrain
    </p>
  </div>

</div>


      {/* Car 3 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car3.jpg"
      alt="Nissan Rogue"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Nissan Rogue 2017
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Built for highlands • Stable • Sure-footed
    </p>
  </div>

</div>


      {/* Car 4 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car4.jpg"
      alt="Toyota Highlander"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

<div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Toyota Highlander
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Spacious interior • Long journeys • 7 seats
    </p>
  </div>

</div>


      {/* Car 5 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car5.jpg"
      alt="Huynday Starex Luxury limo"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Huynday Starex Luxury limo
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Price from 250 euro per car per day. Executive comfort • Premium cabin • Private transfers
    </p>
  </div>

</div>


      {/* Car 6 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car6.jpg"
      alt="Toyota Sequoia"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

<div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Toyota Sequoia
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Full-size SUV • 8 seats • Maximum space
    </p>
  </div>

</div> 

{/* Car 7 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car7.jpg"
      alt="Mercedes Sprinter"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Mercedes Sprinter
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Up to 16 passengers • Luggage space • Long tours
    </p>
  </div>

</div> 

{/* Car 8 */}
      <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-500">

  <div className="relative h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden">

    <Image
      src="/car8.jpg"
      alt="Lexus LX 470"
      fill
      className="object-cover group-hover:scale-110 transition duration-700"
    />

    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition"></div>

    <div className="absolute top-3 left-3 bg-white/90 text-[10px] px-2 py-0.5 rounded-full shadow">
      4x4
    </div>

  </div>

  <div className="p-4 md:p-6 text-center">
    <h3 className="font-semibold text-base md:text-lg mb-1">
      Lexus LX 470
    </h3>

    <p className="text-gray-500 text-xs md:text-sm">
      Off-road legend • Premium 4x4 • Unmatched comfort
    </p>
  </div>

</div> 

    </div>

      </div>

    </section>
  );
}