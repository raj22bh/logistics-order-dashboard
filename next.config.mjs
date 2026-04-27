/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/logistics-order-dashboard" : "",
  assetPrefix: isProd ? "/logistics-order-dashboard/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
