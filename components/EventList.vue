<template>
  <div>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup>
defineProps(['events']);
</script>