/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["picsum.photos", "via.placeholder.com", "i.discogs.com"],
  },
};

module.exports = nextConfig;
