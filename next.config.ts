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
};

module.exports = nextConfig;
