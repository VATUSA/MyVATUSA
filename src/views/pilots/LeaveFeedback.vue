<template>
  <Page title="Leave Feedback">
    <Card>
      <div class="px-14 py-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-10">
        <div class="col-span-1 flex flex-col">
          <input
            v-model="facility"
            class="order-2 my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="Search Facility"
            required
            @focus="facilityDropdown = true"
            @blur="closeFacilityDropdown"
          />
          <ul
            v-if="facilityDropdown && facilityStore.facilities.length"
            class="absolute bg-white border border-gray-300 mt-14 z-10 max-h-40 overflow-y-auto"
          >
            <li
              v-for="option in facilityList"
              :key="option.id"
              class="cursor-pointer hover:bg-gray-100 px-2 py-1"
              @mousedown.prevent="selectFacility(option)"
            >
              {{ option.name }}
            </li>
            <li v-if="facilityList.length === 0" class="px-2 py-1">No Facilities Found</li>
          </ul>
          <p
            class="order-1 font-bold -600 text-sm peer-focus:text-usa-blue transition-all duration-300"
            :class="isValidFacility ? 'text-gray-600' : 'text-usa-red'"
          >
            Facility
          </p>
        </div>

        <div class="col-span-1 flex flex-col">
          <input
            v-model="feedback.callsign"
            class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="N978AP"
            required
          />
          <p class="order-1 font-bold text-gray-600 text-sm peer-focus:text-usa-blue transition-all duration-300">
            Callsign
          </p>
        </div>

        <div class="col-span-1 flex flex-col relative">
          <input
            v-model="feedback.controller_cid"
            class="order-2 my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="Search Controller"
            required
            @focus="controllerDropdown = true"
            @blur="closeControllerDropdown"
          />
          <ul
            v-if="controllerDropdown && controllerList.length > 0"
            class="absolute bg-white border border-gray-300 mt-14 z-10 max-h-40 overflow-y-auto w-full"
          >
            <li
              v-for="controller in controllerList"
              :key="controller.id"
              class="cursor-pointer hover:bg-gray-100 px-2 py-1"
              @mousedown.prevent="selectController(controller.cid)"
            >
              {{ controller.first_name }} {{ controller.last_name }}
            </li>
          </ul>
          <ul
            v-else-if="controllerDropdown"
            class="absolute bg-white border border-gray-300 mt-14 z-10 max-h-40 overflow-y-auto w-full"
          >
            <li v-if="isValidFacility" class="cursor-pointer hover:bg-gray-100 px-2 py-1 flex">
              <svg
                aria-hidden="true"
                class="w-4 h-4 text-gray-200 animate-spin fill-blue-600 my-auto mr-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Loading...
            </li>
            <li v-else class="cursor-pointer hover:bg-gray-100 px-2 py-1">Invalid facility.</li>
          </ul>
          <p
            class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
            :class="isValidController ? 'text-gray-600' : 'text-usa-red'"
          >
            Controller
          </p>
        </div>

        <div class="col-span-1 flex flex-col">
          <input
            v-model="feedback.position"
            class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="DEN_APP"
            required
          />
          <p class="order-1 font-bold text-gray-600 text-sm peer-focus:text-usa-blue transition-all duration-300">
            Position
          </p>
        </div>
        <div class="col-span-1 flex flex-col relative">
          <input
            v-model="feedback.rating"
            class="order-2 my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="Feedback Rating"
            required
            @focus="ratingDropdown = true"
            @blur="closeRatingDropdown"
          />
          <ul
            v-if="ratingDropdown"
            class="absolute bg-white border border-gray-300 mt-14 z-10 max-h-40 overflow-y-auto w-full"
          >
            <li
              v-for="(rating, idx) in RatingList"
              :key="idx"
              class="cursor-pointer hover:bg-gray-100 px-2 py-1"
              @mousedown.prevent="selectRating(rating)"
            >
              {{ rating }}
            </li>
          </ul>
          <p
            class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
            :class="isValidRating ? 'text-gray-600' : 'text-usa-red'"
          >
            Rating
          </p>
        </div>

        <div class="col-span-3 flex flex-col">
          <textarea
            v-model="feedback.feedback"
            class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
            style="outline: 0"
            placeholder="The best controlling service into Denver!"
            required
          />
          <p class="order-1 font-bold text-gray-600 text-sm peer-focus:text-usa-blue transition-all duration-300">
            Feedback
          </p>
        </div>

        <div class="my-auto mx-auto flex flex-col">
          <Primary class="max-h-12 max-w-24 my-auto mx-auto" text="Submit" color="usa-red" @click="submitFeedback" />
          <p v-if="errorMsg != ''" class="text-usa-red">{{ errorMsg }}</p>
        </div>
      </div>
    </Card>
  </Page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { Facility, FeedbackRequest, Roster } from "@/types";

import useFeedbackStore from "@/stores/feedback";
import useUserStore from "@/stores/user";
import useFacilityStore from "@/stores/facility";

// Components
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";
import Primary from "@/components/buttons/Primary.vue";

const feedbackStore = useFeedbackStore();
const userStore = useUserStore();
const facilityStore = useFacilityStore();

const feedback = ref<FeedbackRequest>({
  callsign: "",
  controller_cid: 0,
  feedback: "",
  position: "",
  rating: "",
  pilot_cid: userStore.self.cid,
  comment: "",
  status: "pending",
});

const errorMsg = ref<string>("");

// Facility List
const facility = ref<string>("");
const facilityList = computed(() => {
  return facilityStore.facilities.filter(
    (f) =>
      f.name.toLowerCase().includes(facility.value.toLowerCase()) ||
      f.id.toLowerCase().includes(facility.value.toLowerCase())
  );
});
const facilityDropdown = ref<boolean>(false);

const selectFacility = (option: Facility): void => {
  facility.value = option.id;
  facilityDropdown.value = false;
};

const isValidFacility = computed(() => {
  return facilityList.value.filter((f) => f.id === facility.value).length > 0;
});

const closeFacilityDropdown = (): void => {
  setTimeout(() => {
    facilityDropdown.value = false;
  }, 100);
};

// Controller List
const controllerDropdown = ref<boolean>(false);
const controllerList = ref<Roster[]>([]);

watchEffect(() => {
  if (!isValidFacility.value) {
    controllerList.value = [];
    return;
  }

  facilityStore
    .fetchRoster(facility.value)
    .then((data) => {
      controllerList.value = data;
    })
    .catch((error) => {
      console.error("Error fetching roster:", error);
      controllerList.value = [];
    });
});

const selectController = (cid: number): void => {
  feedback.value.controller_cid = cid;
  controllerDropdown.value = false;
};

const closeControllerDropdown = (): void => {
  setTimeout(() => {
    controllerDropdown.value = false;
  }, 100);
};

const isValidController = computed(() => {
  return controllerList.value.filter((c) => c.cid === feedback.value.controller_cid).length > 0;
});

// Rating List
const ratingDropdown = ref<boolean>(false);
const closeRatingDropdown = (): void => {
  setTimeout(() => {
    ratingDropdown.value = false;
  }, 100);
};

const RatingList = ["excellent", "good", "average", "poor", "fair"];

const selectRating = (rating: string): void => {
  feedback.value.rating = rating.toLowerCase();
  ratingDropdown.value = false;
};

const isValidRating = computed(() => {
  return RatingList.includes(feedback.value.rating);
});

const submitFeedback = (): void => {
  if (!isValidRating.value) {
    errorMsg.value = "Please select a valid rating.";
    return;
  }
  if (!isValidFacility.value) {
    errorMsg.value = "Please select a valid facility.";
    return;
  }
  if (!isValidController.value) {
    errorMsg.value = "Please select a valid controller.";
    return;
  }
  if (feedback.value.feedback === "") {
    errorMsg.value = "Please provide feedback.";
    return;
  }
  if (feedback.value.callsign === "") {
    errorMsg.value = "Please provide a callsign.";
    return;
  }
  if (feedback.value.position === "") {
    errorMsg.value = "Please provide a position.";
    return;
  }

  feedbackStore.submitFeedback(facility.value, feedback.value);
};

onMounted(() => {
  facilityStore.fetchFacilities();
});
</script>

<style scoped></style>
