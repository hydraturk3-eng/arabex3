import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // هذا السطر يمنع أخطاء التايب سكريبت من إيقاف البناء نهائياً
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
