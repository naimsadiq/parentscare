"use server";
import { dbConnect } from "@/lib/dbConnect";

export const createBooking = async (bookingData) => {
  try {
    
    const bookingsCollection = await dbConnect("bookings");

   
    const result = await bookingsCollection.insertOne(bookingData);

   
    return {
      success: true,
      message: "Booking successfully saved in database!",
      insertedId: result.insertedId.toString(), 
    };
  } catch (error) {
    console.error("Database Insert Error:", error);
    return {
      success: false,
      message: "Failed to save booking. Please try again.",
    };
  }
};