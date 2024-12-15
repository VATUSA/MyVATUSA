<template>
  <div class="flex grid grid-cols-5 border-t border-gray-300 pt-4 h-[500px]">
    <div class="col-span-1 text-gray-500 space-y-1.5">
      <h5
        v-for="tab in tabOptions"
        :key="tab"
        class="cursor-pointer"
        :class="selectedTab === tab ? 'text-usa-red font-semibold' : 'hover:text-usa-blue'"
        @click="changeTab(tab)"
      >
        {{ tab }}
      </h5>
    </div>
    <div class="col-span-4 px-2 overflow-y-auto">
      <Spinner v-if="modalLoading" />
      <div v-else>
        <div v-if="selectedTab === 'Overview'">
          <div class="grid grid-cols-2 gap-x-5">
            <div class="col-span-1 border border-gray-200 rounded">
              <Details :user-info="userInfo" />
            </div>
            <div class="col-span-1 border border-gray-200 rounded">
              <p v-if="userInfo === null">Loading Flags...</p>
              <Flags v-else :flags="userInfo.flags" />
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'Rating'">
          <div class="overflow-x-auto overflow-y-auto border border-gray-200 rounded">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3">Date</th>
                  <th scope="col" class="px-6 py-3">Changed By</th>
                  <th scope="col" class="px-6 py-3">Old Rating</th>
                  <th scope="col" class="px-6 py-3">New Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ratingChange, idx) in ratingChanges" :key="idx" class="bg-white border-b">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{
                      new Date(ratingChange.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </th>
                  <td class="px-6 py-4">{{ ratingChange.created_by_cid }}</td>
                  <td class="px-6 py-4">{{ getControllerRating(ratingChange.old_rating) }}</td>
                  <td class="px-6 py-4">
                    {{ getControllerRating(ratingChange.new_rating) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="selectedTab === 'Transfers'"></div>
        <div v-if="selectedTab === 'Rosters'"></div>
        <div v-if="selectedTab === 'Action Log'">
          <div class="relative overflow-x-auto border border-gray-200 rounded">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3 text-nowrap">Date</th>
                  <th scope="col" class="px-6 py-3 text-nowrap">Added By</th>
                  <th scope="col" class="px-6 py-3 text-nowrap">Entry</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="actionLogEntries.length === 0" class="bg-white border-b">
                  <td class="px-6 py-2">No entries found</td>
                </tr>
                <tr v-for="(ale, idx) in actionLogEntries" :key="idx" class="bg-white border-b">
                  <td class="px-6 py-2 text-nowrap">
                    {{
                      new Date(ale.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </td>
                  <td class="px-6 py-2 text-nowrap">
                    {{ ale.created_by }}
                  </td>
                  <th scope="row" class="text-wrap px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {{ ale.entry }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="selectedTab === 'Disciplinary Log'">
          <div class="relative overflow-x-auto border border-gray-200 rounded">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3 text-nowrap">Date</th>
                  <th scope="col" class="px-6 py-3 text-nowrap">Added By</th>
                  <th scope="col" class="px-6 py-3 text-nowrap">Entry</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="disciplinaryLogEntries.length === 0" class="bg-white border-b">
                  <td class="px-6 py-2">No entries found</td>
                </tr>
                <tr v-for="(dle, idx) in disciplinaryLogEntries" :key="idx" class="bg-white border-b">
                  <td
                    class="px-6 py-2 text-nowrap"
                    :class="isImportantDisciplinaryLog(dle) ? 'text-red-500' : 'text-gray-900'"
                  >
                    {{
                      new Date(dle.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  </td>
                  <td
                    class="px-6 py-2 text-nowrap"
                    :class="isImportantDisciplinaryLog(dle) ? 'text-red-500' : 'text-gray-900'"
                  >
                    {{ dle.created_by }}
                  </td>
                  <th
                    scope="row"
                    class="text-wrap px-6 py-2 font-medium whitespace-nowrap"
                    :class="isImportantDisciplinaryLog(dle) ? 'text-red-500' : 'text-gray-900'"
                  >
                    {{ dle.entry }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getControllerRating } from "@/utils/rating";
import Spinner from "@/components/animations/Spinner.vue";
import { onMounted, ref, watch } from "vue";
import { ActionLog, DisciplinaryLog, RatingChange, Roster, User } from "@/types";
import useUserStore from "@/stores/user";

import { useRoute } from "vue-router";
import Details from "@/components/user/Details.vue";
import Flags from "@/components/user/Flags.vue";

const route = useRoute();
const userStore = useUserStore();
const props = defineProps<{
  roster: Roster | null;
}>();

const selectedTab = ref<string>("Overview");
const tabOptions = ["Overview", "Rating", "Transfers", "Rosters", "Action Log", "Disciplinary Log"];

const modalLoading = ref<boolean>(false);

// User Info
const userInfo = ref<User | null>(null);
const fetchUserInfo = async (cid: number): Promise<void> => {
  modalLoading.value = true;
  userInfo.value = await userStore.fetchUser(cid);
  modalLoading.value = false;
};

// Rating Changes
const ratingChanges = ref<RatingChange[]>([]);
const fetchRatingChanges = async (cid: number): Promise<void> => {
  modalLoading.value = true;
  ratingChanges.value = await userStore.fetchRatingChanges(cid);
  modalLoading.value = false;
};

// Action Log
const actionLogEntries = ref<ActionLog[]>([]);
const fetchActionLogEntries = async (cid: number): Promise<void> => {
  modalLoading.value = true;
  actionLogEntries.value = await userStore.fetchActionLog(cid);

  actionLogEntries.value.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  modalLoading.value = false;
};

// Disciplinary Log
const disciplinaryLogEntries = ref<DisciplinaryLog[]>([]);
const fetchDisciplinaryLogEntries = async (cid: number): Promise<void> => {
  modalLoading.value = true;
  disciplinaryLogEntries.value = await userStore.fetchDisciplinaryLog(cid);

  disciplinaryLogEntries.value.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  modalLoading.value = false;
};
const isImportantDisciplinaryLog = (entry: DisciplinaryLog): boolean => {
  if (userInfo.value === null) return false;
  if (userInfo.value.flags === null) return false;

  if (entry.id === userInfo.value.flags.no_training_log_entry_id) {
    return true;
  }

  if (entry.id === userInfo.value.flags.no_staff_log_entry_id) {
    return true;
  }

  if (entry.id === userInfo.value.flags.no_transferring_log_entry_id) {
    return true;
  }

  if (entry.id === userInfo.value.flags.no_visiting_log_entry_id) {
    return true;
  }

  return false;
};

const changeTab = (tab: string): void => {
  if (tab === selectedTab.value) return;
  if (tab === "Overview") {
    fetchUserInfo(props.roster?.cid as number);
  }
  if (tab === "Rating") {
    fetchRatingChanges(props.roster?.cid as number);
  }
  if (tab === "Action Log") {
    fetchActionLogEntries(props.roster?.cid as number);
  }
  if (tab === "Disciplinary Log") {
    fetchDisciplinaryLogEntries(props.roster?.cid as number);
  }
  window.location.hash = tab;
  selectedTab.value = tab;
};

watch(
  () => route.hash,
  (newHash) => {
    changeTab(newHash.replace("#", ""));
  }
);

onMounted(async () => {
  await fetchUserInfo(props.roster?.cid as number);
});
</script>

<style scoped></style>
