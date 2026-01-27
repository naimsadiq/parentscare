"use server";
import { dbConnect } from "@/lib/dbConnect";

export const createBooking = async (bookingData) => {
  try {
    // ১. ডাটাবেজ কানেক্ট এবং 'bookings' কালেকশন ধরা
    const bookingsCollection = await dbConnect("bookings");

    // ২. বুকিং ডাটা সেভ করা
    const result = await bookingsCollection.insertOne(bookingData);

    // ৩. সাকসেস রেসপন্স পাঠানো
    return {
      success: true,
      message: "Booking successfully saved in database!",
      insertedId: result.insertedId.toString(), // ID-কে স্ট্রিং করে পাঠানো জরুরি
    };
  } catch (error) {
    console.error("Database Insert Error:", error);
    return {
      success: false,
      message: "Failed to save booking. Please try again.",
    };
  }
};