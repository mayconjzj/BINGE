/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    cpus: 4
  },
  devIndicators: {
    autoPrerender: false
  }
};

export default nextConfig;
