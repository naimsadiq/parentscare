const ServicesSkeleton = () => {
  return (
    <div className="bg-base-100 min-h-screen py-12 md:py-24 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- Header Skeleton --- */}
        <div className="text-center mb-20 space-y-5">
          <div className="h-6 w-40 bg-base-300 rounded-full mx-auto"></div>
          <div className="h-10 md:h-16 w-3/4 md:w-1/2 bg-base-300 rounded-2xl mx-auto"></div>
          <div className="h-4 w-full md:w-1/3 bg-base-300 rounded-full mx-auto"></div>

          <div className="flex justify-center pt-4">
            <div className="h-2 w-20 bg-base-300 rounded-full"></div>
            <div className="h-2 w-4 bg-base-200 rounded-full ml-2"></div>
          </div>
        </div>

        {/* --- Grid Skeleton (6 items) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-base-200/50 rounded-[2rem] overflow-hidden border border-base-300 h-[450px] flex flex-col"
            >
              {/* Image area */}
              <div className="h-56 bg-base-300 w-full"></div>
              {/* Content area */}
              <div className="p-8 space-y-4 flex-1">
                <div className="h-6 bg-base-300 w-3/4 rounded-lg"></div>
                <div className="h-4 bg-base-300 w-full rounded-lg"></div>
                <div className="h-4 bg-base-300 w-1/2 rounded-lg"></div>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <div className="h-8 bg-base-300 w-24 rounded-xl"></div>
                  <div className="h-10 bg-base-300 w-28 rounded-xl"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Bottom Section Skeleton --- */}
        <div className="mt-24 p-12 bg-base-200 rounded-[3rem] border border-base-300 flex flex-col items-center space-y-4">
          <div className="h-8 bg-base-300 w-64 rounded-lg"></div>
          <div className="h-4 bg-base-300 w-80 rounded-lg"></div>
          <div className="h-12 bg-base-300 w-40 rounded-2xl mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSkeleton;
