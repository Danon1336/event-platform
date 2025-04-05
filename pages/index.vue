<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEventsStore } from '~/stores/events';
import { defineAsyncComponent } from 'vue';

const LMap = defineAsyncComponent(() => import('vue3-leaflet').then(mod => mod.LMap));
const LTileLayer = defineAsyncComponent(() => import('vue3-leaflet').then(mod => mod.LTileLayer));
const LMarker = defineAsyncComponent(() => import('vue3-leaflet').then(mod => mod.LMarker));
const LPopup = defineAsyncComponent(() => import('vue3-leaflet').then(mod => mod.LPopup));


const eventsStore = useEventsStore();
const isClient = ref(false);
const events = computed(() => eventsStore.events);

// Объявляем переменные
const mapCenter = ref([64.6863136, 97.7453061]);
const russiaMapBounds = [
  [41.1852, 19.6389], // Юго-запад (Калининград)
  [81.8587, 179.2695], // Северо-восток (Чукотка)
];

onMounted(() => {
  isClient.value = true;
  eventsStore.fetchEvents();
});
</script>

<template>
  <div class="space-y-6">
    <div class="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
      <ClientOnly>
        <LMap
          v-if="isClient"
          ref="map"
          :zoom="4"
          :center="mapCenter"
          :options="{ maxBounds: russiaMapBounds, maxBoundsViscosity: 1.0, minZoom: 3, maxZoom: 10 }"
          class="h-full w-full"
        >
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LMarker v-for="event in events" :key="event.id" :lat-lng="[event.lat, event.lng]">
            <LPopup>
              <EventCard :event="event" is-modular />
            </LPopup>
          </LMarker>
        </LMap>
      </ClientOnly>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>


<style scoped>
.leaflet-container {
  width: 100%;
  height: 100%;
}
</style>