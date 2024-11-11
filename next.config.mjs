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
        protocol: "http",
        hostname: "api.oneselfbd.com",
      },
      {
        protocol: "https",
        hostname: "api.oneselfbd.com",
      },
      {
        protocol: "http",
        hostname: "api.medicellbd.com",
      },
      {
        protocol: "https",
        hostname: "api.medicellbd.com",
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
