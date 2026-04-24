import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "html"],
      include: ["src/**/*.{js,ts,vue}"],

      exclude: [
        "src/main.*",
        "src/types.*",
        "**/*.d.ts",
        "**/*.js", // exclude transpiled JS if TS is source
        "playwright.config.*",
      ],
      thresholds: {
        lines: 50,
        functions: 30,
        branches: 40,
        statements: 50,
      },
    },
    exclude: ["tests/e2e/**", "node_modules"],
  },
});
