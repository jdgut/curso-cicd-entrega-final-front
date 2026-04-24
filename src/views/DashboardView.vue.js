import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import HeatmapGrid from "../components/HeatmapGrid.vue";
import { createTrip, joinTrip, leaveTrip, listTrips, loadRealHeatmap, updateTripState, } from "../services/api";
import { clearUser, getUser } from "../stores/session";
const router = useRouter();
const user = getUser();
const trips = ref([]);
const heatmaps = ref([]);
const message = ref("");
const intervalId = ref(null);
const form = ref({
    title: "",
    meeting_point: "",
    start_at: "",
    transport_mode: "caminando",
    direction: "metro_universidad",
});
const canRender = computed(() => !!user);
async function refreshData() {
    if (!user) {
        return;
    }
    trips.value = await listTrips();
    heatmaps.value = await loadRealHeatmap();
}
async function submitTrip() {
    if (!user) {
        return;
    }
    message.value = "";
    try {
        await createTrip({
            actor_email: user.email,
            title: form.value.title,
            meeting_point: form.value.meeting_point,
            start_at: new Date(form.value.start_at).toISOString(),
            transport_mode: form.value.transport_mode,
            direction: form.value.direction,
        });
        message.value = "Desplazamiento creado correctamente.";
        await refreshData();
    }
    catch {
        message.value = "No se pudo crear el desplazamiento.";
    }
}
async function onJoin(tripId) {
    if (!user)
        return;
    await joinTrip(tripId, user.email);
    await refreshData();
}
async function onLeave(tripId) {
    if (!user)
        return;
    await leaveTrip(tripId, user.email);
    await refreshData();
}
async function onAdvanceState(trip) {
    if (!user)
        return;
    const transitions = {
        en_metro: "en_desplazamiento_universidad",
        en_desplazamiento_universidad: "en_universidad",
        en_universidad: "en_desplazamiento_metro",
        en_desplazamiento_metro: "en_metro",
    };
    await updateTripState(trip.id, user.email, transitions[trip.state]);
    await refreshData();
}
function logout() {
    clearUser();
    router.push("/");
}
onMounted(async () => {
    await refreshData();
    intervalId.value = window.setInterval(refreshData, 15000);
});
onBeforeUnmount(() => {
    if (intervalId.value) {
        window.clearInterval(intervalId.value);
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.canRender) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container py-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "d-flex justify-content-between align-items-center mb-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "mb-0" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-muted mb-0" },
    });
    (__VLS_ctx.user?.email);
    (__VLS_ctx.user?.role);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.logout) },
        ...{ class: "btn btn-outline-danger" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "card p-4 mb-4 shadow-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.submitTrip) },
        ...{ class: "row g-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 col-md-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ class: "form-control" },
        required: true,
        minlength: "3",
    });
    (__VLS_ctx.form.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 col-md-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ class: "form-control" },
        required: true,
        minlength: "3",
    });
    (__VLS_ctx.form.meeting_point);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 col-md-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ class: "form-control" },
        type: "datetime-local",
        required: true,
    });
    (__VLS_ctx.form.start_at);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 col-md-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.form.transport_mode),
        ...{ class: "form-select" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "caminando",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "bus_universidad",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12 col-md-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "form-label" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
        value: (__VLS_ctx.form.direction),
        ...{ class: "form-select" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "metro_universidad",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        value: "universidad_metro",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "col-12" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ class: "btn btn-primary" },
        type: "submit",
    });
    if (__VLS_ctx.message) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "mt-3" },
        });
        (__VLS_ctx.message);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "table-responsive" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "table table-striped" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [trip] of __VLS_getVForSourceType((__VLS_ctx.trips))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (trip.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (trip.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (trip.transport_mode);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (trip.state);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (trip.participants.length);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({
            ...{ class: "d-flex gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.canRender))
                        return;
                    __VLS_ctx.onJoin(trip.id);
                } },
            ...{ class: "btn btn-sm btn-outline-primary" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.canRender))
                        return;
                    __VLS_ctx.onLeave(trip.id);
                } },
            ...{ class: "btn btn-sm btn-outline-secondary" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.canRender))
                        return;
                    __VLS_ctx.onAdvanceState(trip);
                } },
            ...{ class: "btn btn-sm btn-outline-primary" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "d-grid gap-3" },
    });
    for (const [map] of __VLS_getVForSourceType((__VLS_ctx.heatmaps))) {
        /** @type {[typeof HeatmapGrid, ]} */ ;
        // @ts-ignore
        const __VLS_0 = __VLS_asFunctionalComponent(HeatmapGrid, new HeatmapGrid({
            key: (map.transport_mode),
            title: (map.transport_mode === 'caminando'
                ? 'Mapa de calor - Caminando'
                : 'Mapa de calor - Bus universidad'),
            map: (map),
        }));
        const __VLS_1 = __VLS_0({
            key: (map.transport_mode),
            title: (map.transport_mode === 'caminando'
                ? 'Mapa de calor - Caminando'
                : 'Mapa de calor - Bus universidad'),
            map: (map),
        }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    }
}
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-content-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-0']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-danger']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['g-3']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-6']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-6']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-control']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['col-md-4']} */ ;
/** @type {__VLS_StyleScopedClasses['form-label']} */ ;
/** @type {__VLS_StyleScopedClasses['form-select']} */ ;
/** @type {__VLS_StyleScopedClasses['col-12']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['table-responsive']} */ ;
/** @type {__VLS_StyleScopedClasses['table']} */ ;
/** @type {__VLS_StyleScopedClasses['table-striped']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-outline-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['d-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HeatmapGrid: HeatmapGrid,
            user: user,
            trips: trips,
            heatmaps: heatmaps,
            message: message,
            form: form,
            canRender: canRender,
            submitTrip: submitTrip,
            onJoin: onJoin,
            onLeave: onLeave,
            onAdvanceState: onAdvanceState,
            logout: logout,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
