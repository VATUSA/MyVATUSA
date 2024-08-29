<template>
  <Page title="Facilities Joined">
    <div class="grid gap-y-5 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
      <div v-for="(roster, idx) in userStore.user!.rosters" :key="idx">
        <Card class="py-0">
          <div class="grid grid-cols-1 divide-y-2">
            <div class="min-h-16 flex px-10 justify-between">
              <div class="flex my-auto = gap-x-4">
                <h2 class="font-semibold text-xl">{{ roster.facility }}</h2>
                <span class="my-auto">{{ facilityStore.getFacility(roster.facility)?.name }}</span>
              </div>
              <div class="my-auto">
                <a
                  v-if="facilityStore.getFacility(roster.facility)?.url"
                  class="mx-1"
                  :href="facilityStore.getFacility(roster.facility)?.url"
                  target="_blank"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square text-usa-grey"></i>
                </a>
              </div>
            </div>
            <div class="min-h-60 px-10 py-2">
              <div class="flex gap-x-4 text-xl">
                <p v-if="roster.home" class="text-green-500">Home</p>
                <p v-else-if="roster.visiting" class="text-blue-500">Visiting</p>
                <p v-else class="text-sm text-gray-500">Inactive</p>
              </div>

              <div class="my-2">
                <p class="text-gray-500">Operating Initials:</p>
                <p>{{ roster.operating_initials || "N/A" }}</p>
              </div>

              <div v-if="roster.roles.length > 0" class="my-2">
                <p class="text-gray-500">Roles:</p>
                <p>
                  <span v-for="(role, i) in roster.roles" :key="i">
                    {{ role.role }}
                    <span v-if="i < roster.roles.length - 1">, </span>
                  </span>
                </p>
              </div>

              <div class="my-2">
                <p class="text-gray-500">Member Since:</p>
                <p>
                  {{
                    new Date(roster.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                </p>
              </div>
            </div>
            <div class="px-10 py-4 font-semibold text-lg">
              <div v-if="roster.home" class="flex gap-x-4 text-usa-red">
                <i class="fa-solid fa-share my-auto h-6 fa-fw"></i>
                <p class="my-auto">Transfer Out</p>
              </div>
              <div v-if="roster.visiting" class="flex gap-x-4 text-usa-red">
                <i class="fa-solid fa-xmark my-auto h-6 fa-fw"></i>
                <p class="my-auto">Leave ARTCC</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card class="py-0 border-dashed border-2 border-green-400" :transparent="true">
        <div class="flex flex-col h-full">
          <div class="my-auto mx-auto text-center">
            <i class="fa-solid fa-square-plus h-16 w-16 text-green-400"></i>
            <p class="font-lg">Join a Facility.</p>
          </div>
        </div>
      </Card>
    </div>
    <div v-if="!userStore.hasFetchedRosters || !facilityStore.hasFetched" class="m-5">
      <Spinner />
    </div>
  </Page>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useFacilityStore from "@/stores/facility";
import useUserStore from "@/stores/user";

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
