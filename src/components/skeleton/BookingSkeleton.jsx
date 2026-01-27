import React from "react";

const BookingSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-12 bg-base-300 rounded-2xl w-2/3 md:w-1/3 mx-auto lg:mx-0"></div>
          <div className="h-4 bg-base-300 rounded-lg w-1/2 md:w-1/4 mx-auto lg:mx-0"></div>
        </div>

        {/* Main Card Skeleton */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-base-300 min-h-[600px]">
          {/* Left Side: Summary Skeleton */}
          <div className="lg:w-2/5 bg-primary/20 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="h-6 bg-primary/30 rounded-full w-32 mb-10"></div>
              <div className="space-y-8">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/30"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 bg-primary/30 rounded w-16"></div>
                      <div className="h-6 bg-primary/30 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Final Amount Box Skeleton */}
            <div className="mt-16 bg-primary/30 rounded-[2rem] p-8 h-32"></div>
          </div>

          {/* Right Side: Form Skeleton */}
          <div className="lg:w-3/5 p-8 md:p-14 bg-base-100 space-y-10">
            {/* Section 1 */}
            <div className="space-y-6">
              <div className="h-8 bg-base-300 rounded-lg w-48 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="h-20 bg-base-200 rounded-2xl"></div>
                <div className="h-20 bg-base-200 rounded-2xl"></div>
              </div>
              <div className="h-20 bg-base-200 rounded-2xl w-full"></div>
              <div className="h-32 bg-base-200 rounded-2xl w-full"></div>
            </div>

            {/* Action Bar Skeleton */}
            <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row items-end gap-5">
              <div className="h-20 bg-base-200 rounded-2xl w-full md:w-1/3"></div>
              <div className="h-20 bg-base-300 rounded-2xl w-full md:flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSkeleton;
