<template>
  <div class="w-full xl:px-12 px-6 py-6 my-auto text-xs text-gray-500 bg-transparent space-y-1">
    <div class="flex gap-x-4 font-bold text-sm">
      <a class="cursor-pointer" @click="viewPrivacyPolicy = true">Privacy Policy</a>
      <a href="https://github.com/VATUSA" target="_blank">Github</a>
      <a href="https://donorbox.org/donate-to-vatusa" target="_blank">Donate</a>
    </div>
    <p>
      Any and all content on this website are for use with the Virtual Air Traffic Simulation Network (VATSIM) and may
      not be used for real-world navigation or aviation purposes and doing so could be a violation of federal law.
    </p>
    <p>All times on the website unless otherwise noted with "Z" are in your local time.</p>
    <p>© 2016-{{ new Date().getFullYear() }} VATUSA Inc. | 501(c)(3) Nonprofit Organization | All Rights Reserved.</p>
  </div>

  <Modal title="Privacy Policy" :visible="viewPrivacyPolicy" @close="viewPrivacyPolicy = false">
    <div class="h-[70vh] overflow-y-auto">
      <PrivacyPolicy />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/Modal.vue";
import PrivacyPolicy from "@/views/modals/PrivacyPolicy.vue";
import { ref } from "vue";

const viewPrivacyPolicy = ref<boolean>(false);
</script>
