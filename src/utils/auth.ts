import useUserStore from "@/stores/user";

const hasRole = (role?: string[] | string, facility?: string): boolean => {
  const userStore = useUserStore();

  if (userStore.user == null) {
    return false;
  }

  if (userStore.roles == null) {
    return false;
  }

  if (role === undefined) {
    return true;
  }

  let isVATUSA = false;
  userStore.roles.forEach((r): void => {
    if (r.role_id.includes("USA")) {
      isVATUSA = true;
    }
  });
  if (isVATUSA) {
    return true;
  }

  const tempRole: string[] = typeof role === "string" ? [role] : role;

  if (facility === undefined) {
    return userStore.roles.some((r) => tempRole.includes(r.role_id));
  }

  return userStore.roles.some((r) => tempRole.includes(r.role_id) && r.facility_id === facility);
};

export default hasRole;
