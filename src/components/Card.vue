<template>
  <div class="rounded-xl drop-shadow-sm py-4" :class="props.transparent ? 'bg-transparent' : 'bg-white'">
    <slot>
      <div class="m-5">
        <p>Failed to render card. If you are viewing this page please open a ticket.</p>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  transparent?: boolean;
}>();
</script>

<style scoped></style>
