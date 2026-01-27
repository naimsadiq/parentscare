import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/navbar/Navbar";
import Footer from "@/components/Shared/footer/Footer";
import AuthProvider from "@/provider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Parents Care | Trusted Caregiving Services",
    template: "%s | Parents Care", // এটি দিলে অন্য পেজে 'Service | Parents Care' দেখাবে
  },
  description:
    "Find reliable babysitters, elderly care, and nursing services in Dhaka.",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" data-theme="light">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header>
            <Navbar></Navbar>
          </header>
          {children}
          <Footer></Footer>
        </body>
      </html>
    </AuthProvider>
  );
}
