<template>
  <Page title="Profile">
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
            <Profile :user="userStore.self" />
          </div>
          <div v-else-if="selectedTab == 1" key="1">
            <Notifications />
          </div>
          <div v-else-if="selectedTab == 2" key="2">
            <Discord :user="userStore.user" />
          </div>
          <div v-else-if="selectedTab == 3" key="3">
            <ActionLog :user="userStore.user" />
          </div>
        </transition>
      </div>
    </Card>
  </Page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useUserStore from "@/stores/user";

// Components
import Card from "@/components/Card.vue";
import Discord from "@/components/profile/Discord.vue";
import Notifications from "@/components/profile/Notifications.vue";
import Page from "@/components/Page.vue";
import Profile from "@/components/profile/Profile.vue";
import ActionLog from "@/components/profile/ActionLog.vue";
import { notify } from "notiwind";

const userStore = useUserStore();

const tabs = ref<string[]>(["Profile", "Notifications", "Discord", "Action Log"]);

const selectedTab = ref<number>(0);
const changeTab = (tab: number): void => {
  selectedTab.value = tab;
  window.location.hash = tabs.value[tab].toLowerCase();
};

const route = useRoute();

const currentHashTab = computed(() => {
  const hash = route.hash.slice(1).split("?"); // Remove leading "#"

  const val = tabs.value.findIndex((tab) => tab.toLowerCase() === hash[0]);

  return val === -1 ? 0 : val;
});

watch(currentHashTab, (newTab) => {
  selectedTab.value = newTab;
});

// Initial check on component mount
onMounted(() => {
  selectedTab.value = currentHashTab.value;
  userStore.fetchRosters();

  // Check if an account was just linked
  const query = route.query;
  if (query.name !== undefined) {
    notify(
      {
        group: "br-success",
        title: "Discord Linked",
        text: `You have successfully linked your Discord account: ${query.name}!`,
      },
      4000
    );
  }
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
</style>
