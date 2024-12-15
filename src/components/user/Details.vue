<template>
  <div class="bg-gray-100 rounded-t p-2">
    <h5 class="font-bold text-sm">Details</h5>
  </div>
  <p v-if="props.userInfo === null">Failed to fetch user info.</p>
  <div v-else class="p-4 grid grid-cols-3 gap-y-5">
    <div class="col-span-1 text-gray-600">CID</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.cid }}</div>
    <div class="col-span-1 text-gray-600">Email</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.email }}</div>
    <div class="col-span-1 text-gray-600">Preferred OIs</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.preferred_ois }}</div>
    <div class="col-span-1 text-gray-600">Discord ID</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.discord_id ?? "Not Linked" }}</div>
    <div class="col-span-1 text-gray-600">Rating</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.controller_rating_string }}</div>
    <div class="col-span-1 text-gray-600">Pilot Rating</div>
    <div class="col-span-2 font-semibold">{{ props.userInfo.pilot_rating_string ?? "N/A" }}</div>
  </div>
</template>

<script lang="ts" setup>
import { User } from "@/types";

const props = defineProps<{
  userInfo: User | null;
}>();
</script>

<style scoped></style>
