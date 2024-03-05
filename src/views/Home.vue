<template>
  <Page title="Raaj Patel">
    <div class="flex divide-x divide-gray-300">
      <div class="w-3/4 mr-10 space-y-6">
        <!--        <div class="w-full bg-white p-4 rounded-lg border border-gray-200">-->
        <!--          <p>Pilot Window</p>-->
        <!--          <Flying :flight="Flight" />-->
        <!--        </div>-->
        <Card> Controller Stuff </Card>
      </div>
      <div class="w-1/4 py-4 px-6">
        <div class="flex flex-col gap-y-6 divide-y divide-gray-300">
          <div class="px-4">
            <h3 class="text-usa-blue font-bold text-2xl">To Do</h3>
            <p class="text-gray-700 font-semibold">No pending tasks</p>
          </div>
          <div class="pt-5 px-4">
            <h3 class="text-usa-blue font-bold text-2xl">Upcoming Events</h3>
            <p class="text-gray-700 font-semibold">No pending tasks</p>
          </div>
          <div class="pt-5 px-4">
            <h3 class="text-usa-blue font-bold text-2xl">Help</h3>
            <p class="text-gray-700 font-semibold">No pending tasks</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
<script setup lang="ts">
import Flying from "@/components/pilot/Flying.vue";

import { Flight } from "@/types";
import { ref } from "vue";
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";

const Flight = ref<Flight>({
  callsign: "DAL1234",
  aircraft: "B738",
  origin: "KJFK",
  destination: "KDEN",
  route: "JFK..DEN",
  departure_time: new Date().getTime(),
  arrival_time: new Date().getTime() + 7200000,
  duration: 120,
  distance: 750,
  status: "enroute",
});
</script>
