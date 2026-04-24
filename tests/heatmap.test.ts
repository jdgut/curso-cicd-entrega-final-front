import { render } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import HeatmapGrid from "../src/components/HeatmapGrid.vue";

describe("HeatmapGrid", () => {
  it("renderiza celdas y conteos", () => {
    const { getByText } = render(HeatmapGrid, {
      props: {
        title: "Mapa de prueba",
        map: {
          transport_mode: "caminando",
          cells: [
            { state: "en_metro", count: 1 },
            { state: "en_desplazamiento_universidad", count: 2 },
            { state: "en_universidad", count: 3 },
            { state: "en_desplazamiento_metro", count: 4 },
          ],
        },
      },
    });
    expect(getByText("Mapa de prueba")).toBeTruthy();
    expect(getByText("4 grupos")).toBeTruthy();
  });

  it("renderiza celda con count > 5 para cubrir color oscuro", () => {
    const { getByText } = render(HeatmapGrid, {
      props: {
        title: "Mapa alto",
        map: {
          transport_mode: "bus_universidad",
          cells: [
            { state: "en_metro", count: 0 },
            { state: "en_desplazamiento_universidad", count: 3 },
            { state: "en_universidad", count: 6 }, // ← count > 5
            { state: "en_desplazamiento_metro", count: 10 }, // ← count > 5
          ],
        },
      },
    });
    expect(getByText("Mapa alto")).toBeTruthy();
    expect(getByText("6 grupos")).toBeTruthy();
  });
});
