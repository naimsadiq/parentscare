import React from "react";
import { dbConnect } from "@/lib/dbConnect";
import ServiceCard from "@/components/cards/ServiceCard";

const ServicesSection = async () => {
  // ১. ডাটাবেজ থেকে ডাটা নিয়ে আসা
  const servicesCollection = await dbConnect("services");
  const servicesData = await servicesCollection.find().toArray();

  return (
    <section className="py-20 md:py-32 bg-base-100 transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-2">
            CARE.IO SOLUTIONS
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-base-content leading-[1.1] tracking-tighter">
            Compassionate Care for <br className="hidden md:block" />
            <span className="text-primary">Every Family Member</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/60 text-lg font-medium">
            Find the best-verified caregivers tailored to your specific home
            needs.
          </p>
        </div>

        {/* Service Cards Grid - ৩টি কলাম রেসপন্সিভ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((service) => (
            // Reusable ServiceCard কম্পোনেন্ট কল করা হয়েছে
            <ServiceCard key={service._id.toString()} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
