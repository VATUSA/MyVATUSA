<template>
  <Page title="Profile">
    <Card>
      <div class="flex border-b gap-x-2">
        <div class="flex px-4 gap-x-2">
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
            <Profile />
          </div>
          <div v-else-if="selectedTab == 1" key="1">
            <Notifications />
          </div>
          <div v-else-if="selectedTab == 2" key="2">
            <Discord />
          </div>
        </transition>
      </div>
    </Card>
  </Page>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Components
import Card from "@/components/Card.vue";
import Discord from "@/components/profile/Discord.vue";
import Notifications from "@/components/profile/Notifications.vue";
import Page from "@/components/Page.vue";
import Profile from "@/components/profile/Profile.vue";

const tabs = ref<string[]>(["Profile", "Notifications", "Discord"]);

const selectedTab = ref<number>(0);
const changeTab = (tab: number): void => {
  selectedTab.value = tab;
};
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
</style>
