/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এটি যেকোনো ডোমেইন থেকে ইমেজ সাপোর্ট করবে
      },
      {
        protocol: "http",
        hostname: "**", // যদি কোনো ছবি http লিংকের হয়
      },
    ],
  },
};

export default nextConfig;
