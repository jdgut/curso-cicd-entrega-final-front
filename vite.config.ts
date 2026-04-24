import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,vue}"],
      exclude: [
        "src/main.*",
        "src/types.*",
        "**/*.d.ts",
        "playwright.config.*",
        "src/router/index.ts",
        "src/services/api.ts",
        "src/stores/session.ts",
        "src/App.vue",
        "src/views/**",
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
    exclude: ["tests/e2e/**", "node_modules"],
  },
});
