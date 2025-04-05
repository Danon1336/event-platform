import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    users: [], // Изначально пустой массив, заполним на клиенте
  }),
  actions: {
    initAuth() {
      // Проверяем, что мы на клиенте
      if (process.client) {
        const storedUsers = localStorage.getItem('users');
        this.users = storedUsers
          ? JSON.parse(storedUsers)
          : [{ email: 'admin@example.com', password: 'admin123', name: 'Admin', role: 'moderator' }];
        
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          this.user = JSON.parse(savedUser);
        }
      }
    },
    register(email, name, password, role) {
      if (this.users.find((u) => u.email === email)) {
        throw new Error('Пользователь уже существует');
      }
      const newUser = { email, name, password, role };
      this.users.push(newUser);
      if (process.client) {
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      this.user = newUser;
    },
    login(email, password) {
      const user = this.users.find((u) => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Неверный email или пароль');
      }
      this.user = user;
      if (process.client) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    },
    logout() {
      this.user = null;
      if (process.client) {
        localStorage.removeItem('currentUser');
      }
    },
    loadUser() {
      if (process.client) {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          this.user = JSON.parse(savedUser);
        }
      }
    },
  },
});