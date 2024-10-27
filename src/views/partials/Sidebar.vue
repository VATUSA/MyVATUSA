<template>
  <div class="bg-usa-blue w-[275px] p-4 text-sm">
    <img src="@/assets/logo.png" class="w-5/6 pb-10" />
    <div v-for="(link, idx) in SidebarLinks" :key="idx">
      <div v-if="link.separator" class="mt-2 flex py-1 my-auto">
        <h2 v-if="link.separatorTitle !== undefined" class="mr-4 text-usa-white text-md font-bold">
          {{ link.separatorTitle }}
        </h2>
        <hr class="bg-extra-dark-purple dark:bg-extra-dark-purple my-2.5 flex-grow" />
      </div>
      <router-link
        v-if="link.to"
        class="flex rounded p-3 hover:bg-white text-usa-white hover:bg-opacity-20 hover:text-usa-red items-center justify-between my-0.5"
        active-class="bg-white bg-opacity-10 font-bold text-usa-red"
        :to="link.to"
      >
        <div class="flex items-center gap-x-4">
          <span class="w-4 mx-auto text-center">
            <i :class="link.icon"></i>
          </span>
          <h2>{{ link.title }}</h2>
        </div>
        <button v-if="link.subLinks" @click="toggleSubLink(link.title)">
          <span v-show="showSubLinks.includes(link.title)"><i class="fas fa-chevron-down"></i></span>
          <span v-show="!showSubLinks.includes(link.title)"><i class="fas fa-chevron-up"></i></span>
        </button>
      </router-link>
      <div v-else>
        <button
          v-if="link.subLinks"
          class="flex rounded p-3 hover:bg-white text-usa-white hover:bg-opacity-20 hover:text-usa-red items-center justify-between my-0.5 w-full"
          active-class="bg-white bg-opacity-10 font-bold text-usa-red"
          @click="toggleSubLink(link.title)"
        >
          <div class="flex items-center gap-x-4">
            <span class="w-4 mx-auto text-center">
              <i :class="link.icon"></i>
            </span>
            <h2>{{ link.title }}</h2>
          </div>
          <span v-show="showSubLinks.includes(link.title)"><i class="fas fa-chevron-down"></i></span>
          <span v-show="!showSubLinks.includes(link.title)"><i class="fas fa-chevron-up"></i></span>
        </button>
      </div>
      <div v-if="showSubLinks.includes(link.title)">
        <div
          v-for="(subLink, index) in link.subLinks"
          :key="index"
          class="pl-8 flex rounded p-2 hover:bg-white hover:bg-opacity-20 hover:text-usa-red items-center justify-between text-usa-white"
        >
          <div class="flex items-center gap-x-4">
            <span class="w-4 mx-auto text-center">
              <i :class="subLink.icon"></i>
            </span>
            <h2>{{ subLink.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import SidebarLinks from "@/data/sidebar";

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
