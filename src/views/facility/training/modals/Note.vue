<template>
  <div class="px-4 py-2">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6">
      <!-- Facility (read-only, taken from URL) -->
      <div class="col-span-1 flex flex-col">
        <input
          v-model="note.facility"
          class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
          style="outline: 0"
          disabled
          readonly
        />
        <p class="order-1 font-bold text-gray-600 text-sm peer-focus:text-usa-blue transition-all duration-300">
          Facility
        </p>
      </div>

      <!-- Student Dropdown -->
      <div class="col-span-1 flex flex-col relative">
        <input
          v-model="searchQuery"
          class="student-input order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
          style="outline: 0"
          placeholder="Search by name or CID"
          required
          @focus="showDropdown = true"
          @input="showDropdown = true"
          @blur="handleBlur"
          @keydown="handleKeydown"
          @click.stop
        />
        <p
          class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
          :class="isValidStudent(studentCID) ? 'text-gray-600' : 'text-usa-red'"
        >
          Student
        </p>

        <!-- Dropdown -->
        <div
          v-if="showDropdown"
          class="student-dropdown absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md z-10"
        >
          <div v-if="roster.length === 0" class="p-2 text-gray-500 text-sm">
            No students available. Please try again later.
          </div>
          <div v-else-if="filteredRoster.length === 0" class="p-2 text-gray-500 text-sm">
            No students found matching your search
          </div>
          <div
            v-for="student in filteredRoster"
            :key="student.cid"
            class="p-2 hover:bg-gray-100 cursor-pointer"
            @click="selectStudent(student)"
          >
            <div class="font-medium">{{ student.first_name }} {{ student.last_name }}</div>
            <div class="text-xs text-gray-500">CID: {{ student.cid }}</div>
          </div>
        </div>
      </div>

      <!-- Position -->
      <div class="col-span-1 flex flex-col">
        <input
          v-model="note.position"
          class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
          style="outline: 0"
          placeholder="DEN_17_CTR"
          required
        />
        <p
          class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
          :class="note.position ? 'text-gray-600' : 'text-usa-red'"
        >
          Position
        </p>
      </div>

      <!-- Duration -->
      <div class="col-span-1 flex flex-col">
        <input
          v-model="durationInput"
          class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent"
          style="outline: 0"
          placeholder="1h 30m"
          required
          @input="validateDuration"
        />
        <p
          class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
          :class="isValidDuration ? 'text-gray-600' : 'text-usa-red'"
        >
          Duration (format: 1h 30m)
        </p>
        <p v-if="!isValidDuration && durationInput" class="order-3 text-usa-red text-xs mt-1">
          Please use format: 1h 30m (e.g., 1h 30m, 0h 45m, 2h 0m)
        </p>
      </div>

      <!-- Notes (text area) -->
      <div class="col-span-3 flex flex-col">
        <textarea
          v-model="note.notes"
          class="order-2 peer my-1 py-1 border-b hover:border-b-usa-blue focus:border-b-usa-blue transition-all duration-300 outline-0 focus:ring-0 bg-transparent min-h-[100px]"
          style="outline: 0"
          placeholder="Enter training notes here..."
          required
        />
        <p
          class="order-1 font-bold text-sm peer-focus:text-usa-blue transition-all duration-300"
          :class="note.notes ? 'text-gray-600' : 'text-usa-red'"
        >
          Notes
        </p>
      </div>

      <!--  Select Buttons -->
      <div class="col-span-1 flex flex-col space-y-4">
        <div class="flex items-center">
          <input
            id="rating-exam-conducted"
            v-model="ratingExamConducted"
            type="checkbox"
            class="mr-2 h-4 w-4 text-usa-blue focus:ring-usa-blue"
          />
          <label for="rating-exam-conducted" class="text-sm font-medium text-gray-700"> Rating Exam Conducted </label>
        </div>

        <div class="flex items-center">
          <input
            id="rating-exam-recommended"
            v-model="ratingExamRecommended"
            type="checkbox"
            class="mr-2 h-4 w-4 text-usa-blue focus:ring-usa-blue"
          />
          <label for="rating-exam-recommended" class="text-sm font-medium text-gray-700">
            Rating Exam Recommended
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="solo-cert-issued"
            v-model="soloCertIssued"
            type="checkbox"
            class="mr-2 h-4 w-4 text-usa-blue focus:ring-usa-blue"
          />
          <label for="solo-cert-issued" class="text-sm font-medium text-gray-700"> Solo Cert Issued </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="col-span-1 md:col-span-2 flex justify-end mt-4">
        <button
          class="bg-usa-blue text-white px-4 py-2 rounded hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isFormValid"
          @click="submitNote"
        >
          Submit
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMsg" class="col-span-1 md:col-span-2 text-usa-red text-center">
        {{ errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { CreateTrainingNote, Roster } from "@/types";
import useTrainingNoteStore from "@/stores/training_note";
import useFacilityStore from "@/stores/facility";

const route = useRoute();
const trainingNoteStore = useTrainingNoteStore();
const facilityStore = useFacilityStore();

// State for roster and search
const roster = ref<Roster[]>([]);
const searchQuery = ref<string>("");
const showDropdown = ref<boolean>(false);
const selectedStudent = ref<Roster | null>(null);

// Initialize note with default values
const note = ref<CreateTrainingNote>({
  facility: route.params.facility_id as string,
  notes: "",
  position: "",
  rating_exam_id: 0,
  session_date: new Date().toISOString(),
  duration: 0,
});

// Create separate refs for the boolean values
const ratingExamConducted = ref<boolean>(false);
const ratingExamRecommended = ref<boolean>(false);
const soloCertIssued = ref<boolean>(false);

const studentCID = ref<number>(0);

function isValidStudent(cid: number): boolean {
  return cid > 0 && roster.value.some((student) => student.cid === cid);
}

const durationInput = ref<string>("");
const isValidDuration = ref<boolean>(false); // Start as false since durationInput is empty
const errorMsg = ref<string>("");

// Validate duration format (Xh Ym)
const validateDuration = (): void => {
  const regex = /^(\d+)h\s+(\d+)m$/;
  const match = durationInput.value.match(regex);

  if (!durationInput.value) {
    isValidDuration.value = false;
    return;
  }

  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    // Convert to nanoseconds and store in note
    const NS_IN_MINUTE = 60 * 1_000_000_000;
    const NS_IN_HOUR = 60 * NS_IN_MINUTE;
    note.value.duration = hours * NS_IN_HOUR + minutes * NS_IN_MINUTE;

    isValidDuration.value = true;
  } else {
    isValidDuration.value = false;
  }
};

// Check if form is valid
const isFormValid = computed(() => {
  return (
    note.value.position &&
    note.value.notes &&
    isValidDuration.value &&
    durationInput.value &&
    isValidStudent(studentCID.value)
  );
});

// Define emits
const emit = defineEmits<{
  (e: "close"): void;
}>();

// Submit the note
const submitNote = async (): Promise<void> => {
  if (!isFormValid.value) {
    errorMsg.value = "Please fill out all required fields correctly.";
    return;
  }

  if (studentCID.value === 0) {
    errorMsg.value = "Student not found";
    return;
  }

  // Create a new object that includes the note values and the separate boolean refs
  const noteWithBooleans = {
    ...note.value,
    rating_exam_conducted: ratingExamConducted.value,
    rating_exam_recommended: ratingExamRecommended.value,
    solo_cert_issued: soloCertIssued.value,
  };

  await trainingNoteStore.createTrainingNote(studentCID.value, noteWithBooleans);

  emit("close");
};

// Computed property for filtered roster based on search query
const filteredRoster = computed(() => {
  if (!searchQuery.value) return roster.value;

  const query = searchQuery.value.toLowerCase().replace(" ", "");
  return roster.value.filter(
    (student) =>
      student.cid.toString().includes(query) ||
      student.first_name.toLowerCase().includes(query) ||
      student.last_name.toLowerCase().includes(query) ||
      `${student.first_name}${student.last_name}`.toLowerCase().includes(query)
  );
});

// Watch searchQuery to clear selected student if search changes
watch(searchQuery, (newValue, oldValue) => {
  // If the search query changes and it's not because we just selected a student
  if (selectedStudent.value && newValue !== `${selectedStudent.value.first_name} ${selectedStudent.value.last_name}`) {
    selectedStudent.value = null;
    studentCID.value = 0;
  }
});

// Handle student selection
const selectStudent = (student: Roster): void => {
  selectedStudent.value = student;
  studentCID.value = student.cid;
  searchQuery.value = `${student.first_name} ${student.last_name}`;
  showDropdown.value = false;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent): void => {
  const dropdown = document.querySelector(".student-dropdown");
  const input = document.querySelector(".student-input");
  const target = event.target as Node;

  // If clicking outside both the dropdown and input, close the dropdown
  if (showDropdown.value && dropdown && input && !dropdown.contains(target) && !input.contains(target)) {
    showDropdown.value = false;
  }
};

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape" && showDropdown.value) {
    showDropdown.value = false;
    event.preventDefault();
  }
};

// Handle blur event
const handleBlur = (): void => {
  // Use setTimeout to allow click events on dropdown to fire first
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};

onMounted(async () => {
  // Set facility from route params
  note.value.facility = route.params.facility_id as string;

  // Fetch roster
  try {
    roster.value = await facilityStore.fetchRoster(note.value.facility);
  } catch (error) {
    console.error("Failed to fetch roster:", error);
    errorMsg.value = "Failed to load student roster";
  }

  // Add event listener for click outside
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  // Remove event listeners
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
