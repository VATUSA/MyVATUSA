import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { CreateTrainingNote, TrainingNote } from "@/types";
import { notify } from "notiwind";

interface TrainingNoteState {
  trainingNotes: TrainingNote[];
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

const useTrainingNoteStore = defineStore({
  id: "training_note",
  state: () =>
    ({
      trainingNotes: [],
      error: null,
      fetching: false,
      hasFetched: false,
      loading: null,
    }) as TrainingNoteState,
  getters: {},
  actions: {
    async fetchTrainingNotes(cid: number): Promise<void> {
      this.fetching = true;
      try {
        const { data } = await API.get(`/v3/user/${cid}/training/notes`);
        this.trainingNotes = data;
      } catch (e) {
        this.trainingNotes = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
      }
    },
    async fetchTrainingNotesForFacility(facility: string): Promise<TrainingNote[]> {
      const { data } = await API.get(`/v3/facility/${facility}/training/notes`);
      return data;
    },
    async deleteTrainingNote(cid: number, id: number): Promise<void> {
      let failed = false;
      try {
        const { data } = await API.delete(`/v3/user/${cid}/training/notes/${id}`);
        if (data.status > 399) {
          failed = true;
        }
      } catch (e) {
        failed = true;
      }

      if (failed) {
        notify(
          {
            group: "br-error",
            title: "Delete Failed",
            text: "An error occurred while trying to delete this training note.",
          },
          4000
        );
      }
    },
    async createTrainingNote(student_cid: number, note: CreateTrainingNote): Promise<void> {
      let failed = false;
      try {
        const { data } = await API.post(`/v3/user/${student_cid}/training/notes`, note);
        if (data.status > 399) {
          failed = true;
        }
      } catch (e) {
        failed = true;
      }

      if (failed) {
        notify(
          {
            group: "br-error",
            title: "Create Failed",
            text: "An error occurred while trying to create this training note.",
          },
          4000
        );
      }
    },
  },
});

export default useTrainingNoteStore;
