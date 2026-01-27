"use client";
import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  getAllPayments,
  updateBookingStatus,
} from "@/actions/adminActions";
import AdminDashboardSkeleton from "@/components/skeleton/AdminDashboardSkeleton";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const bData = await getAllBookings();
      const pData = await getAllPayments();
      setBookings(bData || []);
      setPayments(pData || []);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleStatusChange = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Status updated",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateBookingStatus(id, status);
        if (res.success) {
          Swal.fire({
            title: "Status updated!",
            text: "Your file has been updated.",
            icon: "success",
          });
          setBookings(
            bookings.map((b) => (b._id === id ? { ...b, status } : b)),
          );
        }
      }
    });
    // const res = await updateBookingStatus(id, status);
    // if (res.success) {
    //   alert("Status updated to " + status);
    //   setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
    // }
  };

  if (loading) return <AdminDashboardSkeleton />;

  return (
    // bg-base-200 ব্যবহার করায় এটি ডার্ক মোডে অটোমেটিক ডার্ক হবে
    <div className="min-h-screen bg-base-200 py-10 md:py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="mb-10 text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">
            Admin <span className="text-primary">Control Center</span>
          </h1>
          <p className="text-base-content/60 font-medium">
            Manage all service requests and financial transactions
          </p>
        </div>

        {/* --- Tab Selection (Responsive) --- */}
        <div className="flex justify-center md:justify-start mb-10">
          <div className="tabs tabs-boxed bg-base-100 p-2 rounded-[1.5rem] shadow-lg border border-base-300 inline-flex">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`tab tab-lg md:px-10 h-14 font-black rounded-[1rem] transition-all ${
                activeTab === "bookings"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/50 hover:text-primary"
              }`}
            >
              📋 All Bookings
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`tab tab-lg md:px-10 h-14 font-black rounded-[1rem] transition-all ${
                activeTab === "payments"
                  ? "bg-primary text-white shadow-md"
                  : "text-base-content/50 hover:text-primary"
              }`}
            >
              💰 Payment History
            </button>
          </div>
        </div>

        {/* --- Content Tables Wrapper --- */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-300">
          {/* --- Table 1: All Bookings --- */}
          {activeTab === "bookings" && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200 text-primary h-20">
                  <tr className="border-none">
                    <th className="pl-8 text-sm font-black uppercase tracking-widest">
                      Customer
                    </th>
                    <th className="text-sm font-black uppercase tracking-widest">
                      Service
                    </th>
                    <th className="text-sm font-black uppercase tracking-widest">
                      Total Cost
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
                      <td className="pl-8">
                        <div className="font-black text-base-content text-lg leading-tight">
                          {book.userName || "Guest"}
                        </div>
                        <div className="text-[11px] text-base-content/40 font-bold mt-1">
                          {book.email}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-outline font-bold text-primary px-3 py-3 rounded-lg">
                          {book.serviceName}
                        </span>
                      </td>
                      <td>
                        <span className="text-xl font-black text-base-content">
                          ${book.totalCost}
                        </span>
                      </td>
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
                      <td className="pr-8 text-center">
                        <select
                          onChange={(e) =>
                            handleStatusChange(book._id, e.target.value)
                          }
                          className="select select-bordered select-sm rounded-xl font-bold bg-base-200 border-base-300 focus:ring-4 focus:ring-primary/10"
                          defaultValue={book.status}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <p className="p-20 text-center text-base-content/20 font-bold italic">
                  No bookings found!
                </p>
              )}
            </div>
          )}

          {/* --- Table 2: Payment History --- */}
          {activeTab === "payments" && (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-base-200 text-primary h-20">
                  <tr className="border-none">
                    <th className="pl-8 text-sm font-black uppercase tracking-widest">
                      User Email
                    </th>
                    <th className="text-sm font-black uppercase tracking-widest">
                      Transaction ID
                    </th>
                    <th className="text-sm font-black uppercase tracking-widest">
                      Amount
                    </th>
                    <th className="text-sm font-black uppercase tracking-widest">
                      Date
                    </th>
                    <th className="pr-8 text-sm font-black uppercase tracking-widest text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((pay) => (
                    <tr
                      key={pay._id}
                      className="hover:bg-base-200/50 transition-colors border-b border-base-200 h-28"
                    >
                      <td className="pl-8 font-black text-base-content">
                        {pay.email}
                      </td>
                      <td>
                        <code className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-2 rounded-lg">
                          {pay.transactionId}
                        </code>
                      </td>
                      <td>
                        <span className="font-black text-xl text-success">
                          ${pay.amount}
                        </span>
                      </td>
                      <td className="text-sm font-bold text-base-content/60">
                        {new Date(pay.paymentDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="pr-8 text-center">
                        <span className="badge bg-success/10 text-success border-success/20 px-4 py-3 font-black rounded-lg">
                          PAID
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {payments.length === 0 && (
                <p className="p-20 text-center text-base-content/20 font-bold italic">
                  No payment records found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* --- Branding Footer --- */}
        <p className="text-center mt-12 text-[10px] font-black text-base-content/20 uppercase tracking-[0.4em]">
          System Administrator Access Only
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
