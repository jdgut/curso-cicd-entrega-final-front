import { describe, expect, it, beforeEach, vi } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { clearUser, saveUser, getUser } from "../src/stores/session";

vi.mock("../src/views/DashboardView.vue", () => ({ default: {} }));
vi.mock("../src/views/HomeView.vue", () => ({ default: {} }));

const makeRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home", component: {} },
      {
        path: "/dashboard",
        name: "dashboard",
        component: {},
        beforeEnter: () => (getUser() ? true : "/"),
      },
    ],
  });

describe("router guard dashboard", () => {
  let router: ReturnType<typeof makeRouter>;

  beforeEach(() => {
    clearUser();
    router = makeRouter();
  });

  it("redirige a home sin usuario", async () => {
    await router.push("/dashboard");
    expect(router.currentRoute.value.fullPath).toBe("/");
  });

  it("permite dashboard con usuario", async () => {
    saveUser({
      id: 2,
      email: "admin@eafit.edu.co",
      role: "administrador",
      created_at: "2026-01-01T10:00:00",
    });
    await router.push("/dashboard");
    expect(router.currentRoute.value.fullPath).toBe("/dashboard");
  });
});
