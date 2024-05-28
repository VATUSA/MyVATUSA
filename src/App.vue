<template>
  <FadeOut>
    <div v-if="!userStore.isLoggedIn" key="element1" class="flex items-center justify-center h-screen bg-usa-blue">
      <Loader />
    </div>
    <div v-else key="element2" class="flex">
      <Sidebar class="hidden lg:block" />
      <div class="flex flex-col w-full min-h-screen bg-gray-100">
        <Header />
        <router-view class="flex-grow" />
        <Footer />
      </div>
    </div>
  </FadeOut>
</template>

<script setup lang="ts">
import useUserStore from "@/stores/user";

// Components
import FadeOut from "@/components/animations/FadeOut.vue";
import Header from "@/views/partials/Header.vue";
import Loader from "@/components/animations/Loader.vue";
import Sidebar from "@/views/partials/Sidebar.vue";
import Footer from "@/views/partials/Footer.vue";

const userStore = useUserStore();
</script>

<style scoped></style>
