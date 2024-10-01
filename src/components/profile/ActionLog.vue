<template>
  <div class="border-b">
    <h3 class="font-bold">Action Log</h3>
  </div>
  <div class="m-5">
    <div v-if="fetching" class="m-5">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="actionLogEntries.length === 0">
        <h3>No record found. If you believe this was an error please make a ticket.</h3>
      </div>
      <div v-else class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" class="px-6 py-3">Entry</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Added By</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ale, idx) in actionLogEntries" :key="idx" class="bg-white border-b">
              <th scope="row" class="text-wrap px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ ale.entry }}
              </th>
              <td class="px-6 py-4">
                {{ new Date(ale.created_at).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                {{ ale.created_by }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ActionLog } from "@/types";
import useUserStore from "@/stores/user";

import Spinner from "@/components/animations/Spinner.vue";

const userStore = useUserStore();

const actionLogEntries = ref<ActionLog[]>([]);
const fetching = ref<boolean>(true);

onMounted(async () => {
  actionLogEntries.value = await userStore.fetchActionLog(userStore.self.cid);
  fetching.value = false;
});
</script>

<style scoped></style>
