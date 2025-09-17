<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Categorías</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar categorías..." 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Buscar
        </button>
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Nueva Categoría
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(categoria, i) in categorias" :key="i" class="bg-white rounded-lg shadow p-4 flex items-center justify-between">
        <div class="flex items-center">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center mr-4"
            :style="{ backgroundColor: categoria.color + '33', color: categoria.color }"
          >
            <span class="text-lg">{{ categoria.icono }}</span>
          </div>
          <div>
            <h3 class="font-medium">{{ categoria.nombre }}</h3>
            <p class="text-sm text-gray-500">{{ categoria.actividades }} actividades</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="text-blue-600 hover:text-blue-900">Editar</button>
          <button class="text-red-600 hover:text-red-900">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categorias = ref([
  { nombre: 'Música', actividades: 24, color: '#3B82F6', icono: '🎵' },
  { nombre: 'Teatro', actividades: 18, color: '#10B981', icono: '🎭' },
  { nombre: 'Danza', actividades: 12, color: '#F59E0B', icono: '💃' },
  { nombre: 'Exposición', actividades: 15, color: '#8B5CF6', icono: '🖼️' },
  { nombre: 'Cine', actividades: 20, color: '#EF4444', icono: '🎬' },
  { nombre: 'Literatura', actividades: 8, color: '#6366F1', icono: '📚' },
  { nombre: 'Gastronomía', actividades: 10, color: '#EC4899', icono: '🍽️' },
  { nombre: 'Artesanía', actividades: 6, color: '#F97316', icono: '🧶' },
  { nombre: 'Fotografía', actividades: 9, color: '#14B8A6', icono: '📷' },
]);
</script>