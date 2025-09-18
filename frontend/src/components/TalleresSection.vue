<script setup>
import { useEventSearch } from '@/composables/useEventSearch';
import WorkshopCard from './ui/WorkshopCard.vue';

// Usamos el composable para obtener los eventos y filtros
const { events, loading, error, filters } = useEventSearch();

// Lista de categorías para el filtro
const categories = ['Música', 'Teatro', 'Danza', 'Cine', 'Taller', 'Exposición', 'Otro'];

</script>

<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-gray-800">Talleres y Cursos</h2>
      <p class="mt-4 text-lg text-center text-gray-600">Aprende algo nuevo y desarrolla tus habilidades.</p>

      <!-- Barra de Búsqueda y Filtros -->
      <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <input 
          type="text" 
          v-model="filters.q"
          placeholder="Buscar por nombre..."
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select 
          v-model="filters.category"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Grid de Resultados -->
      <div class="mt-10">
        <div v-if="loading" class="text-center">
          <p class="text-lg text-gray-500">Cargando eventos...</p>
          <!-- Podrías añadir un spinner aquí -->
        </div>
        
        <div v-else-if="error" class="text-center">
          <p class="text-red-500">Error al cargar: {{ error }}</p>
        </div>

        <div v-else-if="events.length === 0" class="text-center">
          <p class="text-lg text-gray-500">No se encontraron eventos con los filtros seleccionados.</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <WorkshopCard
            v-for="event in events" 
            :key="event._id"
            :image-url="event.portada_url || 'https://via.placeholder.com/600x400'"
            :title="event.nombre"
            :description="event.descripcion"
            :schedule="new Date(event.fecha_inicio).toLocaleDateString()"
          />
        </div>
      </div>

    </div>
  </section>
</template>
