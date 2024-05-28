<template>
  <Page title="Facility">
    <Card>
      <div class="px-4 border-b">
        <h3 class="font-bold">Facilities you've joined</h3>
      </div>
      <div v-if="!userStore.hasFetchedRosters || !facilityStore.hasFetched" class="m-5">
        <Spinner />
      </div>
      <div v-else class="m-5">
        <p v-if="userStore.user?.rosters?.length == 0" class="text-gray-500">You haven't joined any facilities yet.</p>
        <div v-else class="grid gap-y-5 lg:grid-cols-2 gap-x-20">
          <div v-for="(roster, idx) in userStore.user!.rosters" :key="idx" class="border-b">
            <div class="flex justify-between">
              <div>
                <div>
                  <span class="font-semibold text-xl">{{ roster.facility }}</span>
                  <span v-if="roster.status == 'loa'" class="font-semibold text-xl text-yellow-500 ml-2">(LOA)</span>
                  - {{ facilityStore.getFacility(roster.facility)?.name }}
                  <a
                    v-if="facilityStore.getFacility(roster.facility)?.url"
                    class="mx-1"
                    :href="facilityStore.getFacility(roster.facility)?.url"
                    target="_blank"
                  >
                    <i class="fa-solid fa-arrow-up-right-from-square text-gray-500"></i>
                  </a>
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
                <div class="flex gap-x-2">
                  <span v-if="roster.roles.length == 0" class="text-gray-700">No roles</span>
                  <span v-for="(role, idx) in roster.roles" :key="idx" class="text-gray-700"> {{ role.role }} </span>
                </div>
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
import { onMounted } from "vue";
import useFacilityStore from "@/stores/facility.ts";
import useUserStore from "@/stores/user.ts";

// Components
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";
import Spinner from "@/components/animations/Spinner.vue";

const facilityStore = useFacilityStore();
const userStore = useUserStore();

onMounted(() => {
  if (!facilityStore.hasFetched) {
    facilityStore.fetchFacilities();
  }
  if (!userStore.hasFetchedRosters) {
    userStore.fetchRosters();
  }
});
</script>

<style scoped></style>
