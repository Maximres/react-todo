const path = require("path");
module.exports = function (config) {
  const alias = {
    "@features/details": path.resolve(
      __dirname,
      "src/features/details/index.ts",
    ),
    "@features/lists": path.resolve(__dirname, "src/features/lists/index.ts"),
    "@features/tasks": path.resolve(__dirname, "src/features/tasks/index.ts"),
    "@": path.resolve(__dirname, "src/"),
  };
  config.resolve.alias = Object.assign(config.resolve.alias || {}, alias);
  return config;
};
