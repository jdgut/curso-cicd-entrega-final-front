import { describe, it, expect, vi, beforeEach } from "vitest";

// 👇 necesario por hoisting
const mockApi = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
}));

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");

  return {
    ...actual,
    default: {
      ...actual.default,
      create: () => mockApi,
    },
  };
});

import * as apiModule from "../src/services/api";

const { registerUser, loginUser, listTrips, loadSimulatedHeatmap } = apiModule;

describe("api service", () => {
  beforeEach(() => {
    mockApi.post.mockReset();
    mockApi.get.mockReset();
  });

  it("should load api module", () => {
    expect(apiModule).toBeDefined();
  });

  it("registerUser should return data", async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1 } });

    const result = await registerUser("test@mail.com", "123", "usuario");

    expect(result).toEqual({ id: 1 });
  });

  it("loginUser should return data", async () => {
    mockApi.post.mockResolvedValue({ data: { token: "abc" } });

    const result = await loginUser("test@mail.com", "123");

    expect(result).toEqual({ token: "abc" });
  });

  it("listTrips should return array", async () => {
    mockApi.get.mockResolvedValue({ data: [{ id: 1 }] });

    const result = await listTrips();

    expect(result).toEqual([{ id: 1 }]);
  });

  it("loadSimulatedHeatmap should return heatmaps", async () => {
    mockApi.get.mockResolvedValue({
      data: { heatmaps: [{ id: 1 }] },
    });

    const result = await loadSimulatedHeatmap();

    expect(result).toEqual([{ id: 1 }]);
  });
});
