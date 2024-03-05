import Facilities from "@/data/facilities";
import type { Facility } from "@/types";

const getFacility = (id: string): Facility | undefined => {
  return Facilities.find((facility) => facility.id === id);
};

export default getFacility;
