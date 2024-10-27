import type { Link } from "@/types";

const SidebarLinks: Link[] = [
  {
    title: "Home",
    icon: "fa-solid fa-home",
    to: { name: "Home" },
  },
  {
    title: "My Profile",
    icon: "fa-solid fa-user",
    to: { name: "Profile" },
  },
  {
    title: "My Flights",
    icon: "fa-solid fa-plane",
    to: { name: "Home" },
    separator: true,
    separatorTitle: "Pilots",
  },
  {
    title: "Leave Feedback",
    icon: "fa-solid fa-check-to-slot",
    to: { name: "Leave Feedback" },
  },
  {
    title: "Facility",
    icon: "fa-solid fa-hippo",
    to: { name: "Facility" },
    separator: true,
    separatorTitle: "Controllers",
  },
  {
    title: "My Feedback",
    icon: "fa-solid fa-star",
    to: { name: "My Feedback" },
  },
  {
    title: "Training",
    icon: "fa-solid fa-chalkboard-user",
    subLinks: [
      {
        title: "Book a Session",
        icon: "fa-solid fa-calendar",
        // to: { name: "Training-Scheduler" },
        to: { name: "Home" },
      },
      {
        title: "My Training Notes",
        icon: "fa-solid fa-book",
        // to: { name: "Training-Notes" },
        to: { name: "Home" },
      },
    ],
    showSubLinks: true,
  },
  // {
  //   title: "Events",
  //   icon: "fa-solid fa-calendar",
  //   to: { name: "Events" },
  //   separator: true,
  //   separatorTitle: "Division",
  // },
  // {
  //   title: "Division Staff",
  //   icon: "fa-solid fa-users",
  //   to: { name: "Division-Staff" },
  // },
  // {
  //   title: "Division Policies",
  //   icon: "fa-solid fa-file-alt",
  //   to: { name: "Division-Policies" },
  // },
  // {
  //   title: "vNAS Status",
  //   icon: "fa-solid fa-plane",
  //   to: { name: "vNAS-Status" },
  // },
  // {
  //   title: "Support Center",
  //   icon: "fa-solid fa-life-ring",
  //   to: { name: "Support" },
  //   separator: true,
  // },
];

export default SidebarLinks;
