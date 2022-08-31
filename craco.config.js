const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@features/details": path.resolve(__dirname, "src/features/details/index.ts"),
      "@features/lists": path.resolve(__dirname, "src/features/lists/index.ts"),
      "@features/main": path.resolve(__dirname, "src/features/main/index.ts"),
      "@": path.resolve(__dirname, "src")
    }
  },
};