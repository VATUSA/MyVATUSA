<template>
  <Page v-if="user" :title="`${user.first_name} ${user.last_name}`">
    <h3 class="-mt-10 text-xl text-usa-grey font-semibold">{{ user.cid }} - {{ user.controller_rating_string }}</h3>
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
            <div class="grid-cols-5">
              <div class="col-span-5 flex justify-between mx-24">
                <h3><strong>Email:</strong> {{ user.email }}</h3>
                <h3><strong>Rating:</strong> {{ user.controller_rating_string }} ()</h3>
                <h3><strong>Home Facility:</strong> {{ user.controller_rating_string }} ()</h3>
                <h3><strong>Visiting:</strong> {{ user.controller_rating_string }} ()</h3>
              </div>
            </div>
          </div>
          <div v-else-if="selectedTab == 1" key="1"></div>
          <div v-else-if="selectedTab == 2" key="2"></div>
          <div v-else-if="selectedTab == 3" key="3"></div>
        </transition>
      </div>
    </Card>
  </Page>
  <Loader v-else />
</template>
<script lang="ts" setup>
import Card from "@/components/Card.vue";
import Page from "@/components/Page.vue";

import { onMounted, ref } from "vue";
import { User } from "@/types";
import useUserStore from "@/stores/user";
import { useRoute } from "vue-router";
import Loader from "@/components/animations/Loader.vue";

const userStore = useUserStore();
const route = useRoute();

const cid = ref<number>(parseInt(route.params.cid as string, 10));
const user = ref<User | null>(null);

const tabs = ref<string[]>(["Overview", "Rating", "Action Log", "Disciplinary Log"]);
const selectedTab = ref<number>(0);

const changeTab = (tab: number): void => {
  selectedTab.value = tab;
  window.location.hash = tabs.value[tab].toLowerCase();
};

onMounted(async () => {
  user.value = await userStore.fetchUser(cid.value);
});
</script>

<style scoped></style>
