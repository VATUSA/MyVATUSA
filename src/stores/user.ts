import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { User } from "@/types";
import { getControllerRating, getPilotRating } from "@/utils/rating";
import { notify } from "notiwind";

interface UserState {
  user: User | null;
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  hasFetchedRosters: boolean;
  loading: Promise<void> | null;
}

const useUserStore = defineStore({
  id: "user",
  state: () =>
    ({
      user: null,
      error: null,
      fetching: false,
      hasFetched: false,
      hasFetchedRosters: false,
    }) as UserState,
  getters: {
    isLoggedIn: (state) => !!state.user,
    fullName: (state) => {
      if (!state.user) return "";
      return `${state.user.first_name} ${state.user.last_name}`;
    },
  },
  actions: {
    async fetchUser(): Promise<void> {
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
        notify(
          {
            group: "br",
            title: "Login Successful",
            text: "Welcome back to VATUSA!",
          },
          4000
        );
      }
    },
    async fetchRosters(): Promise<void> {
      if (!this.isLoggedIn) return;
      try {
        const { data } = await API.get(`/v3/user/${this.user?.cid}/roster`);
        this.user!.rosters = data;
      } catch (e) {
        this.user!.rosters = [];
      } finally {
        this.hasFetchedRosters = true;
      }
    },
    async logout(): Promise<void> {
      this.fetching = true;
      try {
        await API.get("/v3/user/logout");
        this.user = null;
        this.hasFetched = false;
        this.hasFetchedRosters = false;
        window.location.href = "https://vatusa.net";
      } catch (e) {
        // TODO - throw error notification
        console.log(e);
      } finally {
        this.fetching = false;
      }
    },
  },
});

export default useUserStore;
