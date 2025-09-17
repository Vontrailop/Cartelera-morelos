<template>
  <nav class="w-64 bg-white shadow-md p-4 flex flex-col h-screen">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Cartelera Morelos</h1>
    </div>
    
    <div class="flex-1">
      <ul class="space-y-2">
        <li v-for="item in navItems" :key="item.path">
          <router-link 
            :to="item.path" 
            class="flex items-center p-2 rounded-lg" 
            :class="[$route.path.startsWith(item.path) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100']">
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  DocumentIcon,
  ComputerDesktopIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const navItems = ref([
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Pedidos', path: '/pedidos', icon: ClipboardDocumentListIcon },
  { name: 'Cotizaciones', path: '/cotizaciones', icon: DocumentTextIcon },
  { name: 'Contratos', path: '/contratos', icon: DocumentIcon },
]);

// Add Equipos menu item only for admin and collaborator roles
if (authStore.isAdmin || authStore.isCollaborator) {
  navItems.value.push({ name: 'Equipos', path: '/equipos', icon: ComputerDesktopIcon });
}
</script>