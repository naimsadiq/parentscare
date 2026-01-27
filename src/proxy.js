import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  // ১. ইউজারের টোকেন (Session Info) সংগ্রহ করা
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ২. যদি ইউজার লগইন না থাকে এবং প্রটেক্টেড রাউটে যেতে চায়
  if (
    !token &&
    (pathname.startsWith("/booking") ||
      pathname.startsWith("/my-bookings") ||
      pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // ৩. রোল চেক: যদি ইউজার অ্যাডমিন না হয়ে অ্যাডমিন ড্যাশবোর্ডে যেতে চায়
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url)); // হোমপেজে পাঠিয়ে দাও
  }

  // ৪. সব ঠিক থাকলে রিকোয়েস্টটি এগিয়ে নিয়ে যাও
  return NextResponse.next();
}

// আপনার দেওয়া matcher কনফিগারেশন
export const config = {
  // যে যে রাউটে মিডলওয়্যার কাজ করবে
  matcher: ["/booking/:path*", "/my-bookings", "/admin/:path*"],
};
