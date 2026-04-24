import { describe, it, expect } from "vitest";
import router from "../src/router";

describe("router", () => {
  it("should load router", () => {
    expect(router).toBeDefined();
  });

  it("should have routes", () => {
    expect(router.getRoutes().length).toBeGreaterThan(0);
  });
});
