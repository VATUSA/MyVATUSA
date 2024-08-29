import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { Feedback } from "@/types";

interface FeedbackState {
  myFeedback: Feedback;
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

const useFeedbackStore = defineStore({
  id: "feedback",
  state: () =>
    ({
      myFeedback: [],
      error: null,
      fetching: false,
      hasFetched: false,
    }) as FeedbackState,
  getters: {},
  actions: {
    async fetchFeedback(cid: number): Promise<void> {
      this.fetching = true;
      try {
        const { data } = await API.get(`/v3/user/${cid}/feedback`);
        this.myFeedback = data;
      } catch (e) {
        this.myFeedback = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
      }
    },
  },
});

export default useFeedbackStore;
