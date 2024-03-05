import { RouteLocationRaw } from "vue-router";

export interface Link {
  title: string;
  icon?: string;
  to?: RouteLocationRaw;
  href?: string;
  subLinks?: Link[];
  showSubLinks?: boolean;
  roles?: string[];
  separator?: boolean;
  separatorTitle?: string;
}

export interface Flight {
  callsign: string;
  aircraft: string;
  origin: string;
  destination: string;
  departure_time: number;
  arrival_time: number;
  duration: number;
  distance: number;
  route: string;
  status: string; // "departing", "en-route", "arrived"
}

export interface User {
  cid: number;
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  preferred_ois: string;
  pilot_rating: number;
  controller_rating: number;
  discord_id: string;
  rosters?: Roster[];
}

export interface Roster {
  id: number;
  cid: number;
  facility: string;
  operating_initials: string;
  home: boolean;
  visiting: boolean;
  status: string;
  created_at: string;
  deleted_at?: string;
}

export interface Facility {
  id: string;
  name: string;
}
