import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Fake Navbar */}

      {/* Page Body */}
      <main className="container mx-auto px-4 py-12 space-y-8">
        <div className="skeleton h-8 w-1/3"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card bg-base-200 p-4 space-y-4">
              <div className="skeleton h-40 w-full"></div>
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default loading;
