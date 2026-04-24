import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",
});
export async function registerUser(email, password, role) {
  const response = await api.post("/users/register", {
    email,
    password,
    role,
  });
  return response.data;
}
export async function loginUser(email, password) {
  const response = await api.post("/users/login", { email, password });
  return response.data;
}
export async function listTrips() {
  const response = await api.get("/trips");
  return response.data;
}
export async function createTrip(payload) {
  const response = await api.post("/trips", payload);
  return response.data;
}
export async function joinTrip(tripId, actor_email) {
  const response = await api.post(`/trips/${tripId}/join`, {
    actor_email,
  });
  return response.data;
}
export async function leaveTrip(tripId, actor_email) {
  const response = await api.post(`/trips/${tripId}/leave`, {
    actor_email,
  });
  return response.data;
}
export async function updateTripState(tripId, actor_email, new_state) {
  const response = await api.post(`/trips/${tripId}/state`, {
    actor_email,
    new_state,
  });
  return response.data;
}
export async function loadRealHeatmap() {
  const response = await api.get("/trips/metrics/heatmap");
  return response.data;
}
export async function loadSimulatedHeatmap() {
  const response = await api.get("/trips/metrics/heatmap/simulated");
  return response.data.heatmaps;
}
