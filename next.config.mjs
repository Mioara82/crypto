/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
        protocol: "https",
        hostname: "assets.coingecko.com",
        port: "",
        pathname: "/coins/images/**",
        },
        {
          protocol: "https",
          hostname: "coin-images.coingecko.com",
          port: "",
          pathname: "/coins/images/**",
          },
      ],
    },
};

export default nextConfig;
