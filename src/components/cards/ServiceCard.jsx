import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-base-200/50 hover:bg-base-100 rounded-[3rem] p-8 shadow-sm hover:shadow-2xl border border-base-300 transition-all duration-500 hover:-translate-y-2 flex flex-col items-center h-full">
      {/* Icon/Emoji Box */}
      <div className="mb-8 w-24 h-24 bg-base-100 rounded-3xl shadow-inner flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500 border border-base-200">
        {service.title.includes("Baby")
          ? "👶"
          : service.title.includes("Elderly")
            ? "👴"
            : "🏥"}
      </div>

      {/* Content Area */}
      <div className="flex-grow flex flex-col items-center text-center">
        <h3 className="text-2xl font-black text-base-content leading-tight mb-4 tracking-tight group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <p className="text-base-content/70 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
          {service.short_description}
        </p>

        {/* Features List (৩টি ফিচার) */}
        <div className="space-y-3 mb-10 w-full">
          {service.features?.slice(0, 3).map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-sm font-bold text-base-content/60 bg-base-100/50 p-2 rounded-xl border border-base-300/50"
            >
              <div className="bg-success/10 text-success rounded-lg p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="truncate">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full mt-auto">
        <Link
          href={`/service/${service.id}`}
          className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none hover:scale-[1.02] transition-transform text-white"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
