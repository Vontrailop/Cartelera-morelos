<template>
  <aside class="w-64 h-screen bg-white border-r border-gray-200 hidden md:block">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800">Cartelera Morelos</h2>
    </div>
    <div class="py-4 overflow-y-auto">
      <ul class="space-y-2 px-3">
        <li v-for="(item, index) in navigationItems" :key="item.path || item.name || `nav-item-${index}`">
          <!-- Elemento de navegación principal -->
          <template v-if="!item.children">
            <router-link 
              :to="item.path" 
              class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              :class="{ 'bg-gray-100': isActive(item.path) }"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span class="ml-3">{{ item.name }}</span>
            </router-link>
          </template>
          
          <!-- Elemento de navegación con submenú -->
          <template v-else>
            <button 
              type="button" 
              class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
              :class="{ 'bg-gray-100': isSubmenuOpen(item.name) }"
              @click="toggleSubmenu(item.name)"
            >
              <component :is="item.icon" class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
              <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ item.name }}</span>
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button>
            <ul v-show="isSubmenuOpen(item.name)" class="py-2 space-y-2 pl-4">
              <li v-for="(child, childIndex) in item.children" :key="child.path || `${item.name}-child-${child.name || childIndex}`">
                <router-link 
                  :to="child.path" 
                  class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  :class="{ 'bg-gray-100': isActive(child.path) }"
                >
                  <span class="ml-3">{{ child.name }}</span>
                </router-link>
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  HomeIcon, 
  CalendarIcon, 
  MapIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  DocumentTextIcon,
  BellIcon,
  CogIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const openSubmenus = ref([]);

// Estructura de navegación con secciones y subsecciones
const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Espacios',
    icon: MapIcon,
    children: [
      {
        name: 'Espacios Físicos',
        path: '/espacios-fisicos'
      },
      {
        name: 'Espacios Publicitarios',
        path: '/espacios-publicitarios'
      }
    ]
  },
  {
    name: 'Actividades',
    path: '/actividades',
    icon: CalendarIcon
  },
  {
    name: 'Comercial',
    icon: CurrencyDollarIcon,
    children: [
      {
        name: 'Rentas Publicitarias',
        path: '/rentas-publicitarias'
      },
      {
        name: 'Pagos',
        path: '/pagos'
      },
      {
        name: 'Cotizaciones',
        path: '/cotizaciones'
      },
      {
        name: 'Contratos',
        path: '/contratos'
      }
    ]
  },
  {
    name: 'Usuarios',
    path: '/usuarios',
    icon: UserGroupIcon
  },
  {
    name: 'Documentos',
    path: '/documentos',
    icon: DocumentTextIcon
  },
  {
    name: 'Navegación',
    icon: MapPinIcon,
    children: [
      {
        name: 'Mapa Interactivo',
        path: '/mapa'
      },
      {
        name: 'Mapa de Navegación',
        path: '/mapa-navegacion'
      }
    ]
  },
  {
    name: 'Notificaciones',
    path: '/notificaciones',
    icon: BellIcon
  },
  {
    name: 'Configuración',
    path: '/configuracion',
    icon: CogIcon
  }
];

// Verificar si una ruta está activa
const isActive = (path) => {
  return route.path === path || route.path.startsWith(`${path}/`);
};

// Verificar si un submenú está abierto
const isSubmenuOpen = (name) => {
  return openSubmenus.value.includes(name);
};

// Alternar el estado de un submenú
const toggleSubmenu = (name) => {
  if (isSubmenuOpen(name)) {
    openSubmenus.value = openSubmenus.value.filter(item => item !== name);
  } else {
    openSubmenus.value.push(name);
  }
};

// Abrir automáticamente el submenú que contiene la ruta actual
const initializeOpenSubmenus = () => {
  navigationItems.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(child => isActive(child.path));
      if (hasActiveChild && !isSubmenuOpen(item.name)) {
        openSubmenus.value.push(item.name);
      }
    }
  });
};

// Inicializar submenús abiertos
initializeOpenSubmenus();
</script>