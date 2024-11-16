<template>
  <Page :title="userStore.fullName">
    <div class="flex divide-x divide-gray-300">
      <div class="w-3/4 mr-10 space-y-6">
        <Card> Controller Stuff </Card>
      </div>
      <div class="w-1/4 py-4 px-6">
        <div class="flex flex-col gap-y-6 divide-y divide-gray-300">
          <div class="px-4">
            <h3 class="text-usa-blue font-bold text-2xl underline">To Do</h3>
            <p class="text-gray-700 font-semibold">No pending tasks</p>
          </div>
          <div class="pt-5 px-4">
            <h3 class="text-usa-blue font-bold text-2xl underline mb-3">Upcoming Events</h3>
            <div v-if="!!eventStore.upcoming_events" class="space-y-1">
              <button
                v-for="event in eventStore.upcoming_events"
                :key="event.id"
                class="hover:bg-gray-200 text-left transition duration-200 rounded-xl p-2 my-1"
              >
                <router-link :to="{ name: 'Event', params: { facility_id: event.facilities[0], id: event.id } }">
                  <div>
                    <p class="text-gray-700 font-semibold text-lg">
                      {{ event.title }} <span class="font-normal">({{ event.fields.toString() }})</span>
                    </p>
                    <p class="text-gray-700">
                      {{
                        new Date(event.start_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      {{ new Date(event.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                      -
                      {{ new Date(event.end_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                    </p>
                  </div>
                  <hr class="w-[15%] bg-usa-red h-0.5" />
                </router-link>
              </button>
              <p v-if="eventStore.upcoming_events.length === 0" class="text-gray-700 font-semibold">None Found.</p>
            </div>
          </div>
          <div class="pt-5 px-4">
            <h3 class="text-usa-blue font-bold text-2xl underline">Help</h3>
            <p class="text-gray-700 font-semibold">Frequently Asked Questions</p>
            <p class="text-gray-700 font-semibold">Created a Ticket</p>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>
<script setup lang="ts">
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";

import useUserStore from "@/stores/user";
import useEventStore from "@/stores/event";
import { onMounted } from "vue";

const userStore = useUserStore();
const eventStore = useEventStore();

onMounted(() => {
  eventStore.fetchUpcomingEvents();
});
</script>
