<template>
  <div class="space-y-6 max-w-md mx-auto mt-12">
    <h2 class="text-2xl font-semibold tracking-tight">Регистрация</h2>
    <form @submit.prevent="register" class="card space-y-4">
      <input v-model="email" placeholder="Email" required />
      <input v-model="name" placeholder="Имя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <select v-model="role" required>
        <option value="participant">Участник</option>
        <option value="organizer">Организатор</option>
      </select>
      <button type="submit">Зарегистрироваться</button>
      <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const email = ref('');
const name = ref('');
const password = ref('');
const role = ref('participant');
const error = ref('');

onMounted(() => authStore.initAuth());

const register = async () => {
  try {
    await authStore.register(email.value, name.value, password.value, role.value);
    navigateTo(`/profile/${role.value}`);
  } catch (err) {
    error.value = err.message;
  }
};
</script>