<template>
  <div class="border-b">
    <h3 class="font-bold">Personal Details</h3>
  </div>
  <div class="m-5">
    <div v-if="!!editableUser" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">First name</p>
        <input
          v-model="editableUser.first_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="John"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Last name</p>
        <input
          v-model="editableUser.last_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="Doe"
          disabled
        />
      </div>
      <div class="col-span-1 md:col-span-2 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Email</p>
        <input
          v-model="editableUser.email"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="John@johnrocks.com"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Preferred Name</p>
        <input
          v-model="editableUser.preferred_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="Johnny"
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Preferred OIs</p>
        <input
          v-model="editableUser.preferred_ois"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="JD"
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Pilot Rating</p>
        <input
          v-model="editableUser.pilot_rating_string"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="1"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Controller Rating</p>
        <input
          v-model="editableUser.controller_rating_string"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="S1"
          disabled
        />
      </div>
    </div>
  </div>
  <div class="mt-20 border-b">
    <h3 class="font-bold">Facility Details</h3>
  </div>
  <div v-if="!!rosters" class="m-5">
    <div class="grid grid-cols-4 gap-x-5 border-b font-semibold">
      <div class="col-span-1 flex">Facility</div>
      <div class="col-span-1 flex">Type</div>
      <div class="col-span-1 flex">Join Date</div>
      <div class="col-span-1 flex">Exit Date</div>
    </div>
    <div
      v-for="(roster, idx) in rosters"
      :key="idx"
      class="grid grid-cols-4 gap-x-5 gap-y-10"
      :class="idx % 2 == 0 ? 'bg-usa-white' : 'bg-white'"
    >
      <div class="col-span-1 flex flex-col">
        {{ roster.facility }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ roster.home ? "Home" : "Visiting" }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ new Date(roster.created_at).toLocaleDateString() }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ roster.deleted_at ? new Date(roster.deleted_at).toLocaleDateString() : "N/A" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { User, Roster } from "@/types";

const props = defineProps<{
  user: User | null;
  rosters: Roster[] | null;
}>();

const editableUser = ref<User | null>(props.user);
</script>

<style scoped></style>
