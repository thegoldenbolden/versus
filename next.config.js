/** @type {import("next").NextConfig} */
const path = require("path");

const nextConfig = {
 reactStrictMode: true,
 swcMinify: true,
 images: {
  domains: ["cdn.discordapp.com", "pbs.twimg.com", "lh3.googleusercontent.com"],
 },
 sassOptions: { includePaths: [path.join(__dirname, "styles")] },
};

module.exports = nextConfig;
