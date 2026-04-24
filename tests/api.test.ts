import { describe, it, expect, vi, beforeEach } from "vitest";

// 👇 vi.hoisted() garantiza que esto se ejecuta ANTES que vi.mock()
const mockApi = vi.hoisted(() => ({
  post: vi.fn(),
  get: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: () => mockApi,
  },
}));

// 👇 IMPORT DESPUÉS del mock
import {
  registerUser,
  loginUser,
  listTrips,
  loadSimulatedHeatmap,
} from "../src/services/api";

describe("api service", () => {
  beforeEach(() => {
    mockApi.post.mockReset();
    mockApi.get.mockReset();
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
