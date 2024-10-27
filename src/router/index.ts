import { createRouter, createWebHistory, NavigationGuard, Router } from "vue-router";
import useUserStore from "@/stores/user";
import apiUrl from "@/utils/api";
import useSidebarStore from "@/stores/sidebar";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresRole?: string[] | string;
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/events/:facility_id/:id",
    name: "Event",
    component: () => import("@/views/Event.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/pilots",
    children: [
      {
        path: "feedback",
        name: "Leave Feedback",
        component: () => import("@/views/pilots/LeaveFeedback.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/controllers",
    children: [
      {
        path: "facility",
        name: "Facility",
        component: () => import("@/views/controllers/Facility.vue"),
      },
      {
        path: "feedback",
        name: "My Feedback",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:facility_id",
    children: [
      {
        path: "management",
        name: "Management",
        component: () => import("@/views/controllers/Facility.vue"),
      },
      {
        path: "roster",
        name: "Roster",
        component: () => import("@/views/facility/Roster.vue"),
      },
      {
        path: "engineering",
        name: "Engineering",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
      {
        path: "web-config",
        name: "Web Config",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
      {
        path: "events",
        name: "ARTCC Events",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
      {
        path: "training/notes",
        name: "Training Notes",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
      {
        path: "training/calendar",
        name: "Training Calendar",
        component: () => import("@/views/controllers/MyFeedback.vue"),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const buildRouter = (): Router => {
  const r = routes;

  return createRouter({
    scrollBehavior(to) {
      if (to.params.section) {
        return {
          el: `#${to.params.section}`,
          top: 75,
          behavior: "smooth",
        };
      }
      return {
        top: 0,
        behavior: "smooth",
      };
    },
    history: createWebHistory(),
    routes: r,
  });
};

const router = buildRouter();

const check: NavigationGuard = (to, from, next): void => {
  const userStore = useUserStore();

  if (!userStore.user) {
    window.location.href = `${apiUrl}/v3/user/login?redirect=${window.location.href}`;
    return;
  }

  next();
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const sidebarStore = useSidebarStore();
  if (!userStore.hasFetched) {
    if (userStore.loading === null || userStore.loading === undefined) {
      console.log("fetching user");
      userStore.loading = userStore.fetchUser();
      await userStore.loading;
      sidebarStore.updateSidebar(userStore.roles!);
    }
    userStore.loading.then(() => {
      check(to, from, next);
    });
  } else {
    check(to, from, next);
  }
});

export default router;
