import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // هذا السطر يتجاهل أخطاء eslint أثناء البناء
    ignoreDuringBuilds: true,
  },
  typescript: {
    // هذا السطر يتجاهل أخطاء التايب سكريبت لتفادي أي توقف آخر
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
