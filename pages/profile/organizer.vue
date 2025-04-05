<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold tracking-tight">Личный кабинет организатора</h2>
    <div class="card">
      <p>Имя: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
    <h3 class="text-xl font-semibold">Создать мероприятие</h3>
    <form @submit.prevent="createEvent" class="card space-y-4">
      <input v-model="event.title" placeholder="Название" required />
      <textarea v-model="event.description" placeholder="Описание" required />
      <input v-model="event.location" placeholder="Место" required />
      <input v-model="event.date" type="datetime-local" required />
      <select v-model="event.format" required>
        <option value="online">Онлайн</option>
        <option value="offline">Офлайн</option>
      </select>
      <input v-model="event.lat" type="number" step="0.0001" placeholder="Широта (41-81)" min="41" max="81" required />
      <input v-model="event.lng" type="number" step="0.0001" placeholder="Долгота (19-179)" min="19" max="179" required />
      <input v-model="event.contact" placeholder="Контакты" required />
      <button type="submit">Создать</button>
    </form>
    <EventList :events="events" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useEventsStore } from '~/stores/events';

const authStore = useAuthStore();
const eventsStore = useEventsStore();
const user = computed(() => authStore.user);
const events = computed(() => eventsStore.events.filter((e) => e.organizer === user.value.name));
const event = ref({
  title: '',
  description: '',
  location: '',
  date: '',
  format: 'offline',
  lat: '',
  lng: '',
  contact: '',
});

const createEvent = () => {
  const lat = parseFloat(event.value.lat);
  const lng = parseFloat(event.value.lng);
  if (lat < 41 || lat > 81 || lng < 19 || lng > 179) {
    alert('Координаты должны быть в пределах России!');
    return;
  }
  eventsStore.events.push({
    id: Date.now().toString(),
    ...event.value,
    lat,
    lng,
    organizer: user.value.name,
    status: 'approved',
  });
  event.value = { title: '', description: '', location: '', date: '', format: 'offline', lat: '', lng: '', contact: '' };
};
</script>