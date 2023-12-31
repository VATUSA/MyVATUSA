<template>
  <div class="bg-usa-blue w-[275px] p-4 text-sm">
    <img src="@/assets/logo-alt.png" class="w-5/6 pb-10" />
    <div v-for="(link, idx) in SidebarLinks" :key="idx">
      <div v-if="link.separator" class="mt-2 flex py-1 my-auto">
        <h2 v-if="link.separatorTitle !== undefined" class="mr-4 text-usa-white text-md font-bold">
          {{ link.separatorTitle }}
        </h2>
        <hr class="bg-extra-dark-purple dark:bg-extra-dark-purple my-2.5 flex-grow" />
      </div>
      <div
        class="flex rounded p-3 hover:bg-white hover:bg-opacity-20 hover:text-usa-red items-center justify-between my-0.5"
        :class="isCurrentRoute(link.to) ? 'bg-white bg-opacity-10 font-bold text-usa-red' : 'text-usa-white'"
      >
        <div class="flex items-center gap-x-4">
          <span class="w-4 mx-auto text-center">
            <i :class="link.icon"></i>
          </span>
          <h2>{{ link.title }}</h2>
        </div>
        <button v-if="link.subLinks" @click="toggleSubLinkg(link.title)">
          <i :class="showSubLinks.includes(link.title) ? 'fas fa-chevron-down' : 'fas fa-chevron-up'"></i>
        </button>
      </div>
      <div
        v-for="(subLink, index) in link.subLinks"
        v-if="showSubLinks.includes(link.title)"
        :key="index"
        class="flex rounded p-2 hover:bg-white hover:bg-opacity-20 hover:text-usa-red items-center justify-between text-usa-white px-10"
      >
        <h2>{{ subLink.title }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouteLocationRaw, useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import SidebarLinks from "@/data/sidebar";

const route = useRoute();
const currentRouteName = computed(() => route.name);

const isCurrentRoute = (to: RouteLocationRaw | undefined): boolean => {
  if (to === undefined) return false;
  return to.name === currentRouteName.value;
};

const showSubLinks = ref<string[]>([]);

const toggleSubLink = (title: string): void => {
  if (showSubLinks.value?.includes(title)) {
    showSubLinks.value = showSubLinks.value?.filter((link) => link !== title);
  } else {
    showSubLinks.value?.push(title);
  }
};

onMounted(() => {
  SidebarLinks.forEach((link) => {
    if (link.showSubLinks) {
      showSubLinks.value?.push(link.title);
    }
  });
});
</script>

<style scoped></style>
