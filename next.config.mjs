/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],

      domains: ["lh3.googleusercontent.com"],
    },
    experimental: {
      taint: true,
    },
    // ...other config settings
  };
  
  export default nextConfig;
