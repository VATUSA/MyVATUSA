<template>
  <div class="w-full">
    <div class="flex justify-between border-b-2 border-dashed border-usa-blue p-4">
      <h3 class="font-semibold text-usa-grey text-3xl">{{ FlightNumber }}</h3>
      <p class="text-usa-grey text-3xl">{{ props.flight.aircraft }}</p>
    </div>
    <div class="p-4 flex justify-between">
      <div class="text-center text-usa-grey">
        <p>New York</p>
        <h6 class="font-bold text-2xl -my-2">{{ props.flight.origin }}</h6>
        <p>{{ new Date(props.flight.departure_time).toLocaleDateString() }}</p>
      </div>

      <div class="flex items-center ml-4">
        <div class="w-3 h-3 bg-usa-red rounded-full"></div>
      </div>
      <div class="flex-grow my-auto text-center">
        <p class="font-light text-sm text-usa-grey">{{ props.flight.duration }}</p>
        <div class="flex-grow border-t-2 border-dashed border-usa-red my-1"></div>
        <p class="font-light text-sm text-usa-grey truncate">
          {{ props.flight.route }}
        </p>
      </div>
      <div class="flex items-center mr-4">
        <div class="w-3 h-3 bg-usa-red rounded-full"></div>
      </div>

      <div class="text-center text-usa-grey">
        <p>Denver</p>
        <h6 class="font-bold text-2xl -my-2">{{ props.flight.destination }}</h6>
        <p>{{ new Date(props.flight.arrival_time).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Flight } from "@/types";

import { ref } from "vue";

const props = defineProps<{
  flight: Flight;
}>();

const FlightNumber = ref<string>("");
switch (props.flight.callsign.substring(0, 3)) {
  case "DAL":
    FlightNumber.value = `Delta Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "SWA":
    FlightNumber.value = `Southwest Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "AAL":
    FlightNumber.value = `American Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "UAL":
    FlightNumber.value = `United Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "FDX":
    FlightNumber.value = `FedEx ${props.flight.callsign.substring(3)}`;
    break;
  case "UPS":
    FlightNumber.value = `UPS ${props.flight.callsign.substring(3)}`;
    break;
  case "NKS":
    FlightNumber.value = `Spirit Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "JBU":
    FlightNumber.value = `JetBlue Airways ${props.flight.callsign.substring(3)}`;
    break;
  case "VRD":
    FlightNumber.value = `Virgin America ${props.flight.callsign.substring(3)}`;
    break;
  case "FFT":
    FlightNumber.value = `Frontier Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "SWT":
    FlightNumber.value = `Swift Air ${props.flight.callsign.substring(3)}`;
    break;
  case "AAY":
    FlightNumber.value = `Allegiant Air ${props.flight.callsign.substring(3)}`;
    break;
  case "ENY":
    FlightNumber.value = `Envoy Air ${props.flight.callsign.substring(3)}`;
    break;
  case "SKW":
    FlightNumber.value = `SkyWest Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "ASH":
    FlightNumber.value = `SkyWest Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "RPA":
    FlightNumber.value = `Republic Airways ${props.flight.callsign.substring(3)}`;
    break;
  case "EDV":
    FlightNumber.value = `Endeavor Air ${props.flight.callsign.substring(3)}`;
    break;
  case "PDT":
    FlightNumber.value = `Piedmont Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "JIA":
    FlightNumber.value = `PSA Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "SKV":
    FlightNumber.value = `SkyWest Airlines ${props.flight.callsign.substring(3)}`;
    break;
  case "QXE":
    FlightNumber.value = `Horizon Air ${props.flight.callsign.substring(3)}`;
    break;
  case "QFA":
    FlightNumber.value = `Qantas ${props.flight.callsign.substring(3)}`;
    break;
  default:
    FlightNumber.value = props.flight.callsign;
    break;
}
</script>

<style scoped></style>
