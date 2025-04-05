<template>
  <div class="space-y-6 max-w-md mx-auto mt-12">
    <h2 class="text-2xl font-semibold tracking-tight">Вход</h2>
    <form @submit.prevent="login" class="card space-y-4">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');

onMounted(() => authStore.initAuth());

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    navigateTo(`/profile/${authStore.user.role}`);
  } catch (err) {
    error.value = err.message;
  }
};
</script>