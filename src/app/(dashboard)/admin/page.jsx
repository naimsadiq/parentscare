"use client";
import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  getAllPayments,
  updateBookingStatus,
} from "@/actions/adminActions";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const bData = await getAllBookings();
      const pData = await getAllPayments();
      setBookings(bData);
      setPayments(pData);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleStatusChange = async (id, status) => {
    const res = await updateBookingStatus(id, status);
    if (res.success) {
      alert("Status updated to " + status);
      // লোকাল স্টেট আপডেট করা যাতে রিফ্রেশ না লাগে
      setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)));
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 font-bold">
        Loading Admin Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-[#003d4d] mb-8">
          Admin Control Center
        </h1>

        {/* Tab Selection */}
        <div className="tabs tabs-boxed bg-white p-2 mb-8 rounded-2xl inline-flex shadow-sm">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`tab tab-lg font-bold rounded-xl transition-all ${activeTab === "bookings" ? "bg-[#003d4d] text-white" : ""}`}
          >
            📋 All Bookings
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`tab tab-lg font-bold rounded-xl transition-all ${activeTab === "payments" ? "bg-[#003d4d] text-white" : ""}`}
          >
            💰 Payment History
          </button>
        </div>

        {/* --- Table 1: All Bookings --- */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white">
            <table className="table w-full">
              <thead className="bg-slate-50 h-16 text-[#003d4d]">
                <tr>
                  <th className="pl-8">Customer</th>
                  <th>Service</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th className="pr-8 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((book) => (
                  <tr
                    key={book._id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors h-24"
                  >
                    <td className="pl-8">
                      <div className="font-bold">{book.userName || "N/A"}</div>
                      <div className="text-xs opacity-50">{book.email}</div>
                    </td>
                    <td>
                      <span className="font-medium text-[#003d4d]">
                        {book.serviceName}
                      </span>
                    </td>
                    <td>
                      <span className="font-bold text-lg">
                        ${book.totalCost}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-lg p-4 font-bold rounded-xl ${
                          book.status === "Pending"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-green-100 text-green-600"
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
                        className="select select-bordered select-sm rounded-lg"
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
          </div>
        )}

        {/* --- Table 2: Payment History --- */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white">
            <table className="table w-full">
              <thead className="bg-slate-50 h-16 text-[#003d4d]">
                <tr>
                  <th className="pl-8">User Email</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="pr-8">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((pay) => (
                  <tr key={pay._id} className="border-b border-slate-50 h-24">
                    <td className="pl-8 font-bold">{pay.email}</td>
                    <td className="font-mono text-sm text-blue-600">
                      {pay.transactionId}
                    </td>
                    <td>
                      <span className="font-black text-lg text-green-600">
                        ${pay.amount}
                      </span>
                    </td>
                    <td>{new Date(pay.paymentDate).toLocaleDateString()}</td>
                    <td className="pr-8">
                      <span className="badge badge-success text-white font-bold">
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {payments.length === 0 && (
              <p className="p-10 text-center text-gray-400">
                No payment records found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
