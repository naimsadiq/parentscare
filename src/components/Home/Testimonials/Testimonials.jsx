"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Busy Professional",
    comment:
      "The babysitting service from Care.io has been a lifesaver for my family. Their caregivers are punctual, professional, and truly care about my children's well-being.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    id: 2,
    name: "David Miller",
    role: "Son of Elderly Patient",
    comment:
      "I was looking for a compassionate nurse for my father. The caregiver we found through Care.io provided excellent medical support and companionship. Highly recommended!",
    image: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Recovering Patient",
    comment:
      "After my surgery, I needed specialized home care. The nursing staff was incredibly supportive and helped me recover faster in the comfort of my own home.",
    image: "https://i.pravatar.cc/150?u=emily",
    rating: 5,
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "New Parent",
    comment:
      "As a first-time parent, I was nervous about hiring help. Care.io made the process so easy and secure. We found a wonderful nanny who feels like family now.",
    image: "https://i.pravatar.cc/150?u=michael",
    rating: 4,
  },
];

const stats = [
  { id: 1, label: "Happy Families", value: "2,500+" },
  { id: 2, label: "Verified Caregivers", value: "850+" },
  { id: 3, label: "Cities Covered", value: "15+" },
  { id: 4, label: "Trust Rating", value: "4.9/5" },
];

const Testimonials = () => {
  return (
    // bg-base-200 ডার্ক মোডে অটোমেটিক ডার্ক হবে
    <section className="py-20 md:py-32 bg-base-200 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* --- 1. Success Metrics Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 md:p-10 bg-base-100 rounded-[2.5rem] shadow-sm border border-base-300 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-3xl md:text-5xl font-black text-primary mb-2 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-base-content/50 font-black uppercase tracking-widest text-[10px] md:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- Header for Testimonials --- */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em]">
            REVIEWS
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-base-content leading-tight tracking-tighter">
            What Our Families <br />{" "}
            <span className="text-primary">Are Saying</span>
          </h2>
        </div>

        {/* --- 2. Swiper Slider Section --- */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-20 testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <div className="bg-base-100 p-8 md:p-12 rounded-[3rem] shadow-sm border border-base-300 h-full flex flex-col justify-between hover:shadow-2xl transition-all duration-500 border-b-8 border-b-primary/20 group">
                <div>
                  {/* Star Ratings */}
                  <div className="flex gap-1 mb-8">
                    {[...Array(item.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-warning fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <p className="text-base-content/80 text-lg md:text-xl leading-relaxed italic font-medium line-clamp-4 mb-10">
                    &quot;{item.comment}&quot;
                  </p>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-5 mt-4 pt-8 border-t border-base-300">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                    <Image
                      fill
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-xl text-base-content tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-xs text-base-content/50 font-bold uppercase tracking-widest mt-1">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper Pagination Style Override (Optional) */}
      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: oklch(var(--p));
          width: 12px;
          height: 12px;
          opacity: 0.2;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
