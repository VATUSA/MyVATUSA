<template>
  <div>
    <Page title="Training Notes">
      <Card class="-mx-12 md:mx-0">
        <div v-if="fetchingTrainingNotes" class="m-5">
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

            <Primary class="my-auto" text="New Note" color="green" icon="plus" @click="NoteModalVisible = true" />
          </div>

          <div class="grid grid-cols-12 text-xs text-gray-700 uppercase bg-gray-100 font-bold p-4">
            <div class="col-span-2">
              <h5>Controller</h5>
            </div>
            <div class="col-span-2">
              <h5>Trainer</h5>
            </div>
            <div class="col-span-1">
              <h5>Position</h5>
            </div>
            <div class="col-span-1">
              <h5>Session Date</h5>
            </div>
            <div class="col-span-1">
              <h5>Duration</h5>
            </div>
            <div class="col-span-4">
              <h5>Notes</h5>
            </div>
            <div class="col-span-1 text-right">
              <h5>Details</h5>
            </div>
          </div>

          <div v-for="(note, idx) in filteredTrainingNotes" :key="idx">
            <div class="grid grid-cols-12 text-gray-700 py-4 border-b-gray-200 border-b">
              <div class="col-span-2 my-auto ml-4">
                <h5 class="font-bold">{{ note.student_name }}</h5>
                <h5 class="text-xs">{{ note.student_cid }}</h5>
              </div>
              <div class="col-span-2 my-auto text-wrap">
                <h5>{{ note.instructor_name }}</h5>
                <h5 class="text-xs">{{ note.instructor_cid }}</h5>
              </div>
              <div class="col-span-1 my-auto">
                <h5>{{ note.position }}</h5>
              </div>
              <div class="col-span-1 my-auto">
                <h5>{{ new Date(note.session_date).toLocaleDateString() }}</h5>
              </div>
              <div class="col-span-1 my-auto flex">
                <h5>{{ FormatNanoseconds(note.duration) }}</h5>
              </div>
              <div class="col-span-4 my-auto">
                <h5 class="truncate">{{ note.notes }}</h5>
              </div>
              <div class="col-span-1 text-right my-auto mr-4">
                <button
                  v-if="selectedTrainingNote !== idx"
                  class="rounded-full hover:bg-gray-200 transition duration-200 px-2"
                  @click="selectTrainingNote(idx)"
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button
                  v-else
                  class="rounded-full hover:bg-gray-200 transition duration-200 px-1"
                  @click="selectTrainingNote(-1)"
                >
                  <i class="fa-solid fa-chevron-down"></i>
                </button>
              </div>
              <div v-if="selectedTrainingNote === idx" class="col-span-12 border-t px-4 border-t-gray-200 mt-4 py-4">
                <div class="grid grid-cols-2 2xl:grid-cols-4 text-gray-700 gap-5">
                  <div class="col-span-1 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Pilot Details</h5>
                    </div>
                    <div class="p-4 grid grid-cols-3 gap-y-5">
                      <div class="col-span-1 text-gray-600">CID</div>
                      <div class="col-span-2 font-semibold">{{ note.student_cid }}</div>
                      <div class="col-span-1 text-gray-600">Name</div>
                      <div class="col-span-2 font-semibold">{{ note.student_name }}</div>
                    </div>
                  </div>

                  <div v-if="note.rating_exam_id !== 0" class="col-span-2 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Rating Examination (RE)</h5>
                    </div>
                    <div class="p-4 grid grid-cols-4 gap-y-5">
                      <div class="col-span-1 text-gray-600">Notes</div>
                      <div class="col-span-3 font-semibold">{{ note.rating_exam_notes }}</div>
                      <div class="col-span-1 text-gray-600">Results</div>
                      <div
                        class="col-span-3 font-semibold"
                        :class="note.rating_exam_result ? 'text-emerald-500' : 'text-red-500'"
                      >
                        {{ note.rating_exam_result ? "Passed" : "Failed" }}
                      </div>
                      <div class="col-span-1 text-gray-600">Actions</div>
                      <div class="col-span-3 font-semibold">
                        <button
                          class="bg-usa-blue text-white text-sm px-3 py-1 rounded hover:opacity-75 transition duration-200"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="col-span-1 border border-gray-200 rounded">
                    <div class="bg-gray-100 rounded-t p-2">
                      <h5 class="font-bold text-sm">Miscellaneous</h5>
                    </div>
                    <div class="p-4 grid grid-cols-5 gap-y-5 gap-x-2">
                      <div class="col-span-2 text-gray-600">Session at current rating</div>
                      <div class="col-span-3 font-semibold text-wrap">Coming Soon...</div>
                      <div class="col-span-2 text-gray-600">Sessions this month</div>
                      <div class="col-span-3 font-semibold">Coming Soon...</div>
                      <div class="col-span-2 text-gray-600">Actions</div>
                      <div class="col-span-3 font-semibold space-x-4">
                        <button
                          class="bg-usa-blue text-white text-sm px-3 py-1 rounded hover:opacity-75 transition duration-200"
                          disabled
                        >
                          Edit
                        </button>

                        <button
                          class="bg-usa-red text-white text-sm px-3 py-1 rounded hover:opacity-75 transition duration-200"
                          @click="deleteTrainingNote(note.student_cid, note.id)"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 v-if="filteredTrainingNotes.length === 0" class="text-center text-xl font-semibold m-5">
            No Training Notes Found
          </h3>
        </div>
      </Card>
    </Page>

    <Modal title="Create Training Note" :visible="NoteModalVisible" @close="NoteModalVisible = false">
      <Note @close="NoteModalVisible = false" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import Page from "@/components/Page.vue";
import Spinner from "@/components/animations/Spinner.vue";
import Card from "@/components/Card.vue";
import { useRoute } from "vue-router";
import useTrainingNoteStore from "@/stores/training_note";
import { computed, onMounted, ref } from "vue";
import { TrainingNote } from "@/types";
import FormatNanoseconds from "@/utils/time";
import Primary from "@/components/buttons/Primary.vue";
import Modal from "@/components/Modal.vue";
import Note from "./modals/Note.vue";

const trainingNoteStore = useTrainingNoteStore();
const route = useRoute();
const facilityId = computed(() => route.params.facility_id as string);

const fetchingTrainingNotes = ref<boolean>(false);
const trainingNotes = ref<TrainingNote[]>([]);

const search = ref<string>("");
const filteredTrainingNotes = computed(() => {
  return trainingNotes.value.filter((note) => {
    return (
      note.student_name.toLowerCase().includes(search.value.toLowerCase()) ||
      note.instructor_name.toLowerCase().includes(search.value.toLowerCase()) ||
      note.student_cid.toString().includes(search.value) ||
      note.instructor_cid.toString().includes(search.value) ||
      note.position.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});

const selectedTrainingNote = ref<number>(-1);
function selectTrainingNote(idx: number): void {
  selectedTrainingNote.value = idx;
}

async function fetchTrainingNotes(facId: string): Promise<void> {
  fetchingTrainingNotes.value = true;
  trainingNotes.value = await trainingNoteStore.fetchTrainingNotesForFacility(facId);
  fetchingTrainingNotes.value = false;
}

function deleteTrainingNote(cid: number, id: number): void {
  trainingNoteStore.deleteTrainingNote(cid, id);
}

const NoteModalVisible = ref<boolean>(false);

onMounted(async () => {
  await fetchTrainingNotes(facilityId.value);
});
</script>

<style scoped></style>
