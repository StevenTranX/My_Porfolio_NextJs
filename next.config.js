/** @type {import('next').NextConfig} */

// require("abortcontroller-polyfill/dist/polyfill-patch-fetch");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       "abort-controller": require.resolve("abort-controller"),
  //       "node-fetch": require.resolve("node-fetch"),
  //     };
  //   }

  //   return config;
  // },
};

module.exports = nextConfig;
