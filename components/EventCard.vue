<template>
  <div
    class="card hover:shadow-xl transition-shadow duration-300"
    :class="{ 'w-64': isModular }"
  >
    <h3 class="text-xl font-semibold text-white tracking-tight">{{ event.title }}</h3>
    <p class="mt-2 text-gray-300 text-sm leading-relaxed">{{ event.description }}</p>
    <div class="mt-3 space-y-1 text-gray-400 text-sm">
      <p>{{ formatDate(event.date) }} | {{ event.location }}</p>
      <p>Организатор: {{ event.organizer }}</p>
      <p v-if="!isModular">Формат: {{ event.format }}</p>
    </div>
    <button
      v-if="!isModular"
      class="mt-4 w-full text-center"
      @click="$emit('register', event.id)"
    >
      Зарегистрироваться
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps(['event', 'isModular']);

const formatDate = (date) => {
  return new Date(date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<style scoped>
.card {
  background: linear-gradient(135deg, #2a0047 0%, #3b0066 100%);
}
</style>