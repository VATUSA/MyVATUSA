<template>
  <div v-if="props.visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-10 rounded shadow-lg relative" :class="size === undefined ? 'w-4/5 lg:w-1/2' : size">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl text-usa-blue font-bold">{{ props.title }}</h2>
        <span @click="close">
          <i class="fa-solid fa-x fa-fw text-gray-400 cursor-pointer hover:text-usa-blue"></i>
        </span>
      </div>
      <h3 v-if="props.subtitle" class="text-sm text-gray-500 mb-4 -mt-4">{{ props.subtitle }}</h3>
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  title: string;
  subtitle?: string;
  size?: string;
}>();
const emit = defineEmits<{
  close: [];
}>();

const close = (): void => {
  emit("close");
};
</script>

<style scoped></style>
