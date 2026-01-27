"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSingleService } from "@/actions/getSingleService";
import { createBooking } from "@/actions/createBooking";
import BookingSkeleton from "@/components/skeleton/BookingSkeleton";

const BookingPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { data: session } = useSession();

  const [service, setService] = useState(null);
  const [locations, setLocations] = useState([]);
  const [duration, setDuration] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [address, setAddress] = useState("");

  const totalCost = service ? Number(duration) * Number(service.price) : 0;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("/data/locations.json");
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error("Location Fetch Error:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await getSingleService(id);
      if (data) setService(data);
    };
    if (id) loadData();
  }, [id]);

  const regions = useMemo(
    () => [...new Set(locations.map((loc) => loc.region))],
    [locations],
  );
  const filteredDistricts = useMemo(
    () => locations.filter((loc) => loc.region === selectedRegion),
    [locations, selectedRegion],
  );
  const filteredAreas = useMemo(() => {
    const districtData = filteredDistricts.find(
      (loc) => loc.district === selectedDistrict,
    );
    return districtData ? districtData.covered_area : [];
  }, [filteredDistricts, selectedDistrict]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session) return alert("Please login first!");

    const bookingData = {
      email: session.user?.email,
      userName: session.user?.name,
      serviceId: id,
      serviceName: service?.title,
      duration: duration + " hours",
      location: {
        region: selectedRegion,
        district: selectedDistrict,
        area: selectedArea,
        address: address,
      },
      totalCost,
      status: "Pending",
      timestamp: new Date(),
    };

    const response = await createBooking(bookingData);
    if (response.success) {
      alert(response.message);
      router.push("/my-bookings");
    } else {
      alert(response.message);
    }
  };

  if (!service) {
    return <BookingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* --- Page Header --- */}
        <div className="mb-10 text-center lg:text-left space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">
            Complete Your{" "}
            <span className="text-primary text-opacity-80">Booking</span>
          </h1>
          <p className="text-base-content/60 font-medium">
            Please provide your details to confirm the service.
          </p>
        </div>

        {/* --- Main Card Container --- */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-base-300">
          {/* --- LEFT SIDE: PREMIUM SUMMARY BOX --- */}
          <div className="lg:w-2/5 bg-gradient-to-br from-primary to-primary/80 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                  Booking Summary
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner border border-white/10">
                      {service.title.includes("Baby")
                        ? "👶"
                        : service.title.includes("Elderly")
                          ? "👴"
                          : "🏥"}
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-black uppercase tracking-widest">
                        Service
                      </p>
                      <h3 className="text-2xl font-bold leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner border border-white/10">
                      💰
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-black uppercase tracking-widest">
                        Rate
                      </p>
                      <h3 className="text-2xl font-bold">
                        ${service.price}
                        <span className="text-sm font-medium opacity-50">
                          /hr
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Estimation Card */}
              <div className="mt-16 bg-black/20 rounded-[2rem] p-8 border border-white/10 backdrop-blur-md">
                <p className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">
                  Final Amount
                </p>
                <div className="flex justify-between items-end">
                  <p className="text-5xl font-black tracking-tighter">
                    ${totalCost}
                  </p>
                  <p className="text-[10px] font-bold opacity-40 uppercase">
                    Tax Incl.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: ADAPTIVE FORM --- */}
          <div className="lg:w-3/5 p-8 md:p-14 bg-base-100">
            <form onSubmit={handleBooking} className="space-y-8">
              {/* SECTION 1: LOCATION */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">
                    1
                  </span>
                  <h3 className="font-black text-base-content text-lg tracking-tight">
                    Location Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label-text font-bold text-base-content/70 mb-2 ml-1">
                      Division
                    </label>
                    <select
                      className="select select-bordered w-full rounded-2xl h-14 border-base-300 focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content font-bold"
                      value={selectedRegion}
                      onChange={(e) => {
                        setSelectedRegion(e.target.value);
                        setSelectedDistrict("");
                        setSelectedArea("");
                      }}
                      required
                    >
                      <option value="">Select Division</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label-text font-bold text-base-content/70 mb-2 ml-1">
                      District
                    </label>
                    <select
                      className="select select-bordered w-full rounded-2xl h-14 border-base-300 focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content font-bold"
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedArea("");
                      }}
                      disabled={!selectedRegion}
                      required
                    >
                      <option value="">Select District</option>
                      {filteredDistricts.map((d) => (
                        <option key={d.district} value={d.district}>
                          {d.district}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text font-bold text-base-content/70 mb-2 ml-1">
                    Area / Upazila
                  </label>
                  <select
                    className="select select-bordered w-full rounded-2xl h-14 border-base-300 focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content font-bold"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    disabled={!selectedDistrict}
                    required
                  >
                    <option value="">Select Area</option>
                    {filteredAreas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label-text font-bold text-base-content/70 mb-2 ml-1">
                    Detailed Street Address
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full rounded-2xl h-28 border-base-300 focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content p-5 font-medium"
                    placeholder="House No, Flat, Road Details..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>

              {/* SECTION 2: ACTION BAR (DURATION + BUTTON) */}
              <div className="pt-8 border-t border-base-300">
                <div className="flex flex-col md:flex-row items-end gap-5">
                  <div className="w-full md:w-1/3">
                    <label className="label-text font-black text-primary mb-2 flex items-center gap-2 uppercase tracking-widest text-[10px]">
                      <span className="w-5 h-5 rounded-md bg-primary text-white flex items-center justify-center">
                        2
                      </span>
                      Set Duration
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="input input-bordered w-full rounded-2xl h-16 border-primary/20 focus:border-primary focus:ring-4 focus:ring-primary/5 pl-6 text-xl font-black text-base-content bg-base-200"
                        required
                      />
                      <span className="absolute right-4 top-5 text-[10px] font-black text-base-content/30 uppercase tracking-widest">
                        Hrs
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:flex-1">
                    <button className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none hover:scale-[1.02] active:scale-95 transition-all text-white">
                      Confirm Booking
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-center md:text-right mt-4 text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em]">
                  Invoice will be sent to: {session?.user?.email}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
