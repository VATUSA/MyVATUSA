<template>
  <Page title="Events">
    <div class="grid grid-cols-4 mx-10">
      <div class="col-span-3 px-10">
        <h3 class="text-2xl font-bold text-usa-grey">Upcoming Events</h3>
      </div>
      <div class="col-span-1 px-10">
        <h3 class="text-2xl font-bold text-usa-grey">Past Events</h3>
      </div>
      <div class="col-span-3 grid grid-cols-2 gap-10 p-10">
        <div v-if="fetchingEvents" class="m-5">
          <Spinner />
        </div>
        <div
          v-for="(event, idx) in events"
          v-else
          :key="idx"
          class="hover:-translate-y-1 transition duration-500 hover:opacity-90 cursor-pointer"
        >
          <div class="bg-usa-white drop-shadow-sm rounded-xl">
            <div class="px-10 pt-8">
              <h5 class="font-bold text-2xl text-usa-grey">{{ event.title }}</h5>
              <h6 class="font-semibold text-xl text-gray-600">Presented By {{ event.facilities.join(", ") }}</h6>

              <div class="grid grid-cols-2 my-6 font-semibold gap-y-5">
                <div>
                  <p class="font-bold text-sm text-gray-700">Date:</p>
                  <p class="text-lg text-gray-700">
                    {{
                      new Date(event.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </p>
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-700">Positions:</p>
                  <p class="text-lg text-gray-700">
                    {{ positionCount(event.positions)[1] }} Shifts Available ({{ positionCount(event.positions)[0] }}
                    Total)
                  </p>
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-700">Time:</p>
                  <p class="text-lg text-gray-700">
                    {{ new Date(event.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                    -
                    {{ new Date(event.end_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                  </p>
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-700">Routing:</p>
                  <p class="text-lg text-gray-700">{{ event.routing.length }} Routes Entered</p>
                </div>
              </div>
            </div>
            <img class="rounded-b-xl h-auto mt-4 lg:mt-0" :src="event.banner_url" :alt="event.title" />
          </div>
        </div>
      </div>
      <div class="col-span-1 space-y-5 p-10">
        <div
          v-for="(event, idx) in previousEvents"
          :key="idx"
          class="hover:-translate-y-1 transition duration-500 hover:opacity-90 cursor-pointer"
        >
          <div class="bg-usa-white drop-shadow-sm rounded-xl">
            <div class="px-10 pt-8">
              <h5 class="font-bold text-2xl text-usa-grey">{{ event.title }}</h5>

              <div class="grid grid-cols-2 my-3 font-semibold">
                <div>
                  <p class="font-bold text-sm text-gray-700">Date:</p>
                  <p class="text-lg text-gray-700">
                    {{
                      new Date(event.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </p>
                </div>
                <div>
                  <p class="font-bold text-sm text-gray-700">Aircraft Seen:</p>
                  <p class="text-lg text-gray-700">Future...</p>
                </div>
              </div>
            </div>
            <img class="rounded-b-xl h-auto mt-4 lg:mt-0" :src="event.banner_url" :alt="event.title" />
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import Page from "@/components/Page.vue";

import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { Event, EventPosition } from "@/types";
import useEventStore from "@/stores/event";
import Spinner from "@/components/animations/Spinner.vue";

const route = useRoute();
const eventStore = useEventStore();
const facilityId = computed(() => route.params.facility_id as string);

const fetchingEvents = ref<boolean>(false);
const events = ref<Event[]>([]);
const previousEvents = ref<Event[]>([]);

// Returns [total, available]
const positionCount = (positions: EventPosition[]): [number, number] => {
  let total = 0;
  let available = 0;
  positions.forEach((pos) => {
    if (pos.shifts) {
      total += 2;
      if (pos.assignee === 0) {
        available += 1;
      }
      if (pos.secondary_assignee === 0) {
        available += 1;
      }
    } else {
      total += 1;
      if (pos.assignee === 0) {
        available += 1;
      }
    }
  });

  return [total, available];
};

async function fetchEvents(facId: string): Promise<void> {
  fetchingEvents.value = true;
  events.value = await eventStore.fetchEvents(facId);
  previousEvents.value = await eventStore.fetchPreviousEvents(facId);
  fetchingEvents.value = false;
}

watch(facilityId, async (newFacId) => {
  await fetchEvents(newFacId);
});

onMounted(async () => {
  await fetchEvents(facilityId.value);
});
</script>

<style scoped></style>
