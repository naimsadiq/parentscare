const AdminDashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="skeleton h-10 w-72"></div>
          <div className="skeleton h-4 w-96"></div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-4">
          <div className="skeleton h-14 w-44 rounded-2xl"></div>
          <div className="skeleton h-14 w-44 rounded-2xl"></div>
        </div>

        {/* Table Card Skeleton */}
        <div className="bg-base-100 rounded-[2.5rem] p-8 shadow-2xl border border-base-300">
          {/* Table Head */}
          <div className="grid grid-cols-5 gap-6 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-5 w-full"></div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-6 items-center">
                <div className="space-y-2">
                  <div className="skeleton h-5 w-40"></div>
                  <div className="skeleton h-3 w-32"></div>
                </div>

                <div className="skeleton h-6 w-28 rounded-lg"></div>

                <div className="skeleton h-6 w-20"></div>

                <div className="skeleton h-6 w-24 rounded-xl"></div>

                <div className="skeleton h-8 w-28 rounded-xl justify-self-end"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-center">
          <div className="skeleton h-3 w-64"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSkeleton;
