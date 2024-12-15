import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { CreateRosterRequest, Facility, Roster, RosterRequest } from "@/types";
import { notify } from "notiwind";

interface FacilityState {
  facilities: Facility[];
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

const useFacilityStore = defineStore({
  id: "facility",
  state: () =>
    ({
      facilities: [],
      error: null,
      fetching: false,
      hasFetched: false,
      loading: null,
    }) as FacilityState,
  getters: {
    getFacility: (state) => (id: string) => {
      if (!state.facilities) return null;
      return state.facilities.find((facility) => facility.id === id) || null;
    },
  },
  actions: {
    async fetchFacilities(): Promise<void> {
      this.fetching = true;
      try {
        const { data } = await API.get("/v3/facility");
        this.facilities = data;
      } catch (e) {
        this.facilities = [];
      } finally {
        this.fetching = false;
        this.hasFetched = true;
      }
    },
    async fetchRoster(facility: string): Promise<Roster[]> {
      this.fetching = true;
      try {
        const { data } = await API.get(`/v3/facility/${facility}/roster`);
        return data;
      } catch (e) {
        return [];
      } finally {
        this.fetching = false;
      }
    },
    async fetchRosterRequests(facility: string, status: string): Promise<RosterRequest[]> {
      this.fetching = true;
      try {
        const { data } = await API.get(`/v3/facility/${facility}/roster-request`, {
          params: { status },
        });
        return data;
      } catch (e) {
        return [];
      } finally {
        this.fetching = false;
      }
    },
    async createRosterRequest(facility: string, request: CreateRosterRequest): Promise<void> {
      try {
        const data = await API.post(`/v3/facility/${facility}/roster-request`, request);
        if (data.status === 201) {
          notify(
            {
              group: "br-success",
              title: "Application Submitted",
              text: "Please provide up to 7 days for your application to be reviewed.",
            },
            4000
          );
        }
      } catch (e) {
        console.error(e);
        notify(
          {
            group: "br-error",
            title: "Operation Failed",
            text: "If the problem persists, please contact support.",
          },
          4000
        );
      }
    },
    async patchRosterRequest(facility: string, id: number, status: string): Promise<void> {
      try {
        const { data } = await API.patch(`/v3/facility/${facility}/roster-request/${id}`, {
          status,
        });
        if (data.status === 200) {
          notify(
            {
              group: "br-success",
              title: "Operation Successful",
              text: "The roster request has been updated.",
            },
            4000
          );
        }
      } catch (e) {
        console.error(e);
        notify(
          {
            group: "br-error",
            title: "Operation Failed",
            text: "If the problem persists, please contact support.",
          },
          4000
        );
      }
    },
    async regenerateApiKey(facility: string): Promise<string> {
      const { data } = await API.post(`/v3/facility/${facility}/reset-api-key`);
      return data.api_key;
    },
  },
});

export default useFacilityStore;
