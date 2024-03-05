<template>
  <Page title="Facility">
    <Card>
      <div class="px-4 border-b">
        <h3 class="font-bold">Facilities you've joined</h3>
      </div>
      <div class="m-5">
        <p v-if="rosters.length == 0" class="text-gray-500">You haven't joined any facilities yet.</p>
        <div v-else class="grid gap-y-5 lg:grid-cols-2 gap-x-20">
          <div v-for="(roster, idx) in rosters" :key="idx" class="border-b">
            <div class="flex justify-between">
              <div>
                <div>
                  <span class="font-semibold text-xl">{{ roster.facility }}</span>
                  <span v-if="roster.status == 'loa'" class="font-semibold text-xl text-yellow-500 ml-2">(LOA)</span>
                  - {{ getFacility(roster.facility)?.name }}
                </div>
                <p v-if="roster.home" class="text-sm text-green-500">Home</p>
                <p v-else-if="roster.visiting" class="text-sm text-blue-500">Visiting</p>
                <p v-else class="text-sm text-gray-500">Inactive</p>
              </div>
              <p class="text-3xl text-usa-blue">{{ roster.operating_initials }}</p>
            </div>
            <div class="my-2 space-y-1">
              <div>
                <h5 class="font-semibold">Roles:</h5>
                <p class="">TA, AWM</p>
              </div>
              <div>
                <h5 class="font-semibold">Actions:</h5>
                <button v-if="roster.home" type="button" class="btn bg-blue-400 text-white font-bold py-1 px-2 rounded">
                  <i class="fas fa-share mr-2"></i>Transfer
                </button>
                <button
                  v-else-if="roster.visiting"
                  type="button"
                  class="btn bg-red-400 text-white font-bold py-1 px-2 rounded"
                >
                  <i class="fas fa-xmark mr-2"></i>Leave
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </Page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Roster } from "@/types";

// Components
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";

import getFacility from "../utils/facility";

const rosters = ref<Roster[]>([
  {
    id: 1,
    cid: 1,
    facility: "ZAB",
    operating_initials: "RP",
    home: true,
    visiting: false,
    status: "active",
    created_at: "2021-08-01T00:00:00.000Z",
  },
  {
    id: 2,
    cid: 1,
    facility: "ZDV",
    operating_initials: "RP",
    home: false,
    visiting: true,
    status: "active",
    created_at: "2021-08-01T00:00:00.000Z",
  },
  {
    id: 3,
    cid: 1,
    facility: "ZLC",
    operating_initials: "RO",
    home: false,
    visiting: true,
    status: "loa",
    created_at: "2021-08-01T00:00:00.000Z",
  },
]);
</script>

<style scoped></style>
