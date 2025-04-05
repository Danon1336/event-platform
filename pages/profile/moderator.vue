<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold tracking-tight">Личный кабинет модератора</h2>
    <div class="card">
      <p>Имя: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <EventList :events="events" />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { useEventsStore } from '~/stores/events';

const authStore = useAuthStore();
const eventsStore = useEventsStore();
const user = computed(() => authStore.user);
const events = computed(() => eventsStore.events);
</script>