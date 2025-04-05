<template>
  <div class="min-h-screen p-6">
    <h2 class="text-2xl mb-4">{{ event.title }}</h2>
    <div class="bg-dark-purple p-4 rounded">
      <p>{{ event.description }}</p>
      <p>Организатор: {{ event.organizer }}</p>
      <p>Формат: {{ event.format }}</p>
      <p>Место: {{ event.location }}</p>
      <p>Дата: {{ event.date }}</p>
      <p>Контакты: {{ event.contact }}</p>
      <button @click="registerForEvent" class="bg-light-purple p-2 mt-4 rounded">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const route = useRoute();
const event = ref({});

onMounted(async () => {
  const { data } = await $supabase.from('events').select('*').eq('id', route.params.id).single();
  event.value = data;
});

const registerForEvent = async () => {
  const user = $supabase.auth.user();
  await $supabase.from('user_events').insert({ user_id: user.id, event_id: route.params.id });
  alert('Вы зарегистрированы!');
};
</script>