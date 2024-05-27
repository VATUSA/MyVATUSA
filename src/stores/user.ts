import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { User } from "@/types";
import { getControllerRating, getPilotRating } from "@/utils/rating";

interface UserState {
  user: User | null;
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

const useUserStore = defineStore("user", {
  state: () =>
    ({
      user: null,
      error: null,
      fetching: false,
      hasFetched: false,
    }) as UserState,
  getters: {
    isLoggedIn: (state) => !!state.user,
    fullName: (state) => {
      if (!state.user) return "";
      return `${state.user.first_name} ${state.user.last_name}`;
    },
  },
  actions: {
    async fetchUser() {
      this.fetching = true;
      try {
        const { data } = await API.get("/v3/user");
        this.user = data;
        if (this.user?.controller_rating) {
          this.user.controller_rating_string = getControllerRating(this.user?.controller_rating);
        }
        if (this.user?.pilot_rating) {
          this.user.pilot_rating_string = getPilotRating(this.user?.pilot_rating);
        }
      } catch (e) {
        this.user = null;
      } finally {
        this.fetching = false;
        this.hasFetched = true;
      }
    },
  },
});

export default useUserStore;
