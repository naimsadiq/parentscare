
"use server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const createUser = async (payload) => {
  try {
    const { email, password, name, nid, contact } = payload;
    const usersCollection = await dbConnect("users");

   
    const userExists = await usersCollection.findOne({ email });
    if (userExists) {
      return { success: false, message: "User already exists" }; 
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = { name, email, contact, nid, password: hashedPassword, role: "user" };
    const result = await usersCollection.insertOne(newUser);

    return { success: true, message: "Account created!", id: result.insertedId.toString() };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
};