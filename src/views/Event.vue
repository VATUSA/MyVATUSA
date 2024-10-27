<template>
  <div v-if="!loading" class="p-12">
    <div v-if="!!event" class="flex divide-x divide-gray-300">
      <div class="w-full space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-5">
          <div class="flex flex-col h-full justify-between">
            <div class="space-y-2 text-lg text-usa-grey">
              <h1 class="text-usa-blue text-3xl font-bold">{{ event.title }}</h1>
              <h2 class="text-usa-blue font-semibold">
                ARTCCs: <span class="font-normal">{{ event.facilities.toString() }}</span>
              </h2>
              <h2 class="text-usa-blue font-semibold">
                Fields: <span class="font-normal text-usa-grey">{{ event.fields.toString() }}</span>
              </h2>
              <h2 class="text-usa-blue font-semibold">
                Starts:
                <span v-if="new Date(event.end_date) <= new Date()">Completed</span>
                <span v-else-if="new Date(event.start_date) <= new Date()" class="font-normal text-usa-grey"
                  >In progress</span
                >
                <span v-else-if="new Date(event.start_date).toDateString() == new Date().toDateString()">
                  {{ timeTill(new Date(event.start_date)) }}
                </span>
                <span v-else class="font-normal text-usa-grey">
                  {{ new Date(event.start_date).toLocaleDateString() }} -
                  {{ new Date(event.start_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                </span>
              </h2>
              <h2 class="text-usa-blue font-semibold">
                Ends:
                <span v-if="new Date(event.end_date) <= new Date()">Completed</span>
                <span v-else-if="new Date(event.start_date) <= new Date()" class="font-normal text-usa-grey">
                  {{ timeTill(new Date(event.end_date)) }}
                </span>
                <span v-else class="font-normal text-usa-grey">
                  {{ new Date(event.end_date).toLocaleDateString() }} -
                  {{ new Date(event.end_date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                </span>
              </h2>
              <p class="text-base pt-4">
                {{ event.description }}
              </p>
            </div>
            <div></div>
          </div>
          <img class="h-auto mt-4 lg:mt-0" :src="event.banner_url" :alt="event.title" />
        </div>
        <Card>
          <div class="flex border-b gap-x-2">
            <div class="flex px-4 gap-x-2 overflow-y-scroll">
              <p
                v-for="(tab, index) in tabs"
                :key="index"
                class="py-3 my-auto px-3.5 text-md text-gray-500 cursor-pointer border-b-2 hover:border-usa-red transition"
                :class="selectedTab == index ? 'border-usa-red text-usa-red font-semibold' : 'border-b-transparent'"
                @click="changeTab(index)"
              >
                {{ tab }}
              </p>
            </div>
          </div>
          <div class="m-10">
            <transition mode="out-in">
              <div v-if="selectedTab == 0" key="0" class="">
                <div v-for="route in event.routing" :key="route.id" class="mb-5">
                  <div class="flex justify-between items-center mb-1">
                    <h3 class="text-xl font-semibold text-gray-800">{{ route.origin }} → {{ route.destination }}</h3>
                  </div>
                  <p class="text-usa-blue"><strong>Route:</strong> {{ route.route }}</p>
                  <p v-if="route.notes" class="text-gray-500 italic mt-1">Notes: {{ route.notes }}</p>
                </div>
                <div v-if="event.routing.length == 0">
                  <h3 class="text-xl font-semibold text-usa-grey">
                    No standard routes have been added for this event.
                  </h3>
                </div>
              </div>
              <div v-else>
                <EventPositions :facility_id="tabs[selectedTab]" :event_id="event.id" @assign="handleManualAssign" />
              </div>
            </transition>
          </div>
        </Card>
      </div>
    </div>
    <Page v-else title="404 Not Found">
      <h1 class="text-xl text-usa-blue font-semibold">
        The page you were looking for was not found. <br />
        If this is a recurring issue please report it to VATUSA6.
      </h1>
    </Page>
    <Modal :visible="manualAssignModal" title="Assign Position" @close="manualAssignModal = false">
      <div v-if="assignPosition">
        <h3 class="text-xl font-bold text-usa-blue">{{ assignPosition?.position || "err" }}</h3>
        Coming Soon
      </div>
      <p v-else>Error fetching position, please report this to staff.</p>
    </Modal>
  </div>
  <div v-else>
    <!--  TODO Loader v-else  -->
    Loading...
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Event, EventPosition } from "@/types";
import { useRoute } from "vue-router";
import useEventStore from "@/stores/event";

// Components
import Card from "@/components/Card.vue";
import Page from "@/components/Page.vue";
import EventPositions from "@/components/event/EventPositions.vue";
import Modal from "@/components/Modal.vue";

const eventStore = useEventStore();

const tabs = ref<string[]>(["Routing"]);

const selectedTab = ref<number>(0);
const changeTab = (tab: number): void => {
  selectedTab.value = tab;
  window.location.hash = tabs.value[tab].toLowerCase();
};

const route = useRoute();

const loading = ref<boolean>(true);
const event = ref<Event>();

const currentHashTab = computed(() => {
  const hash = route.hash.slice(1).split("?"); // Remove leading "#"

  const val = tabs.value.findIndex((tab) => tab.toLowerCase() === hash[0]);

  return val === -1 ? 0 : val;
});

watch(currentHashTab, (newTab) => {
  selectedTab.value = newTab;
});

function timeTill(targetDate: Date): string {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    return "00:00";
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `T-${hours}h ${minutes}m`;
}

const manualAssignModal = ref<boolean>(false);
const assignPosition = ref<EventPosition>();

function handleManualAssign(position: EventPosition): void {
  manualAssignModal.value = true;
  assignPosition.value = position;
}

onMounted(async () => {
  const temp = await eventStore.fetchEvent(route.params.facility_id as string, route.params.id);
  if (!temp) {
    return;
  }
  event.value = temp;
  tabs.value.push(...event.value.facilities);
  loading.value = false;
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.tooltip {
  @apply invisible absolute;
}

.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>
