<template>
  <div
    class="absolute top-6 z-10 w-44 text-center bg-white rounded divide-y divide-gray-600 shadow dark:bg-black-deep dark:divide-gray-400 border border-usa-red"
  >
    <!--    :class="{ hidden: selected !== position.position + idx }"-->
    <div class="py-1.5 text-sm text-gray-900 dark:text-white">
      <p class="pb-1">Shift {{ props.shift }}</p>
      <p v-if="props.position.assignee != 0 && props.shift == 1" class="font-medium">
        <span class="py-1">{{ position.assignee_name }}</span>
        <a
          v-if="props.canEditEvent"
          class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
        >
          <i class="fas fa-xmark mr-2"></i>Unassign
        </a>
      </p>
      <p v-else-if="props.shift == 1" class="font-medium truncate">Vacant</p>
      <p v-if="props.position.secondary_assignee != 0 && props.shift == 2" class="font-medium">
        <span class="py-1">{{ props.position.secondary_assignee_name }}</span>
        <a
          v-if="canEditEvent"
          class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
        >
          <i class="fas fa-xmark mr-2"></i>Unassign
        </a>
      </p>
      <p v-else-if="props.shift == 2" class="font-medium truncate">Vacant</p>
    </div>
    <div v-if="isSignedup" class="py-1">
      <a
        class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
        @click="cancelSignup"
      >
        <i class="fas fa-xmark"></i> {{ cancelSignupButtonText }}
      </a>
    </div>
    <div v-else-if="!isSignedup && !isAssigned" class="py-1">
      <a
        class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
        @click="signup"
      >
        <i class="fas fa-check"></i> {{ signupButtonText }}
      </a>
    </div>
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
      <li v-for="signup in props.position.signups" :key="signup.id">
        <a
          v-if="canEditEvent"
          class="block cursor-pointer py-2 px-4 hover:bg-gray-200 dark:hover:bg-black-light dark:hover:text-white"
          @click="assignPosition(signup.cid)"
        >
          {{ signup.name }}
        </a>
        <p v-else class="block py-2 px-4">{{ signup.name }}</p>
      </li>
      <li v-if="props.position.signups.length === 0">
        <p class="block py-2 px-4">No Signups</p>
      </li>
    </ul>
    <div v-if="canEditEvent" class="py-1">
      <a
        class="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-black-light dark:text-gray-200 dark:hover:text-white"
        @click="emit('assign', props.position)"
      >
        <i class="fas fa-plus"></i> Manually Assign
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EventPosition } from "@/types";
import useEventStore from "@/stores/event";
import { ref } from "vue";

const emit = defineEmits<{
  updatePositions: [];
  assign: [position: EventPosition];
}>();

const eventStore = useEventStore();
const props = defineProps<{
  canEditEvent: boolean;
  shift: number;
  isSignedup: boolean;
  isAssigned: boolean;
  position: EventPosition;
}>();

const signupButtonText = ref<string>("Signup");
const signup = async (): Promise<void> => {
  signupButtonText.value = "Processing...";
  const success = await eventStore.createEventSignup(
    props.position.facility,
    props.position.event_id,
    props.position.id,
    props.shift
  );

  if (success) {
    emit("updatePositions");
  }

  if (!success) {
    // set signupbuttontext to failed for 3 seconds then change back.
    signupButtonText.value = "Failed";
    setTimeout(() => {
      signupButtonText.value = "Signup";
    }, 3000);
  }
};

const cancelSignupButtonText = ref<string>("Cancel Signup");
const cancelSignup = async (): Promise<void> => {
  cancelSignupButtonText.value = "Processing...";

  const signupId = props.position.signups.find((su) => su.cid === props.position.assignee)?.id;
  if (signupId === undefined) {
    cancelSignupButtonText.value = "Failed";
    setTimeout(() => {
      cancelSignupButtonText.value = "Cancel Signup";
    }, 3000);
    return;
  }
  const success = await eventStore.deleteEventSignup(props.position.facility, props.position.event_id, signupId);

  if (success) {
    emit("updatePositions");
  }

  if (!success) {
    // set signupbuttontext to failed for 3 seconds then change back.
    cancelSignupButtonText.value = "Failed";
    setTimeout(() => {
      cancelSignupButtonText.value = "Cancel Signup";
    }, 3000);
  }
};

const assignPosition = async (cid: number): Promise<void> => {
  const success = await eventStore.assignEventPosition(
    props.position.facility,
    props.position.event_id,
    props.position.id,
    cid,
    props.shift
  );

  if (success) {
    emit("updatePositions");
  }
};
</script>

<style scoped></style>
