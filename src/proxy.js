import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  
  if (
    !token &&
    (pathname.startsWith("/booking") ||
      pathname.startsWith("/my-bookings") ||
      pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url)); 
  }

  
  return NextResponse.next();
}


export const config = {
  
  matcher: ["/booking/:path*", "/my-bookings", "/admin/:path*"],
};
