<template>
  <div class="min-h-screen bg-gray-100 flex">
    <NavSidebar />
    <div class="flex-1 flex flex-col">
      <div class="bg-white shadow-sm p-4 flex justify-between items-center">
        <div class="flex items-center">
          <NavMobile />
          <h1 class="text-xl font-semibold text-gray-800 ml-2">{{ $route.name }}</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">Hola, {{ authStore.user?.nombre }}</span>
          <button @click="authStore.logout" class="text-sm font-medium text-red-600 hover:text-red-800">
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div class="px-6 pt-4">
        <NavBreadcrumbs />
      </div>
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import NavSidebar from '@/components/navegacion/NavSidebar.vue';
import NavMobile from '@/components/navegacion/NavMobile.vue';
import NavBreadcrumbs from '@/components/navegacion/NavBreadcrumbs.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>