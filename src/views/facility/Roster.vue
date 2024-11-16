<template>
  <Page title="Roster">
    <Card v-if="!fetchingRosterRequests && pendingRosterRequests.length > 0" class="-mx-12 md:mx-0">
      <div class="mt-8 md:px-14">
        <div class="flex justify-between mb-6 mx-4">
          <div class="flex flex-col">
            <p class="font-bold text-gray-600 text-lg">Pending Requests</p>
          </div>
        </div>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">CID</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Reason</th>
                <th scope="col" class="px-6 py-3">Requested Date</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(rosterReq, idx) in pendingRosterRequests" :key="idx" class="bg-white border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ rosterReq.cid }}
                </th>
                <td class="px-6 py-4">{{ rosterReq.first_name }} {{ rosterReq.last_name }}</td>
                <td class="px-6 py-4">
                  {{ rosterReq.request_type }}
                </td>
                <td class="px-6 py-4">
                  {{ rosterReq.reason }}
                </td>
                <td class="px-6 py-4">
                  {{ new Date(rosterReq.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-1 space-x-4">
                  <button
                    class="bg-emerald-500 text-white w-8 h-8 rounded hover:bg-opacity-80"
                    @click="acceptRequest(rosterReq.id)"
                  >
                    <i class="fas fa-fw fa-check"></i>
                  </button>
                  <button
                    class="bg-red-500 text-white w-8 h-8 rounded hover:bg-opacity-80"
                    @click="rejectRequest(rosterReq.id)"
                  >
                    <i class="fas fa-fw fa-xmark"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 v-if="pendingRosterRequests.length === 0" class="text-center text-xl font-semibold m-5">
            No Feedback Found
          </h3>
        </div>
      </div>
    </Card>

    <Card class="-mx-12 md:mx-0">
      <div v-if="fetchingRoster" class="m-5">
        <Spinner />
      </div>
      <div v-else class="mt-8 md:px-14">
        <div class="flex justify-between mb-6 mx-4">
          <div class="flex flex-col">
            <p class="font-bold text-gray-600 text-sm">Search</p>
            <input
              v-model="search"
              style="outline: 0"
              class="my-1 py-1 border-b focus:border-b-usa-blue hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
              placeholder="Search"
            />
          </div>
          <div class="text-right text-usa-grey text-lg my-auto">
            <p>
              Home Controllers: <strong>{{ activeRoster.filter((roster) => roster.home).length }}</strong>
            </p>
            <p>
              Visiting Controllers: <strong>{{ activeRoster.filter((roster) => roster.visiting).length }}</strong>
            </p>
          </div>
        </div>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">CID</th>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">OIs</th>
                <th scope="col" class="px-6 py-3">Type</th>
                <th scope="col" class="px-6 py-3">Join Date</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(roster, idx) in filteredRoster" :key="idx" class="bg-white border-b">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ roster.cid }}
                </th>
                <td class="px-6 py-4">{{ roster.first_name }} {{ roster.last_name }}</td>
                <td class="px-6 py-4">
                  {{ roster.operating_initials }}
                </td>
                <td class="px-6 py-4">
                  <span class="font-semibold">{{ roster.home ? "Home" : "" }} </span>
                  <span>{{ roster.visiting ? "Visiting" : "" }}</span>
                </td>
                <td class="px-6 py-4">
                  {{ new Date(roster.created_at).toLocaleDateString() }}
                </td>
                <td class="px-6 py-1">
                  <button
                    class="bg-usa-blue text-white px-4 py-1 rounded hover:bg-opacity-80"
                    @click="selectUser(roster.cid)"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 v-if="filteredRoster.length === 0" class="text-center text-xl font-semibold m-5">No Feedback Found</h3>
        </div>
      </div>
    </Card>
  </Page>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import useFacilityStore from "@/stores/facility";
import { computed, onMounted, ref, watch } from "vue";
import { Roster, RosterRequest } from "@/types";
import Page from "@/components/Page.vue";
import Spinner from "@/components/animations/Spinner.vue";
import Card from "@/components/Card.vue";

const route = useRoute();
const facilityStore = useFacilityStore();
const facilityId = computed(() => route.params.facility_id as string);

const fetchingRoster = ref<boolean>(true);
const activeRoster = ref<Roster[]>([]);
const fetchingRosterRequests = ref<boolean>(true);
const pendingRosterRequests = ref<RosterRequest[]>([]);

const search = ref<string>("");
const filteredRoster = computed(() => {
  return activeRoster.value.filter((roster) => {
    return (
      roster.first_name.toLowerCase().includes(search.value.toLowerCase()) ||
      roster.last_name.toLowerCase().includes(search.value.toLowerCase()) ||
      roster.cid.toString().includes(search.value) ||
      roster.operating_initials.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

function acceptRequest(reqId: number): void {
  facilityStore.patchRosterRequest(facilityId.value, reqId, "accepted");
}

function rejectRequest(reqId: number): void {
  facilityStore.patchRosterRequest(facilityId.value, reqId, "rejected");
}

async function fetchRosters(facId: string): Promise<void> {
  fetchingRoster.value = true;
  pendingRosterRequests.value = await facilityStore.fetchRosterRequests(facId, "pending");
  fetchingRosterRequests.value = false;
  activeRoster.value = await facilityStore.fetchRoster(facId);
  fetchingRoster.value = false;
}

watch(facilityId, async (newFacId) => {
  await fetchRosters(newFacId);
});

onMounted(async () => {
  await fetchRosters(facilityId.value);
});
</script>

<style scoped></style>
