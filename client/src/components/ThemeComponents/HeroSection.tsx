import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      image: '/images/banner-image-1.jpg',
      title: 'New Collection',
      subtitle: 'Spring Summer 2024',
      description: 'Discover the latest trends in fashion and style',
      buttonText: 'Shop Now',
      buttonLink: '/shop'
    },
    {
      id: 2,
      image: '/images/banner-image-2.jpg',
      title: 'Exclusive Offers',
      subtitle: 'Limited Time',
      description: 'Get up to 50% off on selected items',
      buttonText: 'View Offers',
      buttonLink: '/offers'
    },
    {
      id: 3,
      image: '/images/banner-image-3.jpg',
      title: 'Premium Quality',
      subtitle: 'Handcrafted Items',
      description: 'Explore our collection of premium handcrafted products',
      buttonText: 'Explore',
      buttonLink: '/premium'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white">
                  <h1 className="text-5xl md:text-6xl font-serif mb-4 animate-fade-in">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-light mb-6 animate-slide-up">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 animate-slide-up-delay">
                    {slide.description}
                  </p>
                  <a
                    href={slide.buttonLink}
                    className="inline-block bg-white text-gray-800 px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors animate-slide-up-delay-2"
                  >
                    {slide.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Video Section */}
      <div className="absolute bottom-8 right-8">
        <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 transition-all duration-300">
          <Play size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection; 