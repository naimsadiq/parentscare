"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/my-bookings" });
    } catch (err) {
      console.error("Google Login Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-6 transition-colors duration-300">
      <div className="max-w-md w-full bg-base-100 rounded-[3rem] shadow-2xl p-8 md:p-12 border border-base-300 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
            Welcome <span className="text-primary">Back</span>
          </h2>
          <p className="text-base-content/60 font-medium mt-2">
            Log in to manage your care services
          </p>
        </div>

        {/* Social Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full rounded-2xl border-base-300 hover:bg-base-200 hover:text-base-content flex items-center gap-3 h-14 font-bold transition-all"
        >
          <Image
            width={20}
            height={20}
            src="https://cdn.iconscout.com/icon/free/png-256/free-google-icon-svg-download-png-1507807.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-base-content/80">Continue with Google</span>
        </button>

        <div className="divider text-base-content/30 text-[10px] font-black uppercase tracking-[0.3em] my-8">
          OR EMAIL
        </div>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="form-control">
            <label className="label-text font-black text-primary mb-2 ml-1 uppercase tracking-widest text-[10px]">
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="label-text font-black text-primary uppercase tracking-widest text-[10px]">
                Password
              </label>
              <Link
                href="#"
                className="text-[10px] font-black text-secondary hover:underline uppercase tracking-tighter"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 bg-base-200 text-base-content border-base-300 h-14 font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-error/10 text-error text-xs font-bold p-4 rounded-xl border border-error/20 animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none transition-all hover:scale-[1.02] active:scale-95 text-white"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login Now"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-10 text-sm font-medium text-base-content/60">
          Don&apos;t have an account?
          <Link
            href="/sign-up"
            className="text-primary font-black hover:underline ml-2 uppercase tracking-tighter"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
