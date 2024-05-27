<template>
  <div class="flex">
    <Sidebar class="hidden lg:block" />
    <div class="w-full h-screen bg-gray-100">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import apiUrl from "@/utils/api";
import Header from "@/views/partials/Header.vue";
import Sidebar from "@/views/partials/Sidebar.vue";
import useUserStore from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUser();
  if (!userStore.isLoggedIn) {
    window.location.href = `${apiUrl}/v3/user/login?redirect=${window.location.href}`;
  }
});
</script>

<style scoped></style>
