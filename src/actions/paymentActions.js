"use server";
import Stripe from "stripe";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- ইমেইল পাঠানোর ফাংশন ---
const sendInvoiceEmail = async (booking, transactionId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Parent Care Payments" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: `Payment Receipt - ${booking.serviceName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 20px; padding: 30px;">
        <h2 style="color: #003d4d; text-align: center;">Payment Successful!</h2>
        <p>Dear <strong>${booking.userName}</strong>,</p>
        <p>Your payment for <strong>${booking.serviceName}</strong> has been successfully processed.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 15px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${transactionId}</p>
          <p style="margin: 5px 0;"><strong>Amount Paid:</strong> $${booking.totalCost}</p>
          <p style="margin: 5px 0;"><strong>Duration:</strong> ${booking.duration}</p>
          <p style="margin: 5px 0;"><strong>Location:</strong> ${booking.location.address}, ${booking.location.area}</p>
        </div>
        
        <p style="text-align: center; font-size: 12px; color: #64748b;">
          Our caregiver will contact you shortly. Thank you for choosing parents care!
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// --- পেমেন্ট সেশন তৈরি (Success URL এ session_id যোগ করা হয়েছে) ---
export const createCheckoutSession = async (booking) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: booking.serviceName,
              description: `Care service for ${booking.duration}`,
            },
            unit_amount: booking.totalCost * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // {CHECKOUT_SESSION_ID} এটি স্ট্রাইপ নিজে থেকেই রিপ্লেস করে দিবে
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?bookingId=${booking._id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/my-bookings`,
      customer_email: booking.email,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe Error:", error);
    return { error: "Failed to create payment session" };
  }
};

// --- পেমেন্ট ভেরিফিকেশন এবং ডাটাবেজ আপডেট ---
export const updatePaymentStatus = async (bookingId, sessionId) => {
  try {
    // ১. স্ট্রাইপ থেকে সেশনটি চেক করা (Security Check)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // যদি পেমেন্ট স্ট্যাটাস 'paid' না হয়, তবে এরর দিবে (কেউ ম্যানুয়ালি লিংকে ঢুকলে ধরা খাবে)
    if (session.payment_status !== "paid") {
      return { success: false, message: "Payment not verified!" };
    }

    const bookingsCollection = await dbConnect("bookings");
    const paymentsCollection = await dbConnect("payments");

    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(bookingId),
    });

    if (!booking) return { success: false, message: "Booking not found" };

    // ২. যদি আগে থেকেই Paid থাকে তবে আর কাজ করবে না (Duplicate ইমেইল আটকানো)
    if (booking.paymentStatus === "Paid") {
      return { success: true };
    }

    // ৩. বুকিং আপডেট
    await bookingsCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      {
        $set: {
          paymentStatus: "Paid",
          status: "Paid",
          updatedAt: new Date(),
        },
      },
    );

    // ৪. পেমেন্ট রেকর্ড সেভ (Real Transaction ID সহ)
    const paymentRecord = {
      bookingId: new ObjectId(bookingId),
      email: booking.email,
      userName: booking.userName,
      serviceName: booking.serviceName,
      amount: booking.totalCost,
      transactionId: session.payment_intent, // অরিজিনাল ট্রানজাকশন আইডি
      status: "Completed",
      paymentDate: new Date(),
    };

    const result = await paymentsCollection.insertOne(paymentRecord);

    // ৫. ইমেইল পাঠানো
    if (result.insertedId) {
      await sendInvoiceEmail(booking, session.payment_intent);
    }

    return { success: true };
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return { success: false };
  }
};
