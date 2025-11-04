"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
const slides = [
  {
    title: "Objavte nové obzory",
    description: "Cestovateľské zážitky, ktoré vám zmenia život",
    buttonText: "Rezervovať",
    buttonUrl: "#",
    image:
      "/images/logo/gambar.png",
  },
  {
    title: "Prírodné krásy",
    description: "Nádherné výhľady a čistá príroda",
    buttonText: "Pozrieť ponuku",
    buttonUrl: "#",
    image:
      "/images/logo/gambar2.png",
  },
  {
    title: "Mestské dobrodružstvo",
    description: "Moderné mestá plné života a kultúry",
    buttonText: "Viac informácií",
    buttonUrl: "#",
    image:
      "/images/logo/gambar3.png",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoplay();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    startAutoplay();
  }, [autoplay]);

  const startAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="relative h-[80vh] min-h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
              currentSlide === index ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <div className="absolute inset-0 bg-gray-800">
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                className="object-cover opacity-80"
                priority={index === 0}
              />
            </div>
            <div className="container mx-auto px-6 h-full flex items-center">
              <div
                className={`max-w-2xl text-white transform transition-all duration-700 ${
                  currentSlide === index ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-8">{slide.description}</p>
                <a
                  href={slide.buttonUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center z-30"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                currentSlide === index ? "bg-white w-4 md:w-6" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
