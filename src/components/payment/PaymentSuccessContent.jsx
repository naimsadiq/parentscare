"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updatePaymentStatus } from "@/actions/paymentActions";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (bookingId && sessionId) {
      const confirmPayment = async () => {
        try {
          const res = await updatePaymentStatus(bookingId, sessionId);
          if (res.success) {
            setLoading(false);
            setTimeout(() => {
              router.push("/my-bookings");
            }, 4000);
          } else {
            setError(true);
            setLoading(false);
          }
        } catch (err) {
          console.error("Verification failed", err);
          setError(true);
          setLoading(false);
        }
      };
      confirmPayment();
    }
  }, [bookingId, sessionId, router]);

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-6 transition-colors duration-300">
      <div className="bg-base-100 p-8 md:p-14 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border border-base-300 relative overflow-hidden">
        {loading ? (
          /* --- Loading State --- */
          <div className="space-y-6">
            <div className="relative flex justify-center">
              <div className="loading loading-spinner w-24 h-24 text-primary opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-primary animate-pulse">
                  Care
                </span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-base-content tracking-tighter">
              Verifying Your Payment
            </h1>
            <p className="text-base-content/60 font-medium leading-relaxed">
              Please do not close or refresh the page while we confirm your
              request.
            </p>
          </div>
        ) : error ? (
          /* --- Error State --- */
          <div className="space-y-6">
            <div className="text-7xl md:text-8xl mb-4 animate-shake">❌</div>
            <h1 className="text-2xl md:text-3xl font-black text-error tracking-tighter">
              Verification Failed
            </h1>
            <p className="text-base-content/60 font-medium">
              We couldn&apos;t verify your payment with Stripe. If money was
              deducted, please contact support.
            </p>
            <button
              onClick={() => router.push("/my-bookings")}
              className="btn btn-primary btn-outline btn-block rounded-2xl h-14 font-black"
            >
              Go Back to Bookings
            </button>
          </div>
        ) : (
          /* --- Success State --- */
          <div className="space-y-6">
            {/* Success Animation Container */}
            <div className="flex justify-center relative">
              <div className="absolute inset-0 bg-success/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="text-7xl md:text-8xl relative z-10 drop-shadow-xl animate-bounce">
                ✅
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-base-content tracking-tighter">
              Payment Successful!
            </h1>

            <p className="text-base-content/70 font-medium text-lg leading-relaxed">
              Your service request is now{" "}
              <span className="text-success font-black">Confirmed</span>. An
              invoice has been sent to your email.
            </p>

            {/* Progress Bar & Footer */}
            <div className="mt-10 pt-8 border-t border-base-300">
              <div className="w-full bg-base-300 h-2 rounded-full overflow-hidden mb-4 shadow-inner">
                <div className="bg-primary h-full animate-progress origin-left"></div>
              </div>
              <p className="text-[10px] md:text-xs text-base-content/40 font-black uppercase tracking-[0.3em]">
                Redirecting to your dashboard in 4s...
              </p>
            </div>
          </div>
        )}

        {/* Decorative branding at bottom */}
        <div className="absolute bottom-4 left-0 right-0 opacity-10">
          <span className="text-xs font-black uppercase tracking-[0.5em]">
            Parents Care Service
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessContent;
