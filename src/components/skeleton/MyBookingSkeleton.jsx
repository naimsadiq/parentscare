import React from "react";

const MyBookingSkeleton = () => {
  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="space-y-3 w-full md:w-1/3">
            <div className="h-10 bg-base-300 rounded-xl w-3/4"></div>
            <div className="h-4 bg-base-300 rounded-lg w-1/2"></div>
          </div>
          <div className="h-14 bg-base-300 rounded-2xl w-40"></div>
        </div>

        {/* Table Skeleton */}
        <div className="overflow-x-auto bg-base-100 rounded-[2.5rem] border border-base-300">
          <table className="table w-full">
            <thead className="bg-base-200 h-20">
              <tr className="border-none">
                {[...Array(5)].map((_, i) => (
                  <th key={i}>
                    <div className="h-4 bg-base-300 rounded w-16 mx-auto md:mx-0"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-base-200 h-28">
                  <td className="pl-8">
                    <div className="h-5 bg-base-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-base-300 rounded w-20"></div>
                  </td>
                  <td>
                    <div className="h-6 bg-base-300 rounded-full w-16 mb-2"></div>
                    <div className="h-4 bg-base-300 rounded w-24"></div>
                  </td>
                  <td>
                    <div className="h-6 bg-base-300 rounded w-12"></div>
                  </td>
                  <td>
                    <div className="h-10 bg-base-300 rounded-xl w-24"></div>
                  </td>
                  <td className="pr-8">
                    <div className="flex gap-2 justify-center">
                      <div className="h-9 bg-base-300 rounded-xl w-20"></div>
                      <div className="h-9 bg-base-300 rounded-xl w-16"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookingSkeleton;
