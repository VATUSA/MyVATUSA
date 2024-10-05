<template>
  <div v-if="!settings" class="flex">
    <Spinner />
    <p class="my-auto">Loading...</p>
  </div>
  <div v-else class="flex md:flex-row flex-col divide-x divide-usa-grey">
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-usa-gray text-2xl">Enabled Notification Platforms</h2>
      <div class="flex flex-col divide-y divide-usa-grey">
        <div class="space-y-4 p-4">
          <div class="flex items center">
            <i class="h-full w-12 my-auto fa-solid fa-envelope text-usa-grey"></i>
            <div class="ml-4">
              <h3 class="text-usa-gray text-lg font-semibold">
                Email <span v-if="settings.email" class="text-green-400">(Enabled)</span>
              </h3>
              <p class="text-usa-gray">Email notifications are sent to your registered VATSIM email address.</p>
            </div>
            <div class="ml-4 my-auto py-2">
              <Primary v-if="!settings.email" text="Enable" color="green" @click="setEmail(true)" />
              <Primary v-else text="Disable" color="red" @click="setEmail(false)" />
            </div>
          </div>
          <div class="flex items center">
            <i class="h-full w-12 my-auto fa-brands fa-discord text-[#5865F2]"></i>
            <div class="ml-4">
              <h3 class="text-usa-gray text-lg font-semibold">
                Discord <span v-if="settings.discord" class="text-green-400">(Enabled)</span>
              </h3>
              <p class="text-usa-gray">
                Discord Notifications are sent to your registered Discord account via direct message.
              </p>
            </div>
            <div class="ml-4 my-auto py-2">
              <Primary v-if="!settings.discord" text="Enable" color="green" @click="setDiscord(true)" />
              <Primary v-else text="Disable" color="red" @click="setDiscord(false)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 p-4">
      <h2 class="text-usa-gray text-2xl">Notification Types</h2>
      <div class="flex flex-col divide-y divide-usa-grey">
        <div class="space-y-4 p-4">
          <div class="flex items center">
            <i class="h-full w-12 my-auto fa-solid fa-chalkboard-user text-usa-grey"></i>
            <div class="ml-4">
              <h3 class="text-usa-gray text-lg font-semibold">
                Training <span v-if="settings.training" class="text-green-400">(Enabled)</span>
              </h3>
              <p class="text-usa-gray">
                Training notifications are sent when a training session is scheduled or updated, or a training notes has
                been entered.
              </p>
            </div>
            <div class="ml-4 my-auto py-2">
              <Primary v-if="!settings.training" text="Enable" color="green" @click="setTraining(true)" />
              <Primary v-else text="Disable" color="red" @click="setTraining(false)" />
            </div>
          </div>
          <div class="flex items center">
            <i class="h-full w-12 my-auto fa-solid fa-calendar-days"></i>
            <div class="ml-4">
              <h3 class="text-usa-gray text-lg font-semibold">
                Events <span v-if="settings.events" class="text-green-400">(Enabled)</span>
              </h3>
              <p class="text-usa-gray">Event Notifications keep you up to date with the latest events in VATUSA.</p>
            </div>
            <div class="ml-4 my-auto py-2">
              <Primary v-if="!settings.events" text="Enable" color="green" @click="setEvents(true)" />
              <Primary v-else text="Disable" color="red" @click="setEvents(false)" />
            </div>
          </div>
          <div class="flex items center">
            <i class="h-full w-12 my-auto fa-solid fa-comment"></i>
            <div class="ml-4">
              <h3 class="text-usa-gray text-lg font-semibold">
                Feedback <span v-if="settings.feedback" class="text-green-400">(Enabled)</span>
              </h3>
              <p class="text-usa-gray">
                Feedback notifications will alert you when a new feedback item is submitted to you.
              </p>
            </div>
            <div class="ml-4 my-auto py-2">
              <Primary v-if="!settings.feedback" text="Enable" color="green" @click="setFeedback(true)" />
              <Primary v-else text="Disable" color="red" @click="setFeedback(false)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { NotificationSettings } from "@/types";
import useUserStore from "@/stores/user";

import Primary from "@/components/buttons/Primary.vue";
import Spinner from "@/components/animations/Spinner.vue";

const userStore = useUserStore();
const settings = ref<NotificationSettings | null>();

onMounted(async () => {
  settings.value = await userStore.fetchNotificationSettings(userStore.self.cid);
});

function updateSettings(): null {
  userStore.updateNotificationSettings(userStore.self.cid, settings.value);
}

function setDiscord(state: boolean): void {
  settings.value.discord = state;
  updateSettings();
}

function setTraining(state: boolean): void {
  settings.value.training = state;
  updateSettings();
}

function setEvents(state: boolean): void {
  settings.value.events = state;
  updateSettings();
}

function setFeedback(state: boolean): void {
  settings.value.feedback = state;
  updateSettings();
}

function setEmail(state: boolean): void {
  settings.value.email = state;
  updateSettings();
}
</script>

<style scoped></style>
