import { defineStore } from "pinia";
import { API } from "@/utils/api";
import { Event, EventPosition } from "@/types";
import useUserStore from "@/stores/user";

interface EventState {
  upcoming_events: Event[] | null;
  error: string | null;
  fetching: boolean;
}

const useEventStore = defineStore({
  id: "event",
  state: () =>
    ({
      upcoming_events: null,
      error: null,
      fetching: false,
    }) as EventState,
  getters: {
    upcoming: (state) => state.upcoming_events,
  },
  actions: {
    async fetchUpcomingEvents(): Promise<void> {
      this.fetching = true;
      try {
        const { data } = await API.get("/v3/events");
        this.upcoming_events = data;
      } catch (e) {
        this.upcoming_events = null;
      } finally {
        this.fetching = false;
      }
    },
    async fetchPreviousEvents(facility: string): Promise<Event[]> {
      try {
        const { data } = await API.get(`/v3/facility/${facility}/events/previous`);
        return data;
      } catch (e) {
        return [];
      }
    },
    async fetchEvents(facility: string): Promise<Event[]> {
      try {
        const { data } = await API.get(`/v3/facility/${facility}/events`);
        return data;
      } catch (e) {
        return [];
      }
    },
    async fetchEvent(facility: string, id: number): Promise<Event | null> {
      try {
        const { data } = await API.get(`/v3/facility/${facility}/events/${id}`);
        return data;
      } catch (e) {
        return null;
      }
    },
    async fetchEventPositions(facility: string, id: number): Promise<EventPosition[]> {
      try {
        const { data } = await API.get(`/v3/facility/${facility}/events/${id}/positions`);
        return data;
      } catch (e) {
        return [];
      }
    },
    async createEventSignup(
      facility_id: string,
      event_id: number,
      position_id: number,
      shift: number
    ): Promise<boolean> {
      try {
        const userStore = useUserStore();
        await API.post(`/v3/facility/${facility_id}/events/${event_id}/signups`, {
          cid: userStore.self!.cid,
          position_id,
          shift,
        });
        return true;
      } catch (e) {
        return false;
      }
    },
    async deleteEventSignup(facility_id: string, event_id: number, event_signup_id: number): Promise<boolean> {
      try {
        await API.delete(`/v3/facility/${facility_id}/events/${event_id}/signups/${event_signup_id}`);
        return true;
      } catch (e) {
        return false;
      }
    },
    async assignEventPosition(
      facility_id: string,
      event_id: number,
      position_id: number,
      shift: number,
      cid: number
    ): Promise<boolean> {
      try {
        const body = {};
        if (shift === 1) {
          body.assignee = cid;
        }
        if (shift === 2) {
          body.secondary_assignee = cid;
        }
        await API.patch(`/v3/facility/${facility_id}/events/${event_id}/positions/${position_id}`, body);
        return true;
      } catch (e) {
        return false;
      }
    },
    async unassignEventPosition(
      facility_id: string,
      event_id: number,
      position_id: number,
      shift: number
    ): Promise<boolean> {
      try {
        const body = {};
        if (shift === 1) {
          body.assignee = 0;
        }
        if (shift === 2) {
          body.secondary_assignee = 0;
        }
        await API.patch(`/v3/facility/${facility_id}/events/${event_id}/positions/${position_id}`, body);
        return true;
      } catch (e) {
        return false;
      }
    },
  },
});

export default useEventStore;
