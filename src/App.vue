<template>
  <div class="flex">
    <Sidebar />
    <div class="w-full h-screen bg-gray-100">
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/views/partials/Header.vue";
import Sidebar from "@/views/partials/Sidebar.vue";
</script>

<style scoped></style>
