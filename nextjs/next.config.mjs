/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are user-supplied placeholders in this scaffold; when you wire real
  // assets, configure remotePatterns / loader here and use next/image.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
