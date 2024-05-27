<template>
  <FadeOut>
    <div v-if="!userStore.isLoggedIn" key="element1" class="flex items-center justify-center h-screen bg-usa-blue">
      <Loader />
    </div>
    <div v-else key="element2" class="flex">
      <Sidebar class="hidden lg:block" />
      <div class="w-full h-screen bg-gray-100">
        <Header />
        <router-view />
      </div>
    </div>
  </FadeOut>
</template>

<script setup lang="ts">
import apiUrl from "@/utils/api";
import useUserStore from "@/stores/user";
import { onMounted } from "vue";

// Components
import FadeOut from "@/components/animations/FadeOut.vue";
import Header from "@/views/partials/Header.vue";
import Loader from "@/components/animations/Loader.vue";
import Sidebar from "@/views/partials/Sidebar.vue";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser();
  if (!userStore.isLoggedIn) {
    window.location.href = `${apiUrl}/v3/user/login?redirect=${window.location.href}`;
  }
});
</script>

<style scoped></style>
