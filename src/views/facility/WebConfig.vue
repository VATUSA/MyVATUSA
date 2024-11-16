<template>
  <Page title="Web Config">
    <div class="grid grid-cols-3 mx-10">
      <div class="col-span-1 text-usa-grey space-y-4 mr-10">
        <h3 class="text-lg font-semibold mt-4 text-usa-blue">Configure {{ facilityId }}'s Web Config Here</h3>
        <p class="">
          Set up the web configuration for this facility. This includes the website URL, a short about, API Token, S3
          configuration, and emails.
        </p>

        <div>
          <h5 class="font-bold">API Token</h5>
          <p>
            Upon generating your API Token you will not be able to read it again. In order to 'read' your API token you
            must reset it.
          </p>
        </div>

        <div>
          <h5 class="font-bold">S3 Configuration <span class="font-normal">(Optional)</span></h5>
          <p>
            Coming Soon...
            <!--            If you would like to use S3 for your facility's web configuration, please fill out the following fields, you-->
            <!--            will be able to upload images and files to your S3 bucket. The default bucket limit is 15GB, if you need-->
            <!--            more space please contact USA6.-->
          </p>
        </div>

        <div>
          <h5 class="font-bold">Email Configuration <span class="font-normal">(Optional)</span></h5>
          <p>Coming Soon...</p>
        </div>

        <div>
          <h5 class="font-bold">Webhooks <span class="font-normal">(Optional)</span></h5>
          <p>Coming Soon...</p>
        </div>
      </div>
      <Card v-if="facility" class="col-span-2 -mx-12 md:mx-0">
        <div class="p-8 space-y-8">
          <div class="space-y-2">
            <h5 class="font-semibold">Website URL</h5>
            <div
              class="flex items-center px-3 py-2 rounded ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-usa-blue"
            >
              <span class="text-gray-500">https://</span>
              <input
                v-model="facility.url"
                style="outline: 0"
                type="text"
                class="flex-1 ml-1 outline-none"
                placeholder="zdvartcc.org"
              />
            </div>
          </div>

          <div class="space-y-3">
            <h5 class="font-semibold">About</h5>
            <textarea
              type="text"
              style="outline: 0"
              class="rounded ring-1 ring-gray-300 drop-shadow-sm px-4 py-2 w-full focus:ring-2 focus:ring-usa-blue"
              placeholder="A few words about your facility..."
            />
          </div>

          <div class="space-y-2">
            <h5 class="font-semibold">API Key</h5>
            <div class="flex gap-x-5">
              <input
                v-model="apiKey"
                style="outline: 0"
                type="text"
                class="cursor-pointer w-full ml-1 outline-none px-3 py-2 rounded ring-1 ring-gray-300 focus:ring-2 focus:ring-usa-blue"
                disabled
                placeholder="*********"
                @click="copyApiKey()"
              />
              <Primary text="Regenerate" color="blue" @click="regenerateApiKey()" />
            </div>
            <p class="text-sm text-gray-500">Note: Only viewable after regeneration</p>
          </div>
        </div>
      </Card>
      <Loader v-else />
    </div>
  </Page>
</template>

<script setup lang="ts">
import Page from "@/components/Page.vue";
import Card from "@/components/Card.vue";
import Primary from "@/components/buttons/Primary.vue";

import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { notify } from "notiwind";
import useFacilityStore from "@/stores/facility";
import { Facility } from "@/types";
import Loader from "@/components/animations/Loader.vue";

const route = useRoute();
const facilityStore = useFacilityStore();
const facilityId = computed(() => route.params.facility_id as string);

const facility = ref<Facility | null>(null);

const apiKey = ref<string>("********************************");
const copyApiKey = (): void => {
  navigator.clipboard.writeText(apiKey.value);
  notify(
    {
      group: "br-success",
      title: "API Key Copied",
      text: "API Key has been copied to your clipboard.",
    },
    4000
  );
};

const regenerateApiKey = async (): Promise<void> => {
  const newApiKey = await facilityStore.regenerateApiKey(facilityId.value);
  apiKey.value = newApiKey;
  copyApiKey();
};

async function fetchWebConfig(facId: string): Promise<void> {
  facility.value = facilityStore.facilities.find((f) => f.id === facId) || null;
}

watch(facilityId, (newFacId) => {
  fetchWebConfig(newFacId.toUpperCase());
});

onMounted(async () => {
  if (!facilityStore.hasFetched) {
    await facilityStore.fetchFacilities();
  }

  await fetchWebConfig(facilityId.value.toUpperCase());
});
</script>

<style scoped></style>
