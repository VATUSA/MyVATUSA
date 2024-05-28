<template>
  <div class="border-b">
    <h3 class="font-bold">Discord</h3>
  </div>
  <div class="m-5">
    <div v-if="!!editableUser" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      <div class="col-span-1 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Discord ID</p>
        <input
          v-model="editableUser.discord_id"
          class="my-1 py-1 border-b hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
          placeholder="123"
          disabled
        />
        <p v-if="editableUser.discord_id !== ''" class="text-xs text-green-500">Linked!</p>
      </div>
      <div class="col-span-2 flex flex-col">
        <p class="font-bold text-gray-600 text-sm">Actions</p>
        <div class="flex gap-x-4 m-2">
          <Secondary v-if="editableUser.discord_id === ''" text="Link" icon="link" color="green" />
          <Secondary v-else text="Unlink" icon="unlink" color="red" />
          <Secondary text="Sync" icon="sync" color="blue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { User } from "@/types";
import Secondary from "@/components/buttons/Secondary.vue";

const props = defineProps<{
  user: User | null;
}>();

const editableUser = ref<User | null>(props.user);
</script>

<style scoped></style>
