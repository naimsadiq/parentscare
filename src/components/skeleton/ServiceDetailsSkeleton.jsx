const ServiceDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-100 py-10 md:py-24 animate-pulse">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
            <div className="rounded-[2rem] md:rounded-[3rem] bg-base-300 h-[300px] md:h-[500px] lg:h-[600px] w-full"></div>
            <div className="lg:hidden h-3 bg-base-300 w-32 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="h-6 bg-base-300 w-32 rounded-full mb-6"></div>
              <div className="h-10 md:h-16 bg-base-300 w-full rounded-2xl mb-3"></div>
              <div className="h-10 md:h-16 bg-base-300 w-3/4 rounded-2xl"></div>
            </div>

            <div className="bg-base-200 p-6 md:p-10 rounded-[2.5rem] flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-3 w-full sm:w-auto">
                <div className="h-3 bg-base-300 w-20 rounded-full"></div>
                <div className="h-12 bg-base-300 w-40 rounded-xl"></div>
              </div>
              <div className="flex flex-col items-center sm:items-end space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 bg-base-300 rounded-full"
                    ></div>
                  ))}
                </div>
                <div className="h-3 bg-base-300 w-24 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-base-300 w-full rounded-full"></div>
              <div className="h-4 bg-base-300 w-full rounded-full"></div>
              <div className="h-4 bg-base-300 w-2/3 rounded-full"></div>
            </div>

            <div className="space-y-6">
              <div className="h-8 bg-base-300 w-48 rounded-lg"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-base-200/50 rounded-2xl border border-base-300/50"
                  ></div>
                ))}
              </div>
            </div>

            <div className="pt-10">
              <div className="h-20 bg-base-300 rounded-[2rem] w-full"></div>
              <div className="h-3 bg-base-300 w-48 mx-auto mt-6 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
