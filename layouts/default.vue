<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gradient-to-r from-purple-900 to-purple-800 p-4 flex justify-between items-center shadow-md">
      <h1 class="text-xl font-semibold tracking-tight">Event Platform</h1>
      <nav class="space-x-6">
        <NuxtLink to="/" class="text-gray-200 hover:text-white transition-colors">Главная</NuxtLink>
        <NuxtLink v-if="!user" to="/login" class="text-gray-200 hover:text-white transition-colors">Войти</NuxtLink>
        <NuxtLink v-if="!user" to="/register" class="text-gray-200 hover:text-white transition-colors">Регистрация</NuxtLink>
        <NuxtLink v-if="user" :to="`/profile/${user.role}`" class="text-gray-200 hover:text-white transition-colors">
          {{ user.name }}
        </NuxtLink>
        <button v-if="user" @click="logout" class="text-gray-200 hover:text-white transition-colors">Выйти</button>
      </nav>
    </header>
    <main class="flex-1 p-6">
      <slot />
    </main>
    <footer class="bg-gradient-to-r from-purple-900 to-purple-800 p-4 text-center text-gray-400 text-sm">
      © 2025 Event Platform
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

onMounted(() => {
  authStore.initAuth(); // Инициализируем данные на клиенте
});

const logout = () => {
  authStore.logout();
  navigateTo('/login');
};
</script>