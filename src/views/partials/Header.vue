<template>
  <div class="w-full border-b border-gray-300 px-10 py-2.5 text-right my-auto space-x-8 text-gray-500 text-xl">
    <i class="fa-regular fa-bell hover:text-usa-blue"></i>
    <i class="fa-solid fa-gear hover:text-usa-blue"></i>

    <div class="relative inline-block text-left">
      <button type="button" @click="toggleDropdown">
        <i class="fa-regular fa-user hover:text-usa-blue"></i>
      </button>

      <div
        v-if="isDropdownOpen"
        class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-64 right-0 top-full mt-2.5"
      >
        <ul class="py-2 text-sm text-gray-700 flex flex-col">
          <li class="py-2 px-4">
            <div class="flex my-auto justify-between">
              <div>
                <h2 class="text-usa-blue text-xl font-bold -mb-1">Raaj Patel</h2>
                <p>r.patel@vatusa.net</p>
              </div>
              <div class="my-auto">
                <p class="text-usa-blue text-4xl font-bold">C3</p>
              </div>
            </div>
          </li>
          <router-link
            to="Profile"
            class="font-bold text-md py-2.5 px-4 hover:bg-gray-100 text-gray-600"
            active-class="text-usa-red"
          >
            Profile
          </router-link>
          <li class="border-t border-gray-200 mt-2 pt-2"></li>
          <a class="cursor-pointer">
            <p class="font-bold text-md py-2.5 px-4 hover:bg-gray-100 text-gray-600">Help Center</p>
          </a>
          <a class="cursor-pointer">
            <p class="font-bold text-md py-2.5 px-4 hover:bg-gray-100 text-gray-600">Sign Out</p>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const isDropdownOpen = ref<boolean>(false);

const toggleDropdown = (): void => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>
