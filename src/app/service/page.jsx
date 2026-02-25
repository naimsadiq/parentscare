import ServiceCard from "@/components/cards/ServiceCard";
import { dbConnect } from "@/lib/dbConnect";

export const metadata = {
  title: "Our Services | Parents Care",
  description:
    "Explore our professional caregiving solutions tailored for your specific needs. Reliable, verified, and compassionate service at your doorstep.",
  keywords: [
    "home care",
    "caregiving",
    "parents care",
    "nursing service",
    "elderly care",
  ],
};

const ServicesPage = async () => {
  const servicesCollection = await dbConnect("services");
  const services = await servicesCollection.find().toArray();

  return (
    <div className="bg-base-100 min-h-screen py-12 md:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Header Section --- */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-[0.3em] mb-2">
            Professional Solutions
          </div>

          <h1 className="text-3xl md:text-6xl font-black text-base-content leading-[1.1] tracking-tighter">
            Choose the Right Care <br />
            <span className="text-primary text-opacity-80">
              for Your Family
            </span>
          </h1>

          <p className="text-base-content/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our professional caregiving solutions tailored for your
            specific needs. Reliable, verified, and compassionate service at
            your doorstep.
          </p>

          <div className="flex justify-center pt-4">
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            <div className="h-1.5 w-4 bg-secondary rounded-full ml-2"></div>
          </div>
        </div>

        {/* --- Cards Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {services.map((service) => (
            <div key={service._id.toString()} className="h-full">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* --- Bottom Support Section (Optional but looks good) --- */}
        <div className="mt-24 p-8 md:p-12 bg-base-200 rounded-[3rem] text-center border border-base-300 shadow-inner">
          <h3 className="text-2xl font-bold text-base-content">
            Need a custom plan?
          </h3>
          <p className="text-base-content/60 mt-2 mb-8 font-medium">
            If you have specific requirements, feel free to contact our support
            team.
          </p>
          <button className="btn btn-outline btn-primary rounded-2xl px-10 font-bold">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
