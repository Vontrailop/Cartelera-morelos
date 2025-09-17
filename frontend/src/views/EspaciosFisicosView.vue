<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Espacios Físicos</h1>
    
    <!-- Navegación por pestañas para pantallas grandes y medianas -->
    <div class="hidden md:block">
      <NavTabs :tabs="tabs" />
    </div>
    
    <!-- Navegación por pestañas para pantallas pequeñas -->
    <div class="md:hidden mb-4">
      <NavTabsMobile :tabs="tabs" />
    </div>
    
    <!-- Contenido de la página -->
    <div class="mt-6">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavTabs from '@/components/navegacion/NavTabs.vue';
import NavTabsMobile from '@/components/navegacion/NavTabsMobile.vue';
import { 
  MapIcon, 
  CalendarIcon, 
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline';

// Definir las pestañas de navegación
const tabs = [
  {
    name: 'Listado',
    to: '/espacios-fisicos',
    icon: MapIcon
  },
  {
    name: 'Calendario',
    to: '/espacios-fisicos/calendario',
    icon: CalendarIcon
  },
  {
    name: 'Reservas',
    to: '/espacios-fisicos/reservas',
    icon: UserGroupIcon,
    count: 5 // Ejemplo de contador
  },
  {
    name: 'Estadísticas',
    to: '/espacios-fisicos/estadisticas',
    icon: ChartBarIcon
  }
];
</script>