<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-5">
    <div>
      <h3 class="text-2xl font-bold text-usa-blue mb-3">TMU</h3>
      <PositionList
        :positions="miscPositions"
        :facility_id="props.facility_id"
        @assign="assignPositionPassthrough"
        @update-positions="fetchPositions()"
      />
    </div>
    <div>
      <h3 class="text-2xl font-bold text-usa-blue mb-3">Enroute</h3>
      <PositionList
        :positions="enroutePosition"
        :facility_id="props.facility_id"
        @assign="assignPositionPassthrough"
        @update-positions="fetchPositions()"
      />
    </div>
    <div>
      <h3 class="text-2xl font-bold text-usa-blue mb-3">TRACON</h3>
      <PositionList
        :positions="traconPosition"
        :facility_id="props.facility_id"
        @assign="assignPositionPassthrough"
        @update-positions="fetchPositions()"
      />
    </div>
    <div>
      <h3 class="text-2xl font-bold text-usa-blue mb-3">Local</h3>
      <PositionList
        :positions="localPosition"
        :facility_id="props.facility_id"
        @assign="assignPositionPassthrough"
        @update-positions="fetchPositions()"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { EventPosition } from "@/types";
import useEventStore from "@/stores/event";
import { computed, onMounted, ref } from "vue";

import PositionList from "@/components/event/PositionList.vue";

const eventStore = useEventStore();
const props = defineProps<{
  facility_id: string;
  event_id: number;
}>();

const emit = defineEmits<{
  assign: [position: EventPosition];
}>();

const positions = ref<EventPosition[]>([]);

const miscPositions = computed<EventPosition[]>(() => {
  return (
    positions.value.filter(
      (position) => !["CTR", "APP", "DEP", "TWR", "GND", "DEL"].some((type) => position.position.includes(`_${type}`))
    ) || []
  );
});

const enroutePosition = computed<EventPosition[]>(() => {
  return positions.value.filter((position) => position.position.includes("_CTR")) || [];
});

const traconPosition = computed<EventPosition[]>(() => {
  return (
    positions.value.filter((position) => position.position.includes("_APP") || position.position.includes("_DEP")) || []
  );
});

const localPosition = computed<EventPosition[]>(() => {
  return (
    positions.value.filter(
      (position) =>
        position.position.includes("_TWR") || position.position.includes("_GND") || position.position.includes("_DEL")
    ) || []
  );
});

async function fetchPositions(): Promise<void> {
  positions.value = await eventStore.fetchEventPositions(props.facility_id, props.event_id);
}

function assignPositionPassthrough(position: EventPosition): void {
  emit("assign", position);
}

onMounted(async () => {
  await fetchPositions();
});
</script>

<style scoped></style>
