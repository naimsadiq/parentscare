import Link from "next/link";
import React from "react";


const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-6 text-center transition-colors duration-300 relative overflow-hidden">
      
      <h1 className="text-[12rem] md:text-[22rem] font-black text-primary opacity-[0.03] absolute z-0 select-none tracking-tighter">
        404
      </h1>

      <div className="relative z-10 space-y-8">
        
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary animate-pulse border border-primary/20 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 md:h-16 md:w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-base-content tracking-tighter leading-tight">
            Oops! Page <span className="text-primary">Not Found</span>
          </h2>
          <p className="text-base-content/60 text-lg max-w-md mx-auto font-medium">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>
        </div>

        
        <div className="pt-6">
          <Link href="/">
            <button className="btn btn-primary btn-lg rounded-[1.5rem] px-12 font-black shadow-2xl shadow-primary/20 border-none transition-all hover:scale-105 active:scale-95 text-white">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};


export default NotFound;
