import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El repo tiene otro package-lock.json en la raiz (del viejo CRA), asi que
  // hay que anclar la raiz aqui o Next infiere mal el workspace.
  turbopack: {
    root: __dirname,
  },

  images: {
    // Unica fuente de imagenes: el CDN de Sanity, que ya entrega WebP/AVIF.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
