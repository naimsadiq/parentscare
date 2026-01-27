"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/register/route";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    nid: "",
    password: "",
  });

  // Password Validation Logic
  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const isLongEnough = pass.length >= 6;
    return hasUpperCase && hasLowerCase && isLongEnough;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ১. পাসওয়ার্ড ভ্যালিডেশন চেক
    if (!validatePassword(formData.password)) {
      setError("Password must be 6+ chars, 1 uppercase & 1 lowercase.");
      setLoading(false);
      return;
    }

    // ২. সার্ভার একশন কল
    const result = await createUser(formData);

    if (result.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Account Created! Please login.",
        showConfirmButton: false,
        timer: 1500,
      });

      // alert("Account Created! Please login.");
      router.push("/sign-in");
    } else {
      setError(result.message || "Registration failed!");
      setLoading(false);
    }
  };

  return (
    // bg-base-200 ডার্ক মোডে অটোমেটিক ডার্ক হবে
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-6 transition-colors duration-300">
      <div className="max-w-lg w-full bg-base-100 rounded-[3rem] shadow-2xl p-8 md:p-12 border border-base-300 relative overflow-hidden">
        {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড এলিমেন্ট */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
            Join{" "}
            <span className="text-primary text-opacity-80">Parents Care</span>
          </h2>
          <p className="text-base-content/60 font-medium mt-2">
            Create an account to hire trusted caregivers
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div className="form-control">
              <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
                onChange={handleChange}
                required
              />
            </div>

            {/* Contact Number */}
            <div className="form-control">
              <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                placeholder="+8801..."
                className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* NID Number */}
          <div className="form-control">
            <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
              NID Number
            </label>
            <input
              type="text"
              name="nid"
              placeholder="Your National ID Number"
              className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
              onChange={handleChange}
              required
            />
            <p className="text-[9px] font-black text-base-content/40 mt-2 ml-1 uppercase tracking-tighter">
              Min 6 chars • 1 Uppercase • 1 Lowercase
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error/10 text-error text-xs font-bold p-4 rounded-xl border border-error/20 animate-shake">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none transition-all hover:scale-[1.02] active:scale-95 text-white mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Register Now"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-10 text-sm font-medium text-base-content/60">
          Already have an account?
          <Link
            href="/sign-in"
            className="text-primary font-black hover:underline ml-2 uppercase tracking-tighter"
          >
            Login Instead
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
