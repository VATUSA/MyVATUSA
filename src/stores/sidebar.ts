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
              temp.push(
                {
                  title: "Management",
                  icon: "fa-solid fa-gear",
                  to: { name: "Management", params: { facility_id: facility } },
                },
                {
                  title: "Roster",
                  icon: "fa-solid fa-users",
                  to: { name: "Roster", params: { facility_id: facility } },
                }
              );
            } else {
              if (facRoles.includes("FE") || facRoles.includes("AFE")) {
                temp.push({
                  title: "Engineering",
                  icon: "fa-solid fa-tools",
                  to: { name: "Engineering", params: { facility_id: facility } },
                });
              }
              if (facRoles.includes("WM") || facRoles.includes("AWM")) {
                temp.push({
                  title: "Web Config",
                  icon: "fa-solid fa-cogs",
                  to: { name: "Web Config", params: { facility_id: facility } },
                });
              }
              if (facRoles.includes("EC") || facRoles.includes("AEC")) {
                temp.push({
                  title: "Events",
                  icon: "fa-solid fa-calendar",
                  to: { name: "ARTCC Events", params: { facility_id: facility } },
                });
              }

              if (facRoles.includes("MTR") || facRoles.includes("INS")) {
                temp.push({
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
                });
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
