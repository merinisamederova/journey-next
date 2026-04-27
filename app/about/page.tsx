"use client";

import Header from "../components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {

  const images = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg",
    "/slide5.jpg",
    "/slide6.jpg",
    "/slide7.jpg",
    "/slide8.jpg",
    "/slide9.jpg",
    "/slide10.jpg",
    "/slide11.jpg",
    "/slide12.jpg",
    "/slide13.jpg",
    "/slide14.jpg",
    "/slide15.jpg",
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <main className="pt-24">

      {/* HERO */}
      <section className="relative py-32 text-center text-white">

  {/* Background image */}
  <Image
    src="/about-bg.jpg"   
    alt="About Kyrgyzstan"
    fill
    priority
    className="object-cover -z-10"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 -z-10"></div>

  {/* Content */}
  <div className="relative md:h-96 z-10 max-w-2xl mx-auto px-4 md:px-6">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      About Us
    </h1>

    <p className="text-lg text-gray-200">
      Meet your local guides and discover the people behind your unforgettable journey in Kyrgyzstan.
    </p>
  </div>
      </section>


      {/* GUIDES */}
<section className="py-24 bg-white">

  <div className="max-w-6xl mx-auto px-6 space-y-24">

    {/* Guide 1 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/guide1.jpg"
          alt="Guide Atai"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Atai — Founder & Guide
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Atai has 8 years of experience guiding travelers across Kyrgyzstan.
          He knows every hidden valley, mountain road and local tradition.
        </p>

        <p className="text-gray-600 leading-relaxed">
          His mission is to create authentic, safe and unforgettable experiences.
        </p>
      </div>

    </div>


    {/* Guide 2 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="order-2 md:order-1 max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Meder — Professional Guide & Driver
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Experienced mountain driver and guide. Graduate of the Diplomatic Academy.
          8 years of professional guiding experience.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Ensures every trip is comfortable, safe, and unforgettable.
        </p>
      </div>

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
        <Image
          src="/guide2.jpg"
          alt="Guide Meder"
          fill
          className="object-cover"
        />
      </div>

    </div>


    {/* Guide 3 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/guide.jpg"
          alt="Guide Tynchtyk"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Tynchtyk — Mountain Expert
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Specializes in mountain expeditions and hiking tours.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Provides safe and unforgettable adventures.
        </p>
      </div>

    </div>


    {/* Guide 4 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="order-2 md:order-1 max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Zhoodar — Cultural Guide
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Helps travelers discover mountains, lakes and nomadic culture.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Responsible, passionate and professional guide.
        </p>
      </div>

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
        <Image
          src="/guide4.jpg"
          alt="Guide Zhoodar"
          fill
          className="object-cover"
        />
      </div>

    </div>


    {/* Guide 5 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/guide6.jpg"
          alt="Guide Takhir"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Takhir — Guide & Driver
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Professional guide and driver.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Fluent English speaker. Lived in the UK.
        </p>
      </div>

    </div>


    {/* Guide 6 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="order-2 md:order-1 max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Bekmamat — Guide & Driver
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Professional multilingual guide.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Speaks English, Turkish and Polish.
        </p>
      </div>

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2">
        <Image
          src="/guide6.jpg"
          alt="Guide Bekmamat"
          fill
          className="object-cover"
        />
      </div>

    </div>


    {/* Guide 7 */}
    <div className="grid md:grid-cols-2 gap-12 items-center">

      <div className="relative h-[250px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/guide6.jpg"
          alt="Guide Zhyldyz"
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Zhyldyz — Horse Riding Guide
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Leader of horse riding tours in Kyrgyzstan.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Creates unforgettable horseback journeys.
        </p>
      </div>

    </div>

  </div>

</section>



      {/* SLIDER */}
      <section className="py-20 bg-gray-100">

        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">

          <h2 className="text-2xl md:text-4xl font-bold mb-8">
            Our Adventures
          </h2>


          <div className="relative h-[250px] md:h-[420px] rounded-xl overflow-hidden">

            <Image
              src={images[current]}
              alt="Gallery"
              fill
              className="object-cover transition duration-500"
            />

            {/* Buttons */}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow"
            >
              →
            </button>

          </div>

        </div>

      </section>


    </main>
  );
}