import { afterEach, describe, expect, it } from "vitest";
import { clearUser, getUser, saveUser } from "../src/stores/session";

describe("session store", () => {
  afterEach(() => localStorage.clear());

  it("guarda y recupera usuario", () => {
    saveUser({
      id: 1,
      email: "test@eafit.edu.co",
      role: "usuario",
      created_at: "2026-01-01T10:00:00",
    });
    expect(getUser()?.email).toBe("test@eafit.edu.co");
  });

  it("elimina usuario", () => {
    saveUser({
      id: 1,
      email: "test@eafit.edu.co",
      role: "usuario",
      created_at: "2026-01-01T10:00:00",
    });
    clearUser();
    expect(getUser()).toBeNull();
  });

  it("getUser retorna null si localStorage está vacío", () => {
    expect(getUser()).toBeNull();
  });

  it("getUser retorna null si el valor es JSON inválido", () => {
    localStorage.setItem("movilidad_session_user", "no-es-json");
    expect(getUser()).toBeNull();
  });
});
