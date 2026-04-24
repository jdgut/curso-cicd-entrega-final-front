import { afterEach } from "vitest";
import { cleanup } from "@testing-library/vue";

afterEach(() => {
  try {
    cleanup();
  } catch {
    // ignora errores de DOM al desmontar con isolate:false
  }
});
