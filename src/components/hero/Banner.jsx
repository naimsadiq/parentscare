"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  const slides = [
    {
      id: 1,
      welcome: "WELCOME TO PARENTS CARE",
      title: "Your Trusted Caregiver Service in Dhaka",
      description:
        "Connecting you with skilled caremates in your local area, ensuring compassionate and professional caregiver service for your loved ones.",
      image:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200",
    },
    {
      id: 2,
      welcome: "WE CARE FOR YOUR ELDERS",
      title: "Expert Elderly Care Services at Your Doorstep",
      description:
        "Dedicated caregivers to provide emotional and physical support for the seniors of your family with dignity and respect.",
      image: "https://i.ibb.co/xtbpwJ2f/caring-for-elderly-parents-stress.jpg",
    },
    {
      id: 3,
      welcome: "SECURE CHILDHOOD",
      title: "Professional Babysitting Solutions",
      description:
        "Trusted nannies to ensure your child's safety and growth while you are away. Peace of mind for parents.",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200",
    },
  ];

  return (
    <section className="relative w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        transitionTime={700}
        className="main-carousel"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-[450px] md:h-[600px] lg:h-[750px] w-full"
          >
            <Image
              src={slide.image}
              fill
              priority={slide.id === 1}
              alt={slide.title}
              unoptimized
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/45 md:bg-black/40"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-6 md:px-12 text-center text-white">
                <h4 className="text-xs md:text-sm lg:text-base tracking-[0.3em] mb-4 font-bold uppercase animate-fadeInUp">
                  {slide.welcome}
                </h4>

                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black max-w-5xl mx-auto leading-[1.1] mb-6 drop-shadow-lg">
                  {slide.title}
                </h1>

                <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg lg:text-xl text-gray-200 leading-relaxed font-medium opacity-90">
                  {slide.description}
                </p>

                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/service" className="w-full sm:w-auto">
                    <button className="btn btn-primary btn-md md:btn-lg px-8 md:px-10 rounded-xl border-none shadow-xl hover:scale-105 transition-transform w-full">
                      Find a Care Mate
                    </button>
                  </Link>
                  <Link href="/sign-up" className="w-full sm:w-auto">
                    <button className="btn btn-outline border-white text-white hover:bg-white hover:text-black btn-md md:btn-lg px-8 md:px-10 rounded-xl transition-all w-full">
                      Become a Member
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-base-100 to-transparent z-10"></div>
    </section>
  );
};

export default Banner;
