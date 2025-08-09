<template>
  <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input v-model="email" id="email" type="email" required
               class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
               :class="{ 'border-red-500': error }">
      </div>
      <div>
        <label for="password" class="text-sm font-medium text-gray-700">Contraseña</label>
        <input v-model="password" id="password" type="password" required
               class="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
               :class="{ 'border-red-500': error }">
      </div>
      <div v-if="error" class="text-sm text-red-600">
        {{ error }}
      </div>
      <div>
        <button type="submit" :disabled="loading"
                class="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
          <span v-if="loading">Ingresando...</span>
          <span v-else>Ingresar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const authStore = useAuthStore();
const router = useRouter();

async function handleLogin() {
  loading.value = true;
  error.value = null;
  try {
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}
</script>