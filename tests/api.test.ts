import { describe, it, expect, vi, beforeEach } from "vitest";

const mockApi = vi.hoisted(() => ({ post: vi.fn(), get: vi.fn() }));

vi.mock("axios", async (importOriginal) => {
  const actual = await importOriginal<typeof import("axios")>();
  return { ...actual, default: { ...actual.default, create: () => mockApi } };
});

import {
  registerUser,
  loginUser,
  listTrips,
  loadSimulatedHeatmap,
  createTrip,
  joinTrip,
  leaveTrip,
  updateTripState,
  loadRealHeatmap,
} from "../src/services/api";

describe("api service", () => {
  beforeEach(() => {
    mockApi.post.mockReset();
    mockApi.get.mockReset();
  });

  it("registerUser should return data", async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1 } });
    expect(await registerUser("test@mail.com", "123", "usuario")).toEqual({
      id: 1,
    });
  });

  it("loginUser should return data", async () => {
    mockApi.post.mockResolvedValue({ data: { token: "abc" } });
    expect(await loginUser("test@mail.com", "123")).toEqual({ token: "abc" });
  });

  it("listTrips should return array", async () => {
    mockApi.get.mockResolvedValue({ data: [{ id: 1 }] });
    expect(await listTrips()).toEqual([{ id: 1 }]);
  });

  it("loadSimulatedHeatmap should return heatmaps", async () => {
    mockApi.get.mockResolvedValue({ data: { heatmaps: [{ id: 1 }] } });
    expect(await loadSimulatedHeatmap()).toEqual([{ id: 1 }]);
  });

  it("createTrip should return created trip", async () => {
    const payload = {
      actor_email: "test@mail.com",
      title: "Viaje",
      meeting_point: "Metro U",
      start_at: "2024-01-01T08:00:00",
      transport_mode: "caminando" as const,
      direction: "metro_universidad" as const,
    };
    mockApi.post.mockResolvedValue({ data: { id: 10 } });
    expect(await createTrip(payload)).toMatchObject({ id: 10 });
  });

  it("joinTrip should return updated trip", async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1 } });
    expect(await joinTrip(1, "test@mail.com")).toEqual({ id: 1 });
  });

  it("leaveTrip should return updated trip", async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1 } });
    expect(await leaveTrip(1, "test@mail.com")).toEqual({ id: 1 });
  });

  it("updateTripState should return updated trip", async () => {
    mockApi.post.mockResolvedValue({ data: { id: 1 } });
    expect(await updateTripState(1, "test@mail.com", "activo")).toEqual({
      id: 1,
    });
  });

  it("loadRealHeatmap should return heatmap array", async () => {
    mockApi.get.mockResolvedValue({ data: [{ lat: 1 }] });
    expect(await loadRealHeatmap()).toEqual([{ lat: 1 }]);
  });
});
