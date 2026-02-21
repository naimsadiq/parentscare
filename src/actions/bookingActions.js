"use server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getUserBookings = async (email) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const result = await bookingsCollection.find({ email: email }).toArray();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    return [];
  }
};


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



export const processPayment = async (bookingId, paymentData) => {
  try {
    const bookingsCollection = await dbConnect("bookings");
    const paymentsCollection = await dbConnect("payments");

    
    await paymentsCollection.insertOne({
      bookingId: new ObjectId(bookingId),
      ...paymentData,
      timestamp: new Date(),
    });


    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { paymentStatus: "Paid", status: "Paid" } }
    );

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

