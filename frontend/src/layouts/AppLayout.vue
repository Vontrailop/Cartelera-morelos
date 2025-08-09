<template>
  <div class="min-h-screen bg-gray-100 flex">
    <Navbar />
    <div class="flex-1 flex flex-col">
      <header class="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-800">{{ $route.name }}</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Hola, {{ authStore.user?.nombre }}</span>
          <button @click="authStore.logout" class="text-sm font-medium text-red-600 hover:text-red-800">
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>