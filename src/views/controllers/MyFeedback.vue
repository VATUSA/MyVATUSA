<template>
  <Page title="My Feedback">
    <div class="mx-0 md:mx-10">
      <div class="flex text-4xl text-usa-blue">
        <div v-for="i in feedbackRating" :key="i">
          <i class="fa-solid fa-star"></i>
        </div>
        <div v-for="i in 5 - feedbackRating" :key="i">
          <i class="fa-regular fa-star"></i>
        </div>
      </div>
      <h3 class="m-1">Average Feedback Rating</h3>
    </div>
    <Card class="-mx-12 md:mx-0">
      <div v-if="!feedbackStore.hasFetched" class="m-5">
        <Spinner />
      </div>
      <div v-else class="mt-8 md:px-14">
        <div class="flex justify-between mb-6 mx-4">
          <div class="flex flex-col">
            <p class="font-bold text-gray-600 text-sm">Search</p>
            <input
              v-model="search"
              class="my-1 py-1 border-b focus:border-b-usa-blue hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
              placeholder="Search"
            />
          </div>
          <div class="flex gap-x-2 font-semibold text-usa-blue text-lg my-auto">
            <i class="my-auto fa-solid fa-filter"></i>
            <p>Filter</p>
          </div>
        </div>

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">Date</th>
                <th scope="col" class="px-6 py-3">Rating</th>
                <th scope="col" class="px-6 py-3">Comment</th>
                <th scope="col" class="px-6 py-3">Facility/Position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(feedback, idx) in filteredFeedback" :key="idx" class="bg-white border-b">
                <td class="px-6 py-4">
                  {{ new Date(feedback.created_at).toLocaleDateString() }}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ feedback.rating }}
                </th>
                <td class="px-6 py-4">
                  {{ feedback.comment }}
                </td>
                <td class="px-6 py-4">{{ feedback.facility }} / {{ feedback.position }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  </Page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import useFeedbackStore from "@/stores/feedback";

// Components
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";
import Spinner from "@/components/animations/Spinner.vue";

const feedbackStore = useFeedbackStore();

const search = ref<string>("");

const filteredFeedback = computed(() => {
  return feedbackStore.myFeedback.filter((feedback) => {
    return (
      feedback.comment.toLowerCase().includes(search.value.toLowerCase()) ||
      feedback.facility.toLowerCase().includes(search.value.toLowerCase()) ||
      feedback.position.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

function RatingToInteger(rating: string): number {
  switch (rating) {
    case "excellent":
      return 5;
    case "good":
      return 4;
    case "fair":
      return 3;
    case "poor":
      return 2;
    case "unsatisfactory":
      return 1;
    default:
      return 0;
  }
}

const feedbackRating = computed(() => {
  const totalFeedback = feedbackStore.myFeedback.length;
  if (totalFeedback === 0) return 0;

  const totalRating = feedbackStore.myFeedback.reduce((acc, feedback) => acc + RatingToInteger(feedback.rating), 0);
  const averageRating = totalRating / totalFeedback;

  return Math.floor(averageRating);
});

onMounted(() => {
  if (!feedbackStore.hasFetched) {
    feedbackStore.fetchFeedback(1293257);
  }
});
</script>

<style scoped></style>
