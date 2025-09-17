<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <h3 class="font-medium text-lg mb-4">Filtros</h3>
    
    <!-- Búsqueda por texto -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
      <div class="relative">
        <input 
          v-model="filters.search" 
          type="text" 
          class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre, dirección..."
          @input="emitFilters"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Filtro por tipo -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
      <div class="space-y-2">
        <label v-for="type in typeOptions" :key="type.value" class="flex items-center">
          <input 
            type="checkbox" 
            v-model="filters.types" 
            :value="type.value" 
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            @change="emitFilters"
          />
          <span class="ml-2 text-sm text-gray-700">{{ type.label }}</span>
        </label>
      </div>
    </div>
    
    <!-- Filtro por categoría -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
      <select 
        v-model="filters.category" 
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @change="emitFilters"
      >
        <option value="">Todas las categorías</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.nombre }}
        </option>
      </select>
    </div>
    
    <!-- Filtro por distancia -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Distancia: {{ filters.distance }} km
      </label>
      <input 
        v-model="filters.distance" 
        type="range" 
        min="1" 
        max="20" 
        step="1" 
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        @change="emitFilters"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>1 km</span>
        <span>20 km</span>
      </div>
    </div>
    
    <!-- Filtro por fecha -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
      <input 
        v-model="filters.date" 
        type="date" 
        class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @change="emitFilters"
      />
    </div>
    
    <!-- Botones de acción -->
    <div class="flex space-x-2">
      <button 
        @click="resetFilters" 
        class="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
      >
        Limpiar filtros
      </button>
      <button 
        @click="emitFilters" 
        class="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
      >
        Aplicar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  },
  availableCategories: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['update:filters']);

// Opciones de tipo
const typeOptions = [
  { label: 'Espacios Físicos', value: 'espacio' },
  { label: 'Actividades', value: 'actividad' },
  { label: 'Espacios Publicitarios', value: 'publicidad' },
  { label: 'Puntos de Interés', value: 'poi' }
];

// Categorías disponibles
const categories = ref(props.availableCategories.length ? props.availableCategories : [
  { id: 1, nombre: 'Cultura' },
  { id: 2, nombre: 'Deporte' },
  { id: 3, nombre: 'Educación' },
  { id: 4, nombre: 'Entretenimiento' },
  { id: 5, nombre: 'Gastronomía' }
]);

// Estado de los filtros
const filters = reactive({
  search: '',
  types: ['espacio', 'actividad', 'publicidad', 'poi'],
  category: '',
  distance: 5,
  date: '',
  ...props.initialFilters
});

// Inicializar filtros
onMounted(() => {
  // Si hay filtros iniciales, aplicarlos
  if (Object.keys(props.initialFilters).length) {
    Object.assign(filters, props.initialFilters);
  }
});

// Emitir cambios en los filtros
const emitFilters = () => {
  emit('update:filters', { ...filters });
};

// Restablecer filtros a valores predeterminados
const resetFilters = () => {
  filters.search = '';
  filters.types = ['espacio', 'actividad', 'publicidad', 'poi'];
  filters.category = '';
  filters.distance = 5;
  filters.date = '';
  emitFilters();
};
</script>