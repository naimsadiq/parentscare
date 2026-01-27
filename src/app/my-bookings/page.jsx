"use client";
import React, { useEffect, useState } from "react";
import { createCheckoutSession } from "@/actions/paymentActions";
import { useSession } from "next-auth/react";
import { getUserBookings, deleteBooking } from "@/actions/bookingActions";
import Link from "next/link";
import MyBookingSkeleton from "@/components/skeleton/MyBookingSkeleton";

const MyBookingsPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      if (session?.user?.email) {
        const data = await getUserBookings(session.user.email);
        setBookings(data);
        setLoading(false);
      }
    };
    loadBookings();
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const res = await deleteBooking(id);
      if (res.success) {
        setBookings(bookings.filter((b) => b._id !== id));
      }
    }
  };

  const handlePay = async (booking) => {
    const res = await createCheckoutSession(booking);
    if (res.url) {
      window.location.href = res.url;
    } else {
      alert("Payment error: " + res.error);
    }
  };

  if (loading) {
    return <MyBookingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">
              My <span className="text-primary">Bookings</span>
            </h1>
            <p className="text-base-content/60 font-medium mt-1">
              Manage your service requests and payment history
            </p>
          </div>
          <div className="badge badge-lg bg-primary text-white p-6 rounded-2xl font-black shadow-lg shadow-primary/20 border-none">
            Total Requests: {bookings.length}
          </div>
        </div>

        {bookings.length === 0 ? (
          /* --- Empty State --- */
          <div className="bg-base-100 p-12 md:p-20 rounded-[3rem] shadow-xl text-center border border-base-300">
            <div className="text-6xl mb-6 opacity-20">📅</div>
            <p className="text-2xl font-bold text-base-content/30 italic">
              No service bookings found!
            </p>
            <Link
              href="/service"
              className="btn btn-primary mt-8 rounded-2xl px-12 font-black shadow-xl text-white"
            >
              Book a Service Now
            </Link>
          </div>
        ) : (
          /* --- Responsive Table Wrapper --- */
          <div className="overflow-x-auto bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-base-200 text-primary h-20">
                <tr className="border-none">
                  <th className="pl-8 text-sm font-black uppercase tracking-widest">
                    Service
                  </th>
                  <th className="text-sm font-black uppercase tracking-widest">
                    Details
                  </th>
                  <th className="text-sm font-black uppercase tracking-widest">
                    Cost
                  </th>
                  <th className="text-sm font-black uppercase tracking-widest">
                    Status
                  </th>
                  <th className="pr-8 text-center text-sm font-black uppercase tracking-widest">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-base-200/50 transition-colors border-b border-base-200 h-28"
                  >
                    {/* Service Name */}
                    <td className="pl-8">
                      <div className="font-black text-base-content text-lg leading-tight">
                        {book.serviceName}
                      </div>
                      <div className="text-[10px] text-base-content/40 font-bold uppercase tracking-widest mt-1">
                        Ref: {book._id.slice(-8)}
                      </div>
                    </td>

                    {/* Duration & Location */}
                    <td>
                      <div className="flex flex-col gap-1">
                        <span className="badge badge-sm badge-outline font-bold text-primary">
                          {book.duration}
                        </span>
                        <div className="text-sm font-bold text-base-content/70">
                          {book.location.area},{" "}
                          <span className="opacity-50">
                            {book.location.district}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Cost */}
                    <td>
                      <span className="text-xl font-black text-primary">
                        ${book.totalCost}
                      </span>
                    </td>

                    {/* Booking Status */}
                    <td>
                      <span
                        className={`badge badge-md p-4 font-black rounded-xl border-none shadow-sm ${
                          book.status === "Pending"
                            ? "bg-warning/10 text-warning"
                            : "bg-success/10 text-success"
                        }`}
                      >
                        {book.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="pr-8">
                      <div className="flex items-center justify-center gap-3">
                        {book.paymentStatus === "Paid" ? (
                          <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-xl font-black text-sm border border-success/20">
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
                            PAID
                          </div>
                        ) : (
                          <button
                            onClick={() => handlePay(book)}
                            className="btn btn-primary btn-sm rounded-xl px-5 border-none font-black shadow-lg shadow-primary/20 text-white"
                          >
                            Pay Now
                          </button>
                        )}

                        {/* Cancel Button - Hidden if Paid */}
                        {book.paymentStatus !== "Paid" && (
                          <button
                            onClick={() => handleDelete(book._id)}
                            className="btn btn-ghost btn-sm text-error font-bold hover:bg-error/10 rounded-xl"
                            title="Cancel Booking"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center mt-10 text-[10px] font-black text-base-content/20 uppercase tracking-[0.3em]">
          End of Booking History
        </p>
      </div>
    </div>
  );
};

export default MyBookingsPage;
