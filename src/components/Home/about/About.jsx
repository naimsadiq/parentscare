import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    // bg-base-100 ব্যবহার করায় এটি ডার্ক মোডে অটোমেটিক কালো/ডার্ক গ্রে হবে
    <section
      id="about"
      className="py-16 md:py-28 bg-base-100 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- Left Side: Image with Experience Badge --- */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl border-4 border-base-200">
              <Image
                width={350}
                height={500}
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
                alt="Caregiver with elderly person"
                className="w-full h-[350px] md:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Experience Badge - এটি ডার্ক মোডেও উজ্জ্বল থাকবে */}
            <div className="absolute -bottom-8 -right-4 md:-right-8 bg-secondary text-white p-5 md:p-8 rounded-[2rem] shadow-2xl z-20 animate-bounce-slow">
              <p className="text-3xl md:text-5xl font-black">10+</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-tighter leading-tight">
                Years of Trust <br /> & Experience
              </p>
            </div>

            {/* Decorative element - ডার্ক মোডে হালকা দেখা যাবে */}
            <div className="absolute top-12 left-12 w-full h-full bg-primary/5 -z-10 rounded-3xl hidden md:block"></div>
          </div>

          {/* --- Right Side: Content --- */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-[0.2em]">
              About Parents Care
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-base-content leading-[1.1] tracking-tight">
              Providing Trusted Care for Your{" "}
              <span className="text-primary">Loved Ones</span> Since 2014
            </h2>

            <p className="text-base-content/70 text-lg leading-relaxed font-medium">
              At Parents Care, we understand that finding the right caregiver is
              a deeply personal journey. Our mission is to bridge the gap
              between families and verified, compassionate caregivers who treat
              your family like their own.
            </p>

            {/* Features List */}
            <div className="space-y-6 pt-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-5 group">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-xl text-base-content">
                    Verified Caregivers
                  </h5>
                  <p className="text-sm text-base-content/60 mt-1 font-medium">
                    Every care mate goes through a strict NID & background
                    verification process.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-5 group">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-xl text-base-content">
                    24/7 Premium Support
                  </h5>
                  <p className="text-sm text-base-content/60 mt-1 font-medium">
                    We are always here to help you in emergencies or scheduled
                    home care.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link href="/service">
                <button className="btn btn-primary btn-lg px-12 rounded-full shadow-xl shadow-primary/20 border-none hover:scale-105 transition-transform font-bold text-white">
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
