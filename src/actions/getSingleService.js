"use server";
import { dbConnect } from "@/lib/dbConnect";

export const getSingleService = async (id) => {
  try {
    const servicesCollection = await dbConnect("services");
    const service = await servicesCollection.findOne({ id: id });

    // MongoDB এর ডাটা সরাসরি ক্লায়েন্টে পাঠানোর আগে stringify করে নিতে হয়
    return JSON.parse(JSON.stringify(service));
  } catch (error) {
    console.log(error);
    return null;
  }
};
