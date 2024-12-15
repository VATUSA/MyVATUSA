<template>
  <div>
    <Page title="Facilities Joined">
      <div class="grid gap-y-5 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
        <div v-for="(roster, idx) in userStore.user!.rosters" :key="idx">
          <Card class="border border-gray-300 shadow-sm hover:shadow-lg transition duration-200">
            <div class="-my-4 grid grid-cols-1 divide-y">
              <div class="min-h-16 flex px-6 justify-between">
                <div class="flex my-auto gap-x-4">
                  <h2 class="font-semibold text-2xl">{{ roster.facility }}</h2>
                  <span class="mt-1 text-gray-500 text-sm">{{ facilityStore.getFacility(roster.facility)?.name }}</span>
                </div>
                <div class="my-auto">
                  <a
                    v-if="facilityStore.getFacility(roster.facility)?.url"
                    class="mx-1"
                    :href="facilityStore.getFacility(roster.facility)?.url"
                    target="_blank"
                  >
                    <i
                      class="fa-solid fa-arrow-up-right-from-square text-gray-500 hover:text-usa-grey transition duration-100"
                    ></i>
                  </a>
                </div>
              </div>
              <div class="min-h-60 px-10 py-2">
                <div class="flex gap-x-4">
                  <p v-if="roster.home" class="text-green-500"><i class="fa-solid fa-house"></i> Home</p>
                  <p v-else-if="roster.visiting" class="text-blue-500"><i class="fa-solid fa-suitcase"></i> Visiting</p>
                  <p v-else class="text-sm text-gray-500">Inactive</p>
                </div>

                <div class="my-2">
                  <p class="text-gray-500 text-sm">Operating Initials:</p>
                  <p>{{ roster.operating_initials || "N/A" }}</p>
                </div>

                <div v-if="roster.roles.length > 0" class="my-2">
                  <p class="text-gray-500 text-sm">Roles:</p>
                  <p>
                    <span v-for="(role, i) in roster.roles" :key="i">
                      {{ role.role }}
                      <span v-if="i < roster.roles.length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div class="my-2">
                  <p class="text-gray-500 text-sm">Member Since:</p>
                  <p>
                    <i class="fa-regular fa-calendar"></i>
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
              <div class="p-4 font-semibold">
                <button
                  v-if="roster.home"
                  class="rounded-lg flex w-full gap-x-4 px-4 py-2 hover:bg-usa-red/10 text-usa-red transition duration-200"
                >
                  <i class="fa-regular fa-circle-up my-auto h-6 fa-fw"></i>
                  <p class="my-auto">Transfer Out</p>
                </button>
                <button
                  v-if="roster.visiting"
                  class="rounded-lg flex w-full gap-x-4 px-4 py-2 hover:bg-usa-red/10 text-usa-red transition duration-200"
                >
                  <i class="fa-solid fa-xmark my-auto h-6 fa-fw"></i>
                  <p class="my-auto">Leave ARTCC</p>
                </button>
              </div>
            </div>
          </Card>
        </div>

        <Card
          class="py-0 border-dashed border-2 border-green-400 hover:bg-green-400/10 transition duration-200 cursor-pointer"
          :transparent="true"
          @click="addRosterModal = true"
        >
          <div class="flex flex-col h-full">
            <div class="my-auto mx-auto text-center">
              <i class="fa-solid fa-square-plus h-6 w-6 text-green-400"></i>
              <p class="font-lg">Join a Facility.</p>
            </div>
          </div>
        </Card>
      </div>
      <div v-if="!userStore.hasFetchedRosters || !facilityStore.hasFetched" class="m-5">
        <Spinner />
      </div>
    </Page>

    <Modal title="Join a Facility" :visible="addRosterModal" size="w-fit max-w-1/2" @close="addRosterModal = false">
      <div class="grid grid-cols-3 gap-4 text-right align-middle text-usa-blue">
        <div class="my-auto font-semibold">Facility</div>
        <div class="col-span-2">
          <select
            v-model="desiredFacility"
            class="w-full p-3 rounded-lg bg-white outline outline-1 focus:outline-offset-2 outline-gray-400"
          >
            <option disabled value="">Select a facility</option>
            <option v-for="facility in facilityStore.facilities" :key="facility.id" :value="facility.id">
              {{ facility.name }}
            </option>
          </select>
        </div>
        <div class="my-auto font-semibold">Request Type</div>
        <div class="col-span-2">
          <select
            v-model="rosterRequest.request_type"
            class="w-full p-3 rounded-lg bg-white outline outline-1 focus:outline-offset-2 outline-gray-400"
          >
            <option disabled value="">Select a request type</option>
            <option value="home">Home</option>
            <option value="visiting">Visiting</option>
          </select>
        </div>
        <div class="my-auto font-semibold">Reason</div>
        <div class="col-span-2">
          <textarea
            v-model="rosterRequest.reason"
            class="w-full p-3 rounded-lg outline outline-1 outline-gray-400 min-h-[25px] min-w-[300px]"
          ></textarea>
        </div>
        <div class="col-span-3">
          <button
            class="rounded-lg bg-usa-blue text-white px-4 py-2 hover:bg-usa-blue/80 transition duration-200"
            @click="submitRosterRequest()"
          >
            Submit Request
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CreateRosterRequest } from "@/types";
import useFacilityStore from "@/stores/facility";
import useUserStore from "@/stores/user";

// Components
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";
import Spinner from "@/components/animations/Spinner.vue";
import Modal from "@/components/Modal.vue";

const facilityStore = useFacilityStore();
const userStore = useUserStore();

const addRosterModal = ref<boolean>(false);
const desiredFacility = ref<string>("");
const rosterRequest = ref<CreateRosterRequest>({
  cid: userStore.self!.cid,
  request_type: "",
  status: "pending",
  reason: "",
});

const submitRosterRequest = async (): Promise<void> => {
  await facilityStore.createRosterRequest(desiredFacility.value, rosterRequest.value);
  addRosterModal.value = false;
  rosterRequest.value = {
    cid: userStore.self!.cid,
    request_type: "",
    status: "pending",
    reason: "",
  };
  desiredFacility.value = "";
};

onMounted(() => {
  if (!facilityStore.hasFetched) {
    facilityStore.fetchFacilities();
  }
  if (!userStore.hasFetchedRosters) {
    userStore.fetchRosterSelf();
  }
});
</script>

<style scoped></style>
