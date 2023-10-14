import { defineStore } from "pinia";

interface UserState {
  user: User | null;
  error: string | null;
  fetching: boolean;
  hasFetched: boolean;
  loading: Promise<void> | null;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
  },
});

export default useUserStore;
