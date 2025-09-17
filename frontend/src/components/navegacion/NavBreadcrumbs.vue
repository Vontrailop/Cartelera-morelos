<template>
  <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li class="inline-flex items-center">
        <router-link to="/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
          </svg>
          Inicio
        </router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path || `crumb-${crumb.name}-${index}`">
        <div class="flex items-center">
          <svg class="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <router-link 
            v-if="crumb.path && index < breadcrumbs.length - 1" 
            :to="crumb.path" 
            class="ml-1 text-sm font-medium text-gray-700 hover:text-primary md:ml-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ crumb.name }}
          </router-link>
          <span 
            v-else 
            class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
          >
            {{ crumb.name }}
          </span>
        </div>
      </li>
    </ol>
    
    <!-- Menú desplegable para navegación rápida -->
    <div v-if="showQuickNav && quickNavItems.length > 0" class="ml-auto">
      <NavDropdown 
        buttonText="Navegación Rápida" 
        :items="quickNavItems" 
        buttonClass="text-xs bg-transparent hover:bg-gray-100 text-gray-600 py-1 px-2 rounded-md dark:text-gray-400 dark:hover:bg-gray-700"
      />
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavDropdown from './NavDropdown.vue';

const props = defineProps({
  showQuickNav: {
    type: Boolean,
    default: true
  }
});

const route = useRoute();

// Mapeo de rutas a nombres más amigables
const routeNameMapping = {
  'dashboard': 'Dashboard',
  'espacios-fisicos': 'Espacios Físicos',
  'actividades': 'Actividades',
  'espacios-publicitarios': 'Espacios Publicitarios',
  'rentas-publicitarias': 'Rentas Publicitarias',
  'pagos': 'Pagos',
  'categorias': 'Categorías',
  'mapa': 'Mapa Interactivo',
  'mapa-navegacion': 'Mapa de Navegación',
  'usuarios': 'Usuarios',
  'pedidos': 'Pedidos',
  'cotizaciones': 'Cotizaciones',
  'contratos': 'Contratos',
  'equipos': 'Equipos',
  'notificaciones': 'Notificaciones',
  'crear': 'Crear',
  'editar': 'Editar',
  'detalle': 'Detalle',
  'documentos': 'Documentos',
  'configuracion': 'Configuración',
};

// Función para obtener el nombre amigable de una ruta
const getRouteName = (path) => {
  const segment = path.split('/').pop();
  return routeNameMapping[segment] || segment;
};

// Generar las migas de pan basadas en la ruta actual
const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(segment => segment);
  
  // Si estamos en el dashboard, no mostramos migas de pan adicionales
  if (pathSegments.length === 1 && pathSegments[0] === 'dashboard') {
    return [];
  }
  
  // Construir las migas de pan
  return pathSegments.map((segment, index) => {
    // Construir la ruta acumulativa
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    
    // Determinar si es un ID (para rutas dinámicas)
    const isId = segment.match(/^[0-9a-fA-F]{24}$/) || segment.match(/^\d+$/);
    
    // Si es un ID, intentamos obtener un nombre más descriptivo
    let name = isId ? 'Detalle' : getRouteName(segment);
    
    // Para rutas dinámicas con parámetros
    if (segment.startsWith(':') || segment === route.params.id) {
      name = 'Detalle';
    }
    
    return { name, path };
  });
});

// Elementos de navegación rápida
const quickNavItems = computed(() => {
  // Secciones principales de la aplicación
  return [
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Espacios Físicos', to: '/espacios-fisicos' },
    { text: 'Espacios Publicitarios', to: '/espacios-publicitarios' },
    { text: 'Actividades', to: '/actividades' },
    { text: 'Usuarios', to: '/usuarios' },
    { text: 'Mapa de Navegación', to: '/mapa-navegacion' },
    { divider: true },
    { text: 'Configuración', to: '/configuracion' },
  ];
});
</script>