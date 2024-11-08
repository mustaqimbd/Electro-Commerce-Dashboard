/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api.oneselfbd.com",
      },
      {
        protocol: "https",
        hostname: "electrocommerce.abirmahmud.top",
      },
      {
        protocol: "https",
        hostname: "electrocommerce.mustaqim.site",
      },
    ],
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
};

export default nextConfig;
