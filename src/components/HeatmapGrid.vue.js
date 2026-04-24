import { computed } from "vue";
const __VLS_props = defineProps();
function color(count) {
  if (count === 0) return "#F0F4FF";
  if (count <= 2) return "#C7E0FF";
  if (count <= 5) return "#5BA3FF";
  return "#003DA5";
}
function textColor(count) {
  // En celdas de azul medio/oscuro usamos texto blanco para mantener contraste.
  if (count >= 3) return "#FFFFFF";
  return "#1F2937";
}
const prettyState = computed(() => ({
  en_metro: "En el metro",
  en_desplazamiento_universidad: "En desplazamiento a la Universidad",
  en_universidad: "En la Universidad",
  en_desplazamiento_metro: "En desplazamiento al metro",
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(
  __VLS_intrinsicElements.section,
  __VLS_intrinsicElements.section,
)({
  ...{ class: "heatmap-card" },
});
__VLS_asFunctionalElement(
  __VLS_intrinsicElements.h3,
  __VLS_intrinsicElements.h3,
)({});
__VLS_ctx.title;
__VLS_asFunctionalElement(
  __VLS_intrinsicElements.div,
  __VLS_intrinsicElements.div,
)({
  ...{ class: "heatmap-grid" },
});
for (const [cell] of __VLS_getVForSourceType(__VLS_ctx.map.cells)) {
  __VLS_asFunctionalElement(
    __VLS_intrinsicElements.article,
    __VLS_intrinsicElements.article,
  )({
    key: cell.state,
    ...{ class: "heat-cell" },
    ...{
      style: {
        backgroundColor: __VLS_ctx.color(cell.count),
        color: __VLS_ctx.textColor(cell.count),
      },
    },
  });
  __VLS_asFunctionalElement(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p,
  )({
    ...{ class: "state" },
  });
  __VLS_ctx.prettyState[cell.state];
  __VLS_asFunctionalElement(
    __VLS_intrinsicElements.p,
    __VLS_intrinsicElements.p,
  )({
    ...{ class: "value" },
  });
  cell.count;
}
/** @type {__VLS_StyleScopedClasses['heatmap-card']} */ /** @type {__VLS_StyleScopedClasses['heatmap-grid']} */ /** @type {__VLS_StyleScopedClasses['heat-cell']} */ /** @type {__VLS_StyleScopedClasses['state']} */ /** @type {__VLS_StyleScopedClasses['value']} */ var __VLS_dollars;
const __VLS_self = (await import("vue")).defineComponent({
  setup() {
    return {
      color: color,
      textColor: textColor,
      prettyState: prettyState,
    };
  },
  __typeProps: {},
});
export default (await import("vue")).defineComponent({
  setup() {
    return {};
  },
  __typeProps: {},
}); /* PartiallyEnd: #4569/main.vue */
