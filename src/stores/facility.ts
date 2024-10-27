import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { Facility, Roster, RosterRequest } from "@/types";

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
  },
});

export default useFacilityStore;
