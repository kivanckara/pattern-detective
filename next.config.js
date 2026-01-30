/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/pattern-detective",
  assetPrefix: "/pattern-detective/",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
