import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: [["html", { outputFolder: "playwright-report" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  ...(process.env.CI
    ? {}
    : {
        webServer: {
          command: "npm run preview",
          url: "http://localhost:4173",
          reuseExistingServer: true,
          stdout: "ignore",
          stderr: "pipe",
        },
      }),
});