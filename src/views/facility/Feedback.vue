<template>
  <div>
    <Page title="Feedback">
      <Card v-if="!fetchingFeedback && pendingFeedback.length > 0" class="-mx-12 md:mx-0">
        <div class="mt-8 md:px-14">
          <div class="flex justify-between mb-6 mx-4">
            <div class="flex flex-col">
              <p class="font-bold text-gray-600 text-lg">Pending Feedback</p>
            </div>
          </div>

          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3">CID</th>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Rating</th>
                  <th scope="col" class="px-6 py-3">Feedback</th>
                  <th scope="col" class="px-6 py-3">Position</th>
                  <th scope="col" class="px-6 py-3">Date</th>
                  <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(feedback, idx) in pendingFeedback" :key="idx" class="bg-white border-b">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ feedback.controller_cid }}
                  </th>
                  <td class="px-6 py-4">{{ feedback.controller_first_name }} {{ feedback.controller_last_name }}</td>
                  <td class="px-6 py-4">
                    {{ feedback.rating }}
                  </td>
                  <td class="px-6 py-4">
                    {{ feedback.feedback }}
                  </td>
                  <td class="px-6 py-4">
                    {{ feedback.position }}
                  </td>
                  <td class="px-6 py-4">
                    {{ new Date(feedback.created_at).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-1 space-x-4">
                    <button
                      class="bg-emerald-500 text-white w-8 h-8 rounded hover:bg-opacity-80"
                      @click="openAcceptFeedback(feedback.id)"
                    >
                      <i class="fas fa-fw fa-check"></i>
                    </button>
                    <button
                      class="bg-red-500 text-white w-8 h-8 rounded hover:bg-opacity-80"
                      @click="openDenyFeedback(feedback.id)"
                    >
                      <i class="fas fa-fw fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <h3 v-if="pendingFeedback.length === 0" class="text-center text-xl font-semibold m-5">No Feedback Found</h3>
          </div>
        </div>
      </Card>

      <Card class="-mx-12 md:mx-0">
        <div v-if="fetchingFeedback" class="m-5">
          <Spinner />
        </div>
        <div v-else class="mt-8 md:px-14">
          <div class="flex justify-between mb-6 mx-4">
            <div class="flex flex-col">
              <p class="font-bold text-gray-600 text-sm">Search</p>
              <input
                v-model="search"
                style="outline: 0"
                class="my-1 py-1 border-b focus:border-b-usa-blue hover:border-b-usa-blue outline-0 focus:border-transparent focus:ring-0 bg-transparent"
                placeholder="Search"
              />
            </div>
          </div>

          <div class="grid grid-cols-12 text-xs text-gray-700 uppercase bg-gray-100 font-bold p-4">
            <div class="col-span-2">
              <h5>Controller</h5>
            </div>
            <div class="col-span-4">
              <h5>Feedback</h5>
            </div>
            <div class="col-span-2">
              <h5>Position</h5>
            </div>
            <div class="col-span-1">
              <h5>Date</h5>
            </div>
            <div class="col-span-1">
              <h5>Status</h5>
            </div>
            <div class="col-span-1">
              <h5>Rating</h5>
            </div>
            <div class="col-span-1 text-right">
              <h5>Details</h5>
            </div>
          </div>

          <div v-for="(feedback, idx) in filteredFeedback" :key="idx">
            <div class="grid grid-cols-12 text-gray-700 py-4 border-b-gray-200 border-b">
              <div class="col-span-2 my-auto ml-4">
                <h5 class="font-bold">{{ feedback.controller_first_name }} {{ feedback.controller_last_name }}</h5>
                <h5>{{ feedback.controller_cid }}</h5>
              </div>
              <div class="col-span-4 my-auto text-wrap">
                <h5>{{ feedback.feedback }}</h5>
              </div>
              <div class="col-span-2 my-auto">
                <h5>{{ feedback.position }}</h5>
              </div>
              <div class="col-span-1 my-auto">
                <h5>{{ new Date(feedback.created_at).toLocaleDateString() }}</h5>
              </div>
              <div class="col-span-1 my-auto flex">
                <h5
                  class="rounded px-1.5 py-1 text-sm"
                  :class="feedback.status === 'accepted' ? 'bg-green-200' : 'bg-red-200'"
                >
                  {{ feedback.status }}
                </h5>
              </div>
              <div class="col-span-1 my-auto">
                <h5>
                  {{ feedback.rating }}
                </h5>
              </div>
              <div class="col-span-1 text-right my-auto mr-4">
                <button
                  v-if="selectedFeedback !== idx"
                  class="rounded-full hover:bg-gray-200 transition duration-200 px-2"
                  @click="selectFeedback(idx)"
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button
                  v-else
                  class="rounded-full hover:bg-gray-200 transition duration-200 px-1"
                  @click="selectFeedback(-1)"
                >
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div v-if="selectedFeedback === idx" class="col-span-12 border-t px-4 border-t-gray-200 mt-4 py-4">
                <div class="grid grid-cols-2 2xl:grid-cols-4 text-gray-700 gap-5">
                  <div class="col-span-1 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Pilot Details</h5>
                    </div>
                    <div class="p-4 grid grid-cols-3 gap-y-5">
                      <div class="col-span-1 text-gray-600">CID</div>
                      <div class="col-span-2 font-semibold">{{ feedback.pilot_cid }}</div>
                      <div class="col-span-1 text-gray-600">Callsign</div>
                      <div class="col-span-2 font-semibold">{{ feedback.callsign }}</div>
                      <div class="col-span-1 text-gray-600">Name</div>
                      <div class="col-span-2 font-semibold">Coming soon...</div>
                      <div class="col-span-1 text-gray-600">Email</div>
                      <div class="col-span-2 font-semibold">Coming soon...</div>
                      <div class="col-span-1 text-gray-600">Hours</div>
                      <div class="col-span-2 font-semibold">Coming soon...</div>
                    </div>
                  </div>

                  <div class="col-span-1 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Controller Details</h5>
                    </div>
                    <div class="p-4 grid grid-cols-3 gap-y-5">
                      <div class="col-span-1 text-gray-600">CID</div>
                      <div class="col-span-2 font-semibold">{{ feedback.controller_cid }}</div>
                      <div class="col-span-1 text-gray-600">Position</div>
                      <div class="col-span-2 font-semibold">{{ feedback.position }}</div>
                      <div class="col-span-1 text-gray-600">Name</div>
                      <div class="col-span-2 font-semibold">
                        {{ feedback.controller_first_name }} {{ feedback.controller_last_name }}
                      </div>
                      <div class="col-span-1 text-gray-600">Rating</div>
                      <div class="col-span-2 font-semibold">Coming soon...</div>
                      <div class="col-span-1 text-gray-600">Hours</div>
                      <div class="col-span-2 font-semibold">Coming soon...</div>
                    </div>
                  </div>

                  <div class="col-span-2 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Feedback</h5>
                    </div>
                    <div class="p-4 grid grid-cols-5 gap-y-5">
                      <div class="col-span-1 text-gray-600">Feedback</div>
                      <div class="col-span-4 font-semibold text-wrap">{{ feedback.feedback }}</div>
                      <div class="col-span-1 text-gray-600">Comments</div>
                      <div class="col-span-4 font-semibold">{{ feedback.comment }}</div>
                      <div class="col-span-1 text-gray-600">Actions</div>
                      <div class="col-span-4 font-semibold">
                        <button
                          class="bg-usa-blue text-white text-sm px-2.5 py-1 rounded hover:opacity-75 transition duration-200"
                        >
                          Praise
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 v-if="filteredFeedback.length === 0" class="text-center text-xl font-semibold m-5">No Feedback Found</h3>
        </div>
      </Card>
    </Page>

    <Modal title="Accept Feedback" :visible="acceptFeedbackModal" @close="acceptFeedbackModal = false">
      <div class="space-y-3">
        <h5 class="font-semibold">Comments</h5>
        <textarea
          type="text"
          style="outline: 0"
          class="rounded ring-1 ring-gray-300 drop-shadow-sm px-4 py-2 w-full focus:ring-2 focus:ring-usa-blue"
          placeholder="Some comments for the controller to read."
        />
      </div>
      <div class="mt-5 space-x-5">
        <Primary text="Accept" color="green" />
        <Primary text="Cancel" color="gray" @click="acceptFeedbackModal = false" />
      </div>
    </Modal>
    <Modal title="Deny Feedback" :visible="denyFeedbackModal" @close="denyFeedbackModal = false">
      <div class="space-y-3">
        <h5 class="font-semibold">Comments</h5>
        <textarea
          type="text"
          style="outline: 0"
          class="rounded ring-1 ring-gray-300 drop-shadow-sm px-4 py-2 w-full focus:ring-2 focus:ring-usa-blue"
          placeholder="Some comments for the controller to read."
        />
        <p class="text-gray-500 italic">
          You're about to decline feedback. We encourage accepting all feedback, even negative comments, as they provide
          valuable insights to help the controller identify areas for improvement.
        </p>
      </div>
      <div class="mt-5 space-x-5">
        <Primary text="Reject" color="red" />
        <Primary text="Cancel" color="gray" @click="denyFeedbackModal = false" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { Feedback } from "@/types";
import Page from "@/components/Page.vue";
import Spinner from "@/components/animations/Spinner.vue";
import Card from "@/components/Card.vue";
import useFeedbackStore from "@/stores/feedback";
import Modal from "@/components/Modal.vue";
import Primary from "@/components/buttons/Primary.vue";

const route = useRoute();
const feedbackStore = useFeedbackStore();
const facilityId = computed(() => route.params.facility_id as string);

const fetchingFeedback = ref<boolean>(true);
const pastFeedback = ref<Feedback[]>([]);

const selectedFeedback = ref<number>(-1);

const selectFeedback = (index: number): void => {
  selectedFeedback.value = index;
};

const search = ref<string>("");
const filteredFeedback = computed(() => {
  return pastFeedback.value.filter((feedback) => {
    return (
      (feedback.controller_last_name.toLowerCase().includes(search.value.toLowerCase()) ||
        feedback.controller_first_name.toLowerCase().includes(search.value.toLowerCase()) ||
        feedback.controller_cid.toString().includes(search.value) ||
        feedback.rating.toLowerCase().includes(search.value.toLowerCase())) &&
      feedback.status !== "pending"
    );
  });
});

const pendingFeedback = computed(() => {
  return pastFeedback.value.filter((f) => f.status === "pending");
});

async function fetchFeedback(facId: string): Promise<void> {
  fetchingFeedback.value = true;
  pastFeedback.value = await feedbackStore.fetchFeedbackForFacility(facId);
  fetchingFeedback.value = false;
}

const pendingFeedbackId = ref<number>(0);
const acceptFeedbackModal = ref<boolean>(false);
const denyFeedbackModal = ref<boolean>(false);

const openAcceptFeedback = (id: number): void => {
  denyFeedbackModal.value = false;
  pendingFeedbackId.value = id;
  acceptFeedbackModal.value = true;
};

const openDenyFeedback = (id: number): void => {
  acceptFeedbackModal.value = false;
  pendingFeedbackId.value = id;
  denyFeedbackModal.value = true;
};

watch(facilityId, async (newFacId) => {
  await fetchFeedback(newFacId);
});

onMounted(async () => {
  await fetchFeedback(facilityId.value);
});
</script>

<style scoped></style>
