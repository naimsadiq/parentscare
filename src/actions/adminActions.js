"use server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// ১. সব বুকিং নিয়ে আসা
export const getAllBookings = async () => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const data = await bookingsCollection
      .find()
      .sort({ timestamp: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [];
  }
};

// ২. সব পেমেন্ট নিয়ে আসা
export const getAllPayments = async () => {
  try {
    const paymentsCollection = await dbConnect("payments");
    const data = await paymentsCollection
      .find()
      .sort({ paymentDate: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return [];
  }
};

// ৩. বুকিং স্ট্যাটাস আপডেট করা (অ্যাডমিন যখন কনফার্ম করবে)
export const updateBookingStatus = async (id, newStatus) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus } },
    );
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
