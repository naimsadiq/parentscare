import PaymentSuccessContent from "@/components/payment/PaymentSuccessContent";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
  return (
    // Fallback UI টিকেও থিম-ফ্রেন্ডলি করা হয়েছে
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
          <div className="loading loading-dots loading-lg text-primary"></div>
          <p className="mt-4 text-base-content font-black tracking-widest uppercase text-xs">
            Initializing Verification...
          </p>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;