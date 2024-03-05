<template>
  <div class="border-b">
    <h3 class="font-bold">Personal Details</h3>
  </div>
  <div class="m-5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">First name</p>
        <input
          v-model="user.first_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="John"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Last name</p>
        <input
          v-model="user.last_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="Doe"
          disabled
        />
      </div>
      <div class="col-span-1 md:col-span-2 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Email</p>
        <input
          v-model="user.email"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="John@johnrocks.com"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Preferred Name</p>
        <input
          v-model="user.preferred_name"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="Johnny"
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Preferred OIs</p>
        <input
          v-model="user.preferred_ois"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="JD"
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Pilot Rating</p>
        <input
          v-model="user.pilot_rating"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="1"
          disabled
        />
      </div>
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Controller Rating</p>
        <input
          v-model="user.controller_rating"
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
  <div class="m-5">
    <div class="grid grid-cols-4 gap-x-5 border-b font-semibold">
      <div class="col-span-1 flex">Facility</div>
      <div class="col-span-1 flex">Type</div>
      <div class="col-span-1 flex">Join Date</div>
      <div class="col-span-1 flex">Exit Date</div>
    </div>
    <div
      v-for="(roster, idx) in user.rosters"
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

import { User } from "@/types";

const user = ref<User>({
  cid: 1,
  first_name: "John",
  last_name: "Doe",
  preferred_name: "Johnny",
  email: "vatusa6@vatusa.net",
  preferred_ois: "JD",
  pilot_rating: 1,
  controller_rating: 1,
  discord_id: "1234567890",
  rosters: [
    {
      id: 1,
      cid: 1,
      facility: "ZAB",
      operating_initials: "ZZ",
      home: true,
      visiting: false,
      status: "active",
      created_at: "2021-08-01T00:00:00.000Z",
      deleted_at: "2021-08-01T00:00:00.000Z",
    },
    {
      id: 2,
      cid: 1,
      facility: "ZDV",
      operating_initials: "ZZ",
      home: false,
      visiting: true,
      status: "active",
      created_at: "2021-08-01T00:00:00.000Z",
      deleted_at: "2021-08-01T00:00:00.000Z",
    },
    {
      id: 3,
      cid: 1,
      facility: "ZLC",
      operating_initials: "ZZ",
      home: true,
      visiting: false,
      status: "active",
      created_at: "2021-08-01T00:00:00.000Z",
    },
  ],
} as User);
</script>

<style scoped></style>
