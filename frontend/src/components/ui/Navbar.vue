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
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  RectangleStackIcon, 
  BellIcon, 
  PlusCircleIcon,
  MapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  PhotoIcon,
  CurrencyDollarIcon,
  TagIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon, roles: ['Administrador', 'Cliente', 'Colaborador', 'Gestor'] },
  { name: 'Mapa', path: '/mapa', icon: MapIcon, roles: ['Administrador', 'Cliente', 'Colaborador', 'Gestor'] },
  { name: 'Mapa de Navegación', path: '/mapa-navegacion', icon: MapPinIcon, roles: ['Administrador', 'Cliente', 'Colaborador', 'Gestor'] },
  { name: 'Espacios Físicos', path: '/espacios-fisicos', icon: BuildingOfficeIcon, roles: ['Administrador', 'Gestor'] },
  { name: 'Actividades', path: '/actividades', icon: CalendarIcon, roles: ['Administrador', 'Gestor', 'Cliente'] },
  { name: 'Espacios Publicitarios', path: '/espacios-publicitarios', icon: PhotoIcon, roles: ['Administrador', 'Gestor', 'Cliente'] },
  { name: 'Rentas Publicitarias', path: '/rentas-publicitarias', icon: DocumentTextIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Pagos', path: '/pagos', icon: CurrencyDollarIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Categorías', path: '/categorias', icon: TagIcon, roles: ['Administrador', 'Gestor'] },
  { name: 'Pedidos', path: '/pedidos', icon: ClipboardDocumentListIcon, roles: ['Administrador', 'Cliente', 'Colaborador'] },
  { name: 'Crear Pedido', path: '/pedidos/crear', icon: PlusCircleIcon, roles: ['Cliente', 'Administrador'] },
  { name: 'Cotizaciones', path: '/cotizaciones', icon: DocumentTextIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Contratos', path: '/contratos', icon: DocumentTextIcon, roles: ['Administrador', 'Cliente'] },
  { name: 'Equipos', path: '/equipos', icon: RectangleStackIcon, roles: ['Administrador', 'Colaborador'] },
  { name: 'Notificaciones', path: '/notificaciones', icon: BellIcon, roles: ['Administrador'] },
];

const filteredMenu = computed(() => {
  if (!authStore.user) return [];
  return menuItems.filter(item => item.roles.includes(authStore.user.rol));
});
</script>