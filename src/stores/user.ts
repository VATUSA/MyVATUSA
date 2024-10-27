import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { ActionLog, NotificationSettings, User, Role } from "@/types";
import { getControllerRating, getPilotRating } from "@/utils/rating";
import { notify } from "notiwind";

interface UserState {
  user: User | null;
  roles: Role[] | null;
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
    self: (state) => state.user,
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

        await this.fetchRoles();
        await this.fetchRosters();

        if (this.isLoggedIn) {
          notify(
            {
              group: "br-success",
              title: "Login Successful",
              text: "Welcome back to VATUSA!",
            },
            4000
          );
        }
      }
    },
    async patchUser(cid: number, body: { [p: string]: string }): Promise<void> {
      try {
        const { data } = await API.patch(`/v3/user/${cid}`, body);
        const storeRoster = this.user?.rosters;
        this.user = data;
        if (this.user) {
          this.user.rosters = storeRoster;
          this.user.controller_rating_string = getControllerRating(this.user.controller_rating);
          this.user.pilot_rating_string = getPilotRating(this.user.pilot_rating);
        }
        notify(
          {
            group: "br-success",
            title: "User Updated",
            text: "User information has been updated successfully.",
          },
          4000
        );
      } catch (e) {
        notify(
          {
            group: "br-error",
            title: "Error Updating User",
            text: "An error occurred while trying to submit the request.",
          },
          4000
        );
      }
    },
    async fetchRoles(): Promise<void> {
      if (!this.isLoggedIn) return;
      try {
        const { data } = await API.get(`/v3/user/${this.user?.cid}/roles`);
        this.roles = data;
      } catch (e) {
        this.roles = [];
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
    async fetchActionLog(cid: number): Promise<ActionLog[]> {
      try {
        const { data } = await API.get(`/v3/user/${cid}/action-log`);
        return data;
      } catch (e) {
        console.error(e);
        return [];
      }
    },
    async fetchNotificationSettings(cid: number): Promise<NotificationSettings | null> {
      try {
        const { data } = await API.get(`/v3/user/${cid}/notification-settings`);
        return data;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    async updateNotificationSettings(cid: number, updatedSettings: NotificationSettings): Promise<null> {
      try {
        const data = await API.put(`/v3/user/${cid}/notification-settings`, updatedSettings);
        if (data.status === 200) {
          return null;
        }
        notify(
          {
            group: "br-error",
            title: "Operation Failed",
            text: "An error occurred while trying to update the notification settings.",
          },
          4000
        );
        return null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    async unlinkDiscord(): Promise<null> {
      try {
        const data = await API.get(`/v3/user/discord/unlink`);
        if (data.status === 200) {
          notify(
            {
              group: "br-success",
              title: "Discord Unlinked",
              text: "Your Discord account has been unlinked successfully.",
            },
            4000
          );
          if (this.user) {
            this.user.discord_id = "";
          }
        }
        return null;
      } catch (e) {
        notify(
          {
            group: "br-error",
            title: "Operation Failed",
            text: "An error occurred while trying to unlink your Discord account.",
          },
          4000
        );
        console.error(e);
        return null;
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
        notify(
          {
            group: "br-error",
            title: "Logout Failed",
            text: "An error occurred while logging out.",
          },
          4000
        );
      } finally {
        this.fetching = false;
      }
    },
  },
});

export default useUserStore;
