import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../src/views/DashboardView.vue", () => ({ default: {} }));
vi.mock("../src/views/HomeView.vue", () => ({ default: {} }));

const mockGetUser = vi.fn();
vi.mock("../src/stores/session", () => ({ getUser: () => mockGetUser() }));

vi.mock("vue-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue-router")>();
  return { ...actual, createWebHistory: () => actual.createMemoryHistory() };
});

import router from "../src/router/index";

describe("router", () => {
  beforeEach(() => mockGetUser.mockReset());

  it("should be defined", () => expect(router).toBeDefined());

  it("should have 2 routes", () => expect(router.getRoutes()).toHaveLength(2));

  it('route "/" should point to home', () => {
    const home = router.getRoutes().find((r) => r.path === "/");
    expect(home?.name).toBe("home");
  });

  it('route "/dashboard" should point to dashboard', () => {
    const dashboard = router.getRoutes().find((r) => r.path === "/dashboard");
    expect(dashboard?.name).toBe("dashboard");
  });

  it("dashboard beforeEnter allows access when user is logged in", () => {
    mockGetUser.mockReturnValue({ email: "test@mail.com" });
    const beforeEnter = router.getRoutes().find((r) => r.path === "/dashboard")
      ?.beforeEnter as () => unknown;
    expect(beforeEnter()).toBe(true);
  });

  it('dashboard beforeEnter redirects to "/" when no user', () => {
    mockGetUser.mockReturnValue(null);
    const beforeEnter = router.getRoutes().find((r) => r.path === "/dashboard")
      ?.beforeEnter as () => unknown;
    expect(beforeEnter()).toBe("/");
  });
});
