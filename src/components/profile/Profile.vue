<template>
  <div class="border-b">
    <h3 class="font-bold">Personal Details</h3>
  </div>
  <div class="m-5">
    <div v-if="!!editableUser" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
      <TextInput title="First Name" placeholder="John" :initial-value="editableUser.first_name" disabled />
      <TextInput title="Last Name" placeholder="Doe" :initial-value="editableUser.last_name" disabled />
      <TextInput
        title="Email"
        placeholder="John@johnrocks.com"
        :initial-value="editableUser.email"
        cols="col-span-1 md:col-span-2"
        disabled
      />
      <TextInput
        title="Preferred Name"
        placeholder="Johnny"
        :initial-value="editableUser.preferred_name"
        @new-value="(value) => handleNewValue('preferred_name', value)"
      />
      <TextInput
        title="Preferred OIs"
        placeholder="JD"
        :initial-value="editableUser.preferred_ois"
        @new-value="(value) => handleNewValue('preferred_ois', value)"
      />
      <TextInput title="Pilot Rating" placeholder="PPL" :initial-value="editableUser.pilot_rating_string" disabled />
      <TextInput
        title="Controller Rating"
        placeholder="OBS"
        :initial-value="editableUser.controller_rating_string"
        disabled
      />
    </div>
  </div>
  <div class="mt-20 border-b">
    <h3 class="font-bold">Facility Details</h3>
  </div>
  <div v-if="!!user?.rosters" class="m-5">
    <div class="grid grid-cols-4 gap-x-5 border-b font-semibold">
      <div class="col-span-1 flex">Facility</div>
      <div class="col-span-1 flex">Type</div>
      <div class="col-span-1 flex">Join Date</div>
      <div class="col-span-1 flex">Exit Date</div>
    </div>
    <div
      v-for="(roster, idx) in user.rosters"
      :key="idx"
      class="grid grid-cols-4 gap-x-5 gap-y-10"
      :class="idx % 2 == 0 ? 'bg-usa-white' : 'bg-white'"
    >
      <div class="col-span-1 flex flex-col">
        {{ roster.facility }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ roster.home ? "Home" : "Visiting" }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ new Date(roster.created_at).toLocaleDateString() }}
      </div>
      <div class="col-span-1 flex flex-col">
        {{ roster.deleted_at ? new Date(roster.deleted_at).toLocaleDateString() : "N/A" }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { User } from "@/types";
import TextInput from "@/components/input/TextInput.vue";

const props = defineProps<{
  user: User | null;
}>();

const editableUser = ref<User | null>(props.user);

function handleNewValue(field: string, value: string): void {
  console.log(field, value);
}
</script>

<style scoped></style>
