<template>
  <div class="space-y-3">
    <h4 v-if="props.positions.length === 0" class="text-lg text-usa-grey">No Positions Posted</h4>
    <div v-for="position in props.positions" :key="position.id">
      <h5 class="text-lg text-usa-grey">{{ position.position }}</h5>
      <div v-if="position.shifts" class="grid grid-cols-2 my-1 gap-x-0.5">
        <button
          v-for="idx in 2"
          :key="idx"
          class="hover:drop-shadow-sm text-sm bg-gray-200 font-semibold py-0.5 flex items-center justify-center"
          :class="[
            idx === 1 ? 'rounded-l-lg' : 'rounded-r-lg',
            isAssigned(position, idx) ? 'border border-usa-red' : 'border border-gray-200',
          ]"
          @mouseover="selected = position.position + idx"
          @mouseleave="resetSelected"
        >
          <div v-if="idx == 1">
            <span v-if="position.assignee == 0 && inSignups(position.signups, idx)" class="truncate"
              >Vacant (Requested)</span
            >
            <span v-else-if="position.assignee == 0">Vacant</span>
            <span v-else-if="position.assignee == userStore.self!.cid" class="font-bold">
              {{ position.assignee_name }}
            </span>
            <span v-else-if="inSignups(position.signups, idx)" class="truncate">
              {{ position.assignee_name }} (Requested)
            </span>
            <span v-else>{{ position.assignee_name }}</span>
          </div>
          <div v-else>
            <span v-if="position.secondary_assignee == 0 && inSignups(position.signups, idx)" class="truncate"
              >Vacant (Requested)</span
            >
            <span v-else-if="position.secondary_assignee == 0">Vacant</span>
            <span v-else-if="position.secondary_assignee == userStore.self!.cid" class="font-bold">
              {{ position.secondary_assignee_name }}
            </span>
            <span v-else-if="inSignups(position.signups, idx)" class="truncate">
              {{ position.secondary_assignee_name }} (Requested)
            </span>
            <span v-else>{{ position.secondary_assignee_name }}</span>
          </div>
          <PositionTooltip
            v-if="selected == position.position + idx"
            :can-edit-event="canEditEvent()"
            :shift="idx"
            :is-signedup="inSignups(position.signups, idx)"
            :is-assigned="isAssigned(position, idx)"
            :position="position"
            @update-positions="updatePositions()"
            @assign="assignPositionPassthrough"
          />
        </button>
      </div>
      <div v-else class="my-1">
        <button
          class="w-full hover:drop-shadow-sm text-sm rounded-lg bg-gray-200 font-semibold py-0.5 flex items-center justify-center"
          :class="userStore.self!.cid == position.assignee ? 'border-1 border-usa-red' : ''"
          @mouseover="selected = position.position"
          @mouseleave="resetSelected"
        >
          <span v-if="position.assignee == 0 && inSignups(position.signups, 1)" class="truncate"
            >Vacant (Requested)</span
          >
          <span v-else-if="position.assignee == 0">Vacant</span>
          <span v-else-if="position.assignee == userStore.self!.cid" class="font-bold">
            {{ position.assignee_name }}
          </span>
          <span v-else-if="inSignups(position.signups, 1)" class="truncate">
            {{ position.assignee_name }} (Requested)
          </span>
          <span v-else>{{ position.assignee_name }}</span>

          <PositionTooltip
            v-if="selected == position.position"
            :can-edit-event="canEditEvent()"
            :shift="1"
            :is-signedup="inSignups(position.signups, 1)"
            :is-assigned="isAssigned(position, 1)"
            :position="position"
            @update-positions="updatePositions()"
            @assign="assignPositionPassthrough"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EventPosition, EventSignups } from "@/types";
import useUserStore from "@/stores/user";
import { ref } from "vue";
import hasRole from "@/utils/auth";
import PositionTooltip from "@/components/event/PositionTooltip.vue";

const emit = defineEmits<{
  updatePositions: [];
  assign: [position: EventPosition];
}>();

const userStore = useUserStore();
const props = defineProps<{
  positions: EventPosition[];
  facility_id: string;
}>();

const selected = ref<string>("");

const inSignups = (signups: EventSignups[], shift: number): boolean => {
  return signups.some((signup) => signup.cid === userStore.self!.cid && signup.shift === shift);
};

const isAssigned = (position: EventPosition, shift: number): boolean => {
  return shift === 1 ? position.assignee === userStore.self!.cid : position.secondary_assignee === userStore.self!.cid;
};

// Wait 100ms then set select to empty string
const resetSelected = (): void => {
  selected.value = "";
};

const canEditEvent = (): boolean => {
  return hasRole(["ATM", "DATM", "EC", "AEC"], props.facility_id);
};

function updatePositions(): void {
  emit("updatePositions");
}

function assignPositionPassthrough(position: EventPosition): void {
  emit("assign", position);
}
</script>

<style scoped></style>
