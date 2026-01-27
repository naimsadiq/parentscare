"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import ThemeToggle from "@/utils/ThemeToggle";
import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";

const Navbar = () => {
  const { data: session, status } = useSession();

  // মেনু লিঙ্কগুলো (Common for Desktop & Mobile)
  const links = (
    <>
      <li>
        <Link href={"/"} className="hover:text-primary transition-colors">
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/service"}
          className="hover:text-primary transition-colors"
        >
          Service
        </Link>
      </li>
      {session && (
        <li>
          <Link
            href={"/my-bookings"}
            className="hover:text-primary transition-colors"
          >
            My Booking
          </Link>
        </li>
      )}
      {session?.user?.role === "admin" && (
        <li>
          <Link href={"/admin/dashboard"} className="text-secondary font-bold">
            Admin Panel
          </Link>
        </li>
      )}
    </>
  );

  if (status === "loading") {
    return <NavbarSkeleton />;
  }

  return (
    // bg-base-100 ব্যবহার করা হয়েছে যাতে ডার্ক মোডে এটি অটোমেটিক কালো হয়
    <nav className="bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200 sticky top-0 z-50 transition-all duration-300">
      <div className="navbar container mx-auto px-2 md:px-4">
        {/* --- Navbar Start (Mobile Menu & Logo) --- */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-1 mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-3 shadow-2xl border border-base-200"
            >
              {links}
            </ul>
          </div>
          <Link href={"/"} className="flex items-center gap-1">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-primary">
              Parents<span className="text-secondary">Care</span>
            </span>
          </Link>
        </div>

        {/* --- Navbar Center (Desktop Menu) --- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold gap-2 text-base-content/80">
            {links}
          </ul>
        </div>

        {/* --- Navbar End (Theme Toggle & Auth) --- */}
        <div className="navbar-end gap-1 md:gap-3">
          {/* Theme Toggle Button */}
          <div className="mr-1 md:mr-2">
            <ThemeToggle />
          </div>

          {status === "authenticated" ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="w-10 rounded-full">
                  <Image
                    width={60}
                    height={60}
                    alt="User Avatar"
                    src={session?.user?.image || "/images/admin.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-[20px] w-60 border border-base-200"
              >
                <li className="px-4 py-3 mb-2 bg-base-200 rounded-xl">
                  <p className="font-black text-primary truncate">
                    {session?.user?.name}
                  </p>
                  <p className="text-[10px] uppercase font-bold opacity-50">
                    {session?.user?.role}
                  </p>
                </li>

                {session?.user?.role === "admin" && (
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className="font-bold text-info"
                    >
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/my-bookings" className="font-medium">
                    My Bookings
                  </Link>
                </li>
                <div className="divider my-1 opacity-50"></div>
                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="btn btn-error btn-sm text-white font-bold rounded-lg mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-1 md:gap-2">
              <Link
                href={"/sign-in"}
                className="btn btn-ghost btn-sm md:btn-md font-bold text-primary px-3 md:px-5"
              >
                Login
              </Link>
              <Link
                href={"/sign-up"}
                className="btn btn-primary btn-sm md:btn-md text-white rounded-xl px-4 md:px-8 border-none shadow-lg hover:shadow-primary/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
