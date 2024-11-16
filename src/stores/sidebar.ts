import { defineStore } from "pinia";
import { Link, Role } from "@/types";
import SidebarLinks from "@/data/sidebar";

interface SidebarState {
  sidebar: Link[];
  fetched: boolean;
  loading: Promise<void> | null;
}

interface FacRoleMap {
  [facility_id: string]: string[];
}

const useSidebarStore = defineStore({
  id: "sidebar",
  state: () =>
    ({
      sidebar: SidebarLinks,
      fetched: false,
    }) as SidebarState,
  getters: {
    links: (state) => state.sidebar,
  },
  actions: {
    updateSidebar(roles: Role[]): void {
      if (!this.fetched) {
        const facilityRolesMap = roles.reduce((acc: FacRoleMap, { facility_id, role_id }) => {
          if (!acc[facility_id]) {
            acc[facility_id] = [];
          }
          acc[facility_id].push(role_id);
          return acc;
        }, {});

        Object.keys(facilityRolesMap).forEach((facility: string) => {
          const seniorStaff: Link[] = [
            {
              title: "Management",
              icon: "fa-solid fa-gear",
              to: { name: "Management", params: { facility_id: facility } },
            },
            {
              title: "Roster",
              icon: "fa-solid fa-users",
              to: { name: "Roster", params: { facility_id: facility } },
            },
            {
              title: "Feedback",
              icon: "fa-solid fa-users",
              to: { name: "Feedback", params: { facility_id: facility } },
            },
          ];

          const fe: Link[] = [
            {
              title: "Engineering",
              icon: "fa-solid fa-tools",
              to: { name: "Engineering", params: { facility_id: facility } },
            },
          ];

          const wm: Link[] = [
            {
              title: "Web Config",
              icon: "fa-solid fa-cogs",
              to: { name: "Web Config", params: { facility_id: facility } },
            },
          ];

          const ec: Link[] = [
            {
              title: "Events",
              icon: "fa-solid fa-calendar",
              to: { name: "ARTCC Events", params: { facility_id: facility } },
            },
          ];

          const training: Link[] = [
            {
              title: "Training Actions",
              icon: "fa-solid fa-chalkboard-user",
              subLinks: [
                {
                  title: "Calendar",
                  icon: "fa-solid fa-calendar",
                  to: { name: "Training Calendar", params: { facility_id: facility } },
                },
                {
                  title: "Notes",
                  icon: "fa-solid fa-book",
                  to: { name: "Training-Notes", params: { facility_id: facility } },
                },
              ],
              showSubLinks: true,
            },
          ];

          // If ZHQ
          if (facility === "ZHQ") {
            this.sidebar.push({
              title: "User Management",
              icon: "fa-solid fa-users",
              to: { name: "Home" },
              separator: true,
              separatorTitle: "VATUSA",
            });
          } else {
            const facRoles: string[] = facilityRolesMap[facility];
            const temp: Link[] = [];
            if (facRoles.includes("ATM") || facRoles.includes("DATM") || facRoles.includes("TA")) {
              temp.push(...seniorStaff, ...fe, ...wm, ...ec, ...training);
            } else {
              if (facRoles.includes("FE") || facRoles.includes("AFE")) {
                temp.push(...fe);
              }
              if (facRoles.includes("WM") || facRoles.includes("AWM")) {
                temp.push(...wm);
              }
              if (facRoles.includes("EC") || facRoles.includes("AEC")) {
                temp.push(...ec);
              }

              if (facRoles.includes("MTR") || facRoles.includes("INS")) {
                temp.push(...training);
              }
            }

            temp[0].separator = true;
            temp[0].separatorTitle = facility;
            this.sidebar.push(...temp);
          }
        });
      }
    },
  },
});

export default useSidebarStore;
