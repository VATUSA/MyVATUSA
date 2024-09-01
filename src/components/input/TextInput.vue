<template>
  <div class="flex flex-col relative" :class="cols">
    <p
      class="font-bold text-gray-600 text-sm"
      :class="{
        'text-usa-blue': isFocused,
      }"
    >
      {{ props.title }}
    </p>
    <div class="flex">
      <input
        :id="id"
        v-model="field"
        style="outline: 0"
        class="my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all bg-transparent focus:w-3/4 w-full transition-width duration-300 ease-in-out"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @focus="isFocused = true"
        @blur="handleBlur"
      />
      <div
        v-show="isFocused"
        class="transform flex transition-opacity duration-300 ease-in-out my-auto mx-auto gap-x-2"
      >
        <FadeIn v-if="isFocused" :delay="0.05">
          <a
            class="text-red-500 border-2 px-2.5 py-1.5 border-dashed border-red-500 rounded hover:text-white hover:bg-red-500 transition cursor-pointer"
            @mousedown.prevent
            @click="cancel"
          >
            <i class="fa-solid fa-fw fa-x"></i>
          </a>
        </FadeIn>
        <FadeIn v-if="isFocused">
          <a
            class="text-green-500 border-2 px-2.5 py-1.5 border-dashed border-green-500 rounded hover:text-white hover:bg-green-500 transition cursor-pointer"
            @mousedown.prevent
            @click="save"
          >
            <i class="fa-solid fa-fw fa-check"></i>
          </a>
        </FadeIn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import FadeIn from "@/components/animations/FadeIn.vue";

const props = defineProps<{
  title: string | "";
  placeholder: string | "";
  initialValue: string | "";
  disabled?: boolean | false;
  cols?: string | "col-span-1";
}>();

const emit = defineEmits<{
  newValue: [value: string];
}>();

const id = ref<string>((Math.random() + 1).toString(36).substring(7));
const isFocused = ref<Boolean>(false);

const field = ref<string>(props.initialValue);

function handleBlur(event): void {
  const relatedTarget = event.relatedTarget;
  if (relatedTarget && relatedTarget.closest(".flex")) {
    return;
  }
  isFocused.value = false;
}

const cancel = (): void => {
  document.getElementById(id.value).blur();
  field.value = props.initialValue;
  isFocused.value = false;
};

const save = (): void => {
  document.getElementById(id.value).blur();
  if (field.value === props.initialValue) {
    isFocused.value = false;
    return;
  }

  isFocused.value = false;

  emit("newValue", field.value);
};

// Watch prop intialValue
watch(
  () => props.initialValue,
  (newValue) => {
    field.value = newValue;
  }
);
</script>

<style scoped></style>
