import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  outputDir: "./test-results",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4322/challenge-portfolio/",
    trace: "retain-on-failure",
    viewport: { width: 1440, height: 1000 },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm build && pnpm preview --host 127.0.0.1 --port 4322",
    url: "http://127.0.0.1:4322/challenge-portfolio/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
