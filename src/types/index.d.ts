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
  pref_name_enabled: boolean;
  email: string;
  preferred_ois: string;
  pilot_rating: number;
  pilot_rating_string: string;
  controller_rating: number;
  controller_rating_string: string;
  discord_id: string;
  flags: UserFlags | null;
  rosters?: Roster[];
}

export interface UserFlags {
  cid: string;
  no_staff_role: boolean;
  no_staff_log_entry_id: number;
  no_training: boolean;
  no_training_log_entry_id: number;
  no_transferring: boolean;
  no_transferring_log_entry_id: number;
  no_visiting: boolean;
  no_visiting_log_entry_id: number;
  user_transfer_override: boolean;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: number;
  controller_cid: number;
  controller_first_name: string;
  controller_last_name: string;
  callsign: string;
  pilot_cid: number;
  facility: string;
  position: string;
  comment: string;
  feedback: string;
  rating: string;
  status: string;
  created_at: string;
}

export interface FeedbackRequest {
  callsign: string;
  controller_cid: number;
  pilot_cid: number;
  position: string;
  comment: string;
  feedback: string;
  rating: string;
  status: string;
}

export interface RatingChange {
  id: number;
  cid: number;
  new_rating: number;
  old_rating: number;
  created_at: string;
  created_by_cid: number;
  updated_at: string;
}

export interface Roster {
  id: number;
  first_name: string;
  last_name: string;
  cid: number;
  facility: string;
  operating_initials: string;
  home: boolean;
  visiting: boolean;
  status: string;
  roles: Role[];
  created_at: string;
  deleted_at?: string;
}

export interface RosterRequest {
  id: number;
  cid: number;
  first_name: string;
  last_name: string;
  request_type: string;
  status: string;
  reason: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRosterRequest {
  cid: number;
  request_type: string;
  status: string;
  reason: string;
}

export interface Role {
  role: string;
  facility_id: string;
  roster_id: number;
  created_at: string;
}

export interface Facility {
  id: string;
  about: string;
  name: string;
  url: string;
  webhook_url: string;
}

export interface ActionLog {
  id: number;
  cid: number;
  entry: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

export interface DisciplinaryLog {
  id: number;
  cid: number;
  entry: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  vatusa_only: boolean;
}

export interface NotificationSettings {
  discord: boolean;
  email: boolean;
  events: boolean;
  feedback: boolean;
  training: boolean;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  banner_url: string;
  start_date: string;
  end_date: string;
  facilities: string[];
  fields: string[];
  positions: EventPosition[];
  routing: EventRouting[];
}

export interface EventPosition {
  id: number;
  event_id: number;
  position: string;
  facility: string;
  assignee: number;
  assignee_name: string;
  secondary_assignee: number;
  secondary_assignee_name: string;
  shifts: boolean;
  signups: EventSignups[];
}

export interface EventSignups {
  id: number;
  event_id: number;
  position_id: number;
  cid: number;
  name: string;
  shift: number;
  created_at: string;
}

export interface EventRouting {
  id: number;
  event_id: number;
  origin: string;
  destination: string;
  route: string;
  notes: string;
  created_at: string;
}
