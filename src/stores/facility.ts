import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { Facility } from "@/types";

interface FacilityState {
  facilities: Facility[] | null;
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

const useFacilityStore = defineStore({
  id: "facility",
  state: () =>
    ({
      facilities: null,
      error: null,
      fetching: false,
      hasFetched: false,
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
  },
});

export default useFacilityStore;
