<template>
  <Page :title="userStore.fullName">
    <div class="flex divide-x divide-gray-300">
      <div class="w-3/4 mr-10 space-y-6">
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
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";

import useUserStore from "@/stores/user";

const userStore = useUserStore();
</script>
