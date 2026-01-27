import { dbConnect } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const servicesCollection = await dbConnect("services");
  const service = await servicesCollection.findOne({ id: id });

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Parents Care`,
    description: service.short_description,
  };
}

const ServiceDetails = async ({ params }) => {
  const { id } = await params;

  const servicesCollection = await dbConnect("services");
  const service = await servicesCollection.findOne({ id: id });

  if (!service) {
    notFound();
  }

  return (
    // bg-base-100 ব্যবহার করায় ডার্ক মোডে এটি নিজে থেকেই ডার্ক হবে
    <div className="min-h-screen bg-base-100 py-10 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-6 lg:px-8">
        {/* মেইন গ্রিড লেআউট */}
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
          {/* --- ১. বাম পাশ: সার্ভিস ইমেজ (Clean & Simple) --- */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
            <div className="relative group">
              {/* মেইন ইমেজ কন্টেইনার */}
              <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl border-2 md:border-4 border-base-200 bg-base-200">
                <Image
                  width={800}
                  height={1000}
                  src={service.image}
                  alt={service.title}
                  // হোভার ইফেক্ট বা ট্রানজিশন পুরোপুরি সরিয়ে দেওয়া হয়েছে
                  className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
                  priority
                />
              </div>

              {/* ডেকোরেটিভ শ্যাডো এলিমেন্ট (ঐচ্ছিক - এটি ছবিকে একটু গভীরতা দেয়) */}
              <div className="hidden lg:block absolute -z-10 top-6 left-6 w-full h-full bg-primary/5 rounded-[3rem]"></div>
            </div>

            {/* মোবাইলের জন্য ছোট একটি ট্যাগলাইন (ঐচ্ছিক) */}
            <p className="lg:hidden text-center mt-4 text-xs font-bold text-base-content/30 uppercase tracking-widest">
              Professional Care Service
            </p>
          </div>

          {/* --- ২. ডান পাশ: সার্ভিস কন্টেন্ট --- */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* ব্যাজ এবং টাইটেল */}
            <div>
              <div className="badge badge-primary font-black px-4 py-3 mb-6 uppercase tracking-widest text-[10px]">
                Premium Home Service
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-base-content leading-[1.1] tracking-tighter">
                {service.title}
              </h1>
            </div>

            {/* কস্ট এবং রেটিং বক্স */}
            <div className="bg-base-200 p-6 md:p-10 rounded-[2.5rem] border border-base-300 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-inner">
              <div className="text-center sm:text-left">
                <p className="text-base-content/50 text-xs font-black uppercase tracking-widest mb-1">
                  Starting From
                </p>
                <p className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                  ${service.price}
                  <span className="text-lg font-bold text-base-content/40 ml-1">
                    /hour
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex gap-1 text-warning mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-black text-base-content/50 uppercase tracking-widest">
                  Top Rated Service
                </span>
              </div>
            </div>

            {/* ডেসক্রিপশন */}
            <p className="text-base-content/70 text-lg md:text-xl leading-relaxed font-medium">
              {service.long_description}
            </p>

            {/* সুযোগ-সুবিধা লিস্ট */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-base-content tracking-tight flex items-center gap-3">
                <span className="w-8 h-1.5 bg-primary rounded-full"></span>
                What&apos;s included
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-300/50 hover:bg-base-200 transition-colors group"
                  >
                    <div className="bg-success/10 text-success rounded-xl p-2 group-hover:bg-success group-hover:text-white transition-all">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <span className="text-base-content/80 font-bold text-sm tracking-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* বুকিং বাটন */}
            <div className="pt-10">
              <Link href={`/booking/${service.id}`}>
                <button className="btn btn-primary btn-block h-20 rounded-[2rem] text-xl md:text-2xl font-black shadow-2xl shadow-primary/30 border-none hover:scale-[1.01] active:scale-95 text-white transition-all">
                  Book This Service Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </Link>
              <p className="text-center mt-6 text-sm font-bold text-base-content/30 uppercase tracking-[0.2em]">
                Verified & Secure Payment via Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
