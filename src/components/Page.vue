<template>
  <div class="p-12">
    <h1 class="text-usa-blue text-3xl font-bold">{{ props.title }}</h1>
    <div class="flex divide-x divide-gray-300 mt-10">
      <div class="w-full space-y-6">
        <slot>
          <div class="m-5">
            <p>Failed to render page. If you are viewing this page please open a ticket.</p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
});
</script>

<style scoped></style>
