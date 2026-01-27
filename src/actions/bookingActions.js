"use server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
// ১. নির্দিষ্ট ইউজারের সব বুকিং নিয়ে আসা
export const getUserBookings = async (email) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.find({ email: email }).toArray();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return [];
  }
};

// ২. বুকিং ক্যানসেল/ডিলিট করা
export const deleteBooking = async (id) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    return { success: false };
  }
};


// ১. পেমেন্ট প্রসেস ফাংশন
export const processPayment = async (bookingId, paymentData) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const paymentsCollection = await dbConnect("payments");

    // পেমেন্ট কালেকশনে ডাটা সেভ
    await paymentsCollection.insertOne({
      bookingId: new ObjectId(bookingId),
      ...paymentData,
      timestamp: new Date(),
    });

    // বুকিং কালেকশনে স্ট্যাটাস আপডেট
    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { paymentStatus: "Paid", status: "Paid" } }
    );

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

