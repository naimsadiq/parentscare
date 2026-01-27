import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    // bg-base-300 ব্যবহার করা হয়েছে যাতে মেইন বডির চেয়ে ফুটারটি একটু আলাদা দেখায়
    <div className="bg-base-200 text-base-content border-t border-base-300 transition-colors duration-300">
      <footer className="footer container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* --- Column 1: Brand Info --- */}
        <aside className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter text-primary">
              Parents<span className="text-secondary">Care</span>
            </span>
          </Link>
          <p className="text-base-content/70 leading-relaxed font-medium max-w-xs">
            Providing reliable and compassionate care services for children,
            elderly, and sick family members in Dhaka since 2014.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Social Icons (Demo) */}
            <a
              href="#"
              className="btn btn-ghost btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.221c0-.822.112-1.117 1.21-1.117h2.79v-4.662c-.446-.06-.2.112-1.21-.112-4.062 0-5.992 1.83-5.992 5.459v2.653z" />
              </svg>
            </a>
            <a
              href="#"
              className="btn btn-ghost btn-circle btn-sm bg-base-300 hover:bg-primary hover:text-white transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </aside>

        {/* --- Column 2: Quick Services --- */}
        <nav>
          <h6 className="footer-title text-primary opacity-100 font-black tracking-widest">
            Our Services
          </h6>
          <Link
            href="/service/baby-care"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Baby Sitting
          </Link>
          <Link
            href="/service/elderly-care"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Elderly Care
          </Link>
          <Link
            href="/service/sick-care"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Nursing Care
          </Link>
          <Link
            href="/service"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Special Home Care
          </Link>
        </nav>

        {/* --- Column 3: Contact Info --- */}
        <nav>
          <h6 className="footer-title text-primary opacity-100 font-black tracking-widest">
            Contact Us
          </h6>
          <p className="text-base-content/70 font-medium mb-1">
            House: 42, Road: 12, Sector: 10
          </p>
          <p className="text-base-content/70 font-medium mb-1">
            Uttara, Dhaka - 1230
          </p>
          <p className="text-base-content/70 font-medium mb-1">
            Phone: +880 1700 000000
          </p>
          <p className="text-base-content/70 font-medium">
            Email: info@parentscare.com
          </p>
        </nav>

        {/* --- Column 4: Newsletter --- */}
        <div>
          <h6 className="footer-title text-primary opacity-100 font-black tracking-widest">
            Legal
          </h6>
          <Link
            href="/terms"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Terms of use
          </Link>
          <Link
            href="/privacy"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Privacy policy
          </Link>
          <Link
            href="/faq"
            className="link link-hover text-base-content/70 hover:text-primary font-medium mb-1"
          >
            Cookie policy
          </Link>
        </div>
      </footer>

      {/* --- Bottom Footer --- */}
      <div className="border-t border-base-300 bg-base-300 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-base-content/50">
          <p>
            © {new Date().getFullYear()} Parents Care Service Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/service" className="hover:text-primary">
              Services
            </Link>
            <Link href="/my-bookings" className="hover:text-primary">
              Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
