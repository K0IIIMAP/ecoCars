// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
        port: "", // Matches any port
        pathname: "**", // Matches any path
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
