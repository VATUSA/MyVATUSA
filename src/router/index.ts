import { createRouter, createWebHistory, NavigationGuard, Router } from "vue-router";
import useUserStore from "@/stores/user";

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
    path: "/facility",
    name: "Facility",
    component: () => import("@/views/Facility.vue"),
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
    // TODO - Redirect to SSO with a return URL
    next({ name: "Login" });
    return;
  }

  next();
};

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.hasFetched) {
    if (userStore.loading === null || userStore.loading === undefined) {
      userStore.loading = userStore.fetchUser();
    }
    userStore.loading.then(() => {
      check(to, from, next);
    });
  } else {
    check(to, from, next);
  }
});

export default router;
