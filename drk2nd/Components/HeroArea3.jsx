"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
const slides = [
  {
    title: "Driftking Repairs Garage",
    description: "Bengkel Terpercaya di Sixnine Roleplay ",
    buttonText: "Servis Dikami",
    buttonUrl: "#",
    image: "/images/logo/gambar.png",
  },
  {
    title: "Termurah dalam servis",
    description: "Layanan servis termurah di Sixnine Roleplay",
    buttonText: "Cek Sekarang",
    buttonUrl: "#",
    image: "/images/logo/gambar2.png",
  },
  {
    title: "Cepat dan Berpengalaman",
    description: "Kami siap melayani kebutuhan servis kendaraan Anda",
    buttonText: "Hubungi Kami",
    buttonUrl: "#",
    image: "/images/logo/gambar3.png",
  }
];

export default function HeroArea3() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-gray-600 to-gray-100 h-screen text-white overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">{slide.title}</h1>
            <p className="text-base md:text-lg text-gray-300 mb-8">{slide.description}</p>
            <a
              href={slide.buttonUrl}
              className="bg-yellow-600 text-gray-900 hover:bg-orange-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? "bg-orange-500" : "bg-black"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
