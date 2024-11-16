<template>
  <Page title="Management"> </Page>
</template>

<script setup lang="ts">
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";

import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const facilityId = computed(() => route.params.facility_id as string);
</script>

<style scoped></style>
