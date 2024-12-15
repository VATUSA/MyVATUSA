<template>
  <div class="bg-gray-100 rounded-t p-2">
    <h5 class="font-bold text-sm">Flags</h5>
  </div>
  <p v-if="props.flags === null">Failed to get flags</p>
  <div v-else class="p-4 grid grid-cols-3 gap-y-5">
    <div class="col-span-1 text-gray-600">Visiting Allowed</div>
    <div class="col-span-2 font-semibold" :class="props.flags.no_visiting ? 'text-red-500' : ''">
      {{ props.flags.no_visiting ? "No" : "Yes" }}
    </div>

    <div class="col-span-1 text-gray-600">Transfer Allowed</div>
    <div class="col-span-2 font-semibold" :class="props.flags.no_transferring ? 'text-red-500' : ''">
      {{ props.flags.no_transferring ? "No" : "Yes" }}
    </div>

    <div class="col-span-1 text-gray-600">Training Allowed</div>
    <div class="col-span-2 font-semibold" :class="props.flags.no_training ? 'text-red-500' : ''">
      {{ props.flags.no_training ? "No" : "Yes" }}
    </div>

    <div class="col-span-1 text-gray-600">Staff Allowed</div>
    <div class="col-span-2 font-semibold" :class="props.flags.no_staff_role ? 'text-red-500' : ''">
      {{ props.flags.no_staff_role ? "No" : "Yes" }}
    </div>

    <p class="col-span-3 text-gray-600 italic text-sm px-4">
      To change these flags, please contact the VATUSA Staff with justfication.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { UserFlags } from "@/types";

const props = defineProps<{
  flags: UserFlags | null;
}>();
</script>

<style scoped></style>
