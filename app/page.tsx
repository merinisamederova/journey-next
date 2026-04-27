
"use client";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import Header from "./components/Header";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-24">
        {/* HERO */}
        {/* FEATURES */}
        {/* TOURS */}
        {/* WHY CHOOSE US */}
        {/* REVIEWS */}
        {/* CONTACT */}
        {/* FOOTER */}

        
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
  
  <Image
    src="/1.jpg"
    alt="Kyrgyzstan"
    fill
    priority
    className="object-cover -z-10"
  />

  <div className="absolute inset-0 bg-black/50 -z-10"></div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-2xl p-8">

          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Private Tours in Kyrgyzstan
          </h1>

          <p className="text-lg md:text-xl mb-6 animate-fade-in delay-200">
            Discover mountains, lakes and nomadic culture with local guides
          </p>

          <div className="flex gap-4 justify-center mb-6 animate-fade-in delay-400">
            <a
              href="#tours"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              View Tours
            </a>

            <a
              href="#contact"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Contact Us
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6 mt-4 text-2xl animate-fade-in delay-600">
            <a
              href="#"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-red-600 transition"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </section>  


      {/* Features Section */}
<section className="py-20 bg-black-100">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Why Travel With Us
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
        <div className="inline-flex items-center justify-center w-26 h-26 bg-green-100 rounded-full mb-4 text-green-800 text-5xl">
          🗺️
        </div>
        <h3 className="text-xl font-semibold mb-2">Custom Tours</h3>
        <p className="text-black-600">
          Tailor-made itineraries for your needs and interests.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
        <div className="inline-flex items-center justify-center w-26 h-26 bg-green-100 rounded-full mb-4 text-green-800 text-5xl">
          🚙
        </div>
        <h3 className="text-xl font-semibold mb-2">Comfortable 4x4</h3>
        <p className="text-black-600">
          Safe and comfortable 4x4 vehicles for all terrains.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-xl p-6 shadow hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
        <div className="inline-flex items-center justify-center w-26 h-26 bg-green-100 rounded-full mb-4 text-green-800 text-5xl">
          🧭
        </div>
        <h3 className="text-xl font-semibold mb-2">Local Guides</h3>
        <p className="text-black-600">
          Knowledgeable local guides to show you hidden gems.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Tours Section */}
<section id="tours" className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
      Popular Tours
    </h2>

    <p className="text-center text-black-600 mb-12 max-w-2xl mx-auto">
      Explore the most beautiful places in Kyrgyzstan with our private and
      group tours.
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Tour 1 */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transition">
        {/* Image */}
        <div className="relative h-48">
          <Image
            src="/2.jpg" 
            alt="Issyk-Kul Lake Tour"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            Issyk-Kul Lake Tour
          </h3>
          <p className="text-black-600 mb-4">
            Discover the pearl of Central Asia, surrounded by mountains and stunning landscapes.
          </p>

          <a
            href="#"
            className="inline-block text-green-600 font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Tour 2 */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transition">
        <div className="relative h-48">
          <Image
            src="/3.jpg"
            alt="Son-Kul Lake Adventure"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            Son-Kul Lake Adventure
          </h3>
          <p className="text-black-600 mb-4">
            Experience nomadic life, yurts and high-mountain pastures.
          </p>

          <a
            href="#"
            className="inline-block text-green-600 font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>

      {/* Tour 3 */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transition">
        <div className="relative h-48">
          <Image
            src="/4.jpg"
            alt="Ala-Archa National Park"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            Ala-Archa National Park
          </h3>
          <p className="text-black-600 mb-4">
            A perfect one-day escape into nature near Bishkek.
          </p>

          <a
            href="#"
            className="inline-block text-green-600 font-semibold hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Additional Tours / Services */}
<section className="py-20 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      More Experiences
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Card 1: Summits */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transform hover:-translate-y-2 transition bg-white">
        {/* Image */}
        <div className="relative h-48">
          <Image
            src="/5.jpg" 
            alt="Summits of Kyrgyzstan"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Summits of Kyrgyzstan</h3>
          <p className="text-black-600">
            Conquer majestic peaks and explore breathtaking mountain landscapes.
          </p>
        </div>
      </div>

      {/* Card 2: Car & Driver */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transform hover:-translate-y-2 transition bg-white">
        {/* Image */}
        <div className="relative h-48">
          <Image
            src="/6.jpg" 
            alt="Car & Driver"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Car & Driver</h3>
          <p className="text-black-600">
            Private transport with a local driver to explore Kyrgyzstan hassle-free.
          </p>
        </div>
      </div>

      {/* Card 3: Horse Riding */}
      <div className="rounded-xl overflow-hidden shadow hover:shadow-xl transform hover:-translate-y-2 transition bg-white">
        {/* Image */}
        <div className="relative h-48">
          <Image
            src="/7.jpg" 
            alt="Horse Riding Tours"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Horse Riding Tours</h3>
          <p className="text-black-600">
            Explore valleys and mountains like a true nomad on horseback.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



{/* Why Choose Us */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Why Choose Us
    </h2>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Text */}
      <div>
        <ul className="space-y-6">
          <li className="flex gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <p className="text-black-800">
              More than 10 years of experience organizing tours in Kyrgyzstan
            </p>
          </li>

          <li className="flex gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <p className="text-black-800">
              Flexible itineraries tailored to your preferences
            </p>
          </li>

          <li className="flex gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <p className="text-black-800">
              Professional local guides and drivers
            </p>
          </li>

          <li className="flex gap-4">
            <span className="text-green-600 text-2xl">✔</span>
            <p className="text-black-800">
              Safety, comfort and authentic experiences
            </p>
          </li>
        </ul>
      </div>

      {/* Image */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/8.jpg" 
          alt="Why Choose Us"
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="py-20 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      What Our Clients Say
    </h2>

    <div className="grid md:grid-cols-2 gap-8">

      {/* Review 1 */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition animate-fade-in">
        <div className="relative h-90 rounded-lg mb-4 overflow-hidden">
          <Image
            src="/9.jpg"
            alt="Client review"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-black-600 mb-4">
          “Atai and Meder were the perfect hosts for our trip to Kyrgyzstan. Atai
          planned a great itinerary and Meder made us feel welcomed and
          comfortable from the start. We visited all the places we wanted, ate
          traditional food and even bought local items at the bazaar. Highly
          recommend booking with Atai & Meder!”
        </p>

        <h4 className="font-semibold">— Zainab, UAE</h4>
      </div>


      {/* Review 2 */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition animate-fade-in delay-200">
        <div className="relative h-90 rounded-lg mb-4 overflow-hidden">
          <Image
            src="/10.jpg"
            alt="Client review"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-black-600 mb-4">
          “We benefited from a personalized 5-day itinerary with Atai. The
          communication was excellent and he adjusted everything to our wishes.
          Very professional, perfect English and an amazing driver. One of our
          best memories in Central Asia — we recommend him 200%!”
        </p>

        <h4 className="font-semibold">— Anne, France</h4>
      </div>


      {/* Review 3 */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition animate-fade-in delay-400">
        <div className="relative h-90 rounded-lg mb-4 overflow-hidden">
          <Image
            src="/11.jpg"
            alt="Client review"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-black-600 mb-4">
          “Quick response and professional planning for our 3-day trip. Our guide
          Meder was very experienced and knowledgeable. Song Kul, Eagle Show and
          hiking in the mountains were unforgettable. Excellent experience!”
        </p>

        <h4 className="font-semibold">
          — Thomas, UK
        </h4>
      </div>


      {/* Review 4 */}
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition animate-fade-in delay-600">
        <div className="relative h-90 rounded-lg mb-4 overflow-hidden">
          <Image
            src="/12.jpg"
            alt="Client review"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-black-600 mb-4">
          “We just returned from an amazing adventure in Kyrgyzstan thanks to
          Atai. In just 5 nights we managed to see everything we wanted —
          Bishkek, Burana, Song Kul, Issyk Kul and even Ala Kol lake. We loved it
          and can’t thank you enough!”
        </p>

        <h4 className="font-semibold">
          — Sue, Malta
        </h4>
      </div>

    </div>
  </div>
</section>


{/* Contact & Booking */}
<section
  id="contact"
  className="py-24 bg-gray-900 text-white relative"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      Contact & Booking
    </h2>

    <p className="text-lg mb-6">
      WhatsApp:{" "}
      <a
        href="#"
        className="underline hover:text-green-400 transition"
      >
        +996 703 367 477
      </a>
      <br />
      Instagram:{" "}
      <a
        href="#"
        className="underline hover:text-pink-400 transition"
      >
        @journey.kyrgyzstan
      </a>
      <br />
      Email:{" "}
      <a
        href="mailto:journey.kyrgyzstan@gmail.com"
        className="underline hover:text-blue-400 transition"
      >
        journey.kyrgyzstan@gmail.com
      </a>
    </p>

    <p className="text-gray-300 mb-8">
      We respond fast — usually within minutes.
      <br />
      Safe drivers • Comfortable SUVs • All-inclusive tours in Kyrgyzstan.
    </p>

    <a
      href="#"
      className="inline-block bg-green-600 hover:bg-green-700 px-8 py-4 rounded-xl font-semibold text-lg transition"
    >
      Chat on WhatsApp
    </a>
  </div>
</section>

</main>
  </>
);
}

    


