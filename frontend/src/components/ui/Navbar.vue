<template>
  <aside class="w-64 bg-gray-800 text-white flex flex-col">
    <div class="h-16 flex items-center justify-center text-2xl font-bold">
      TBlackbox
    </div>
    <nav class="flex-1 px-2 py-4 space-y-2">
      <router-link v-for="item in filteredMenu" :key="item.name" :to="item.path" class="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700" active-class="bg-gray-900">
        <component :is="item.icon" class="h-6 w-6 mr-3" />
        {{ item.name }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { 
  HomeIcon, 
  ClipboardListIcon, 
  DocumentTextIcon, 
  CollectionIcon, 
  BellIcon, 
  PlusCircleIcon 
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['Administrador', 'Cliente', 'Colaborador'] },
  { name: 'Pedidos', path: '/pedidos', icon: ClipboardListIcon, roles: ['Administrador', 'Cliente', 'Colaborador'] },
  { name: 'Crear Pedido', path: '/pedidos/crear', icon: PlusCircleIcon, roles: ['Cliente', 'Administrador'] },
  { name: 'Cotizaciones', path: '/cotizaciones', icon: DocumentTextIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Contratos', path: '/contratos', icon: DocumentTextIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Equipos', path: '/equipos', icon: CollectionIcon, roles: ['Administrador', 'Colaborador'] },
  { name: 'Notificaciones', path: '/notificaciones', icon: BellIcon, roles: ['Administrador'] },
];

const filteredMenu = computed(() => {
  if (!authStore.user) return [];
  return menuItems.filter(item => item.roles.includes(authStore.user.rol));
});
</script>