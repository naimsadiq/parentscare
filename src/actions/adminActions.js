"use server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


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
