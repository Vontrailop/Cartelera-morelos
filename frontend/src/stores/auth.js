
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import users from '@/data/users.json';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.rol === 'Administrador');
  const isClient = computed(() => user.value?.rol === 'Cliente');
  const isCollaborator = computed(() => user.value?.rol === 'Colaborador');

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          user.value = foundUser;
          resolve(foundUser);
        } else {
          reject('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      }, 1000);
    });
  }

  function logout() {
    user.value = null;
    router.push('/login');
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isClient,
    isCollaborator,
    login,
    logout,
  };
});
