/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos", "via.placeholder.com", "i.discogs.com"],
  },
};

module.exports = nextConfig;
