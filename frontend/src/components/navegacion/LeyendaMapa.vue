<template>
  <div class="leyenda-mapa p-4 bg-white rounded-lg shadow-md" :class="{ 'dark-theme': temaOscuro }">
    <h3 class="text-lg font-semibold mb-3">Leyenda del Mapa</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Iconos de módulos -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-2">Iconos de Módulos</h4>
        <ul class="space-y-2">
          <li v-for="(item, index) in iconosModulos" :key="item.nombre || `icono-${index}`" class="flex items-center">
            <span class="inline-flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-gray-100">
              <i :class="[item.icono, 'text-primary']"></i>
            </span>
            <span>{{ item.nombre }}</span>
          </li>
        </ul>
      </div>
      
      <!-- Colores de estado -->
      <div>
        <h4 class="text-sm font-medium text-gray-500 mb-2">Colores de Estado</h4>
        <ul class="space-y-2">
          <li v-for="(item, index) in coloresEstado" :key="item.nombre || `estado-${index}`" class="flex items-center">
            <span class="inline-block w-4 h-4 mr-2 rounded-full" :style="{ backgroundColor: item.color }"></span>
            <span>{{ item.nombre }}</span>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Tipos de conexiones -->
    <div class="mt-4">
      <h4 class="text-sm font-medium text-gray-500 mb-2">Tipos de Conexiones</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(item, index) in tiposConexiones" :key="item.nombre || `conexion-${index}`" class="flex items-center">
          <div class="w-12 h-6 mr-2 flex items-center justify-center">
            <div :class="item.clase"></div>
          </div>
          <span>{{ item.nombre }}</span>
        </div>
      </div>
    </div>
    
    <!-- Notas adicionales -->
    <div class="mt-4 pt-4 border-t border-gray-200">
      <h4 class="text-sm font-medium text-gray-500 mb-2">Notas</h4>
      <ul class="text-sm text-gray-600 space-y-1">
        <li>• Los módulos principales se muestran en la vista de árbol con color destacado.</li>
        <li>• Las conexiones indican relaciones de navegación entre páginas.</li>
        <li>• Los flujos muestran secuencias típicas de uso del sistema.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  temaOscuro: {
    type: Boolean,
    default: false
  }
});

// Datos de iconos de módulos
const iconosModulos = [
  { nombre: 'Inicio', icono: 'fas fa-home' },
  { nombre: 'Espacios Físicos', icono: 'fas fa-map-marker-alt' },
  { nombre: 'Actividades', icono: 'fas fa-calendar-alt' },
  { nombre: 'Espacios Publicitarios', icono: 'fas fa-ad' },
  { nombre: 'Rentas Publicitarias', icono: 'fas fa-handshake' },
  { nombre: 'Pagos', icono: 'fas fa-money-bill-wave' },
  { nombre: 'Categorías', icono: 'fas fa-tags' },
  { nombre: 'Mapa Interactivo', icono: 'fas fa-map' },
  { nombre: 'Usuarios', icono: 'fas fa-users' }
];

// Datos de colores de estado
const coloresEstado = [
  { nombre: 'Módulo Principal', color: '#4f46e5' },
  { nombre: 'Submódulo', color: '#f3f4f6' },
  { nombre: 'Inicio de Flujo', color: '#10b981' },
  { nombre: 'Fin de Flujo', color: '#4f46e5' },
  { nombre: 'Paso Intermedio', color: '#f3f4f6' }
];

// Datos de tipos de conexiones
const tiposConexiones = [
  { 
    nombre: 'Navegación Directa', 
    clase: 'h-0.5 w-full bg-gray-400'
  },
  { 
    nombre: 'Flujo de Proceso', 
    clase: 'h-0.5 w-full bg-primary'
  },
  { 
    nombre: 'Relación Jerárquica', 
    clase: 'h-4 border-l-2 border-b-2 w-6 border-gray-400'
  },
  { 
    nombre: 'Acción del Usuario', 
    clase: 'h-0.5 w-full bg-gray-400 border-dashed border-t-2'
  }
];
</script>

<style scoped>
.leyenda-mapa {
  max-width: 100%;
}

.dark-theme {
  background-color: #1f2937;
  color: #f3f4f6;
}

.dark-theme h3,
.dark-theme h4 {
  color: #e5e7eb;
}

.dark-theme .text-gray-500 {
  color: #9ca3af;
}

.dark-theme .text-gray-600 {
  color: #d1d5db;
}

.dark-theme .border-gray-200 {
  border-color: #374151;
}

.dark-theme .bg-gray-100 {
  background-color: #374151;
}
</style>