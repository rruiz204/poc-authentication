import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, configDefaults } from "vitest/config";

const excludedFiles = [
  ...configDefaults.exclude,
];

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      provider: "v8",
    },
    exclude: excludedFiles,
  },
});