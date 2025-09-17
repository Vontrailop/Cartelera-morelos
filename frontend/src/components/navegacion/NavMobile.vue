<template>
  <div class="md:hidden">
    <!-- Botón para abrir el menú móvil -->
    <button 
      @click="isOpen = true" 
      class="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
      </svg>
    </button>

    <!-- Overlay del menú móvil -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-40 bg-black bg-opacity-50"
      @click="isOpen = false"
    ></div>

    <!-- Menú móvil -->
    <div 
      v-if="isOpen" 
      class="fixed top-0 left-0 z-50 w-64 h-screen overflow-y-auto bg-white transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Encabezado del menú móvil -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">Cartelera Morelos</h2>
        <button 
          @click="isOpen = false" 
          class="p-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <!-- Contenido del menú móvil -->
      <div class="py-4 overflow-y-auto">
        <ul class="space-y-2 px-3">
          <li v-for="(item, index) in navigationItems" :key="item.path || item.name || `nav-item-${index}`">
            <!-- Elemento de navegación principal -->
            <template v-if="!item.children">
              <router-link 
                :to="item.path" 
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                :class="{ 'bg-gray-100': isActive(item.path) }"
                @click="isOpen = false"
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
                    @click="isOpen = false"
                  >
                    <span class="ml-3">{{ child.name }}</span>
                  </router-link>
                </li>
              </ul>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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
const isOpen = ref(false);
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