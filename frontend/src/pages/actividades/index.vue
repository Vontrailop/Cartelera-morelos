<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Actividades Culturales</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar actividades..." 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todas las categorías</option>
          <option>Música</option>
          <option>Teatro</option>
          <option>Danza</option>
          <option>Exposición</option>
          <option>Cine</option>
        </select>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Buscar
        </button>
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Nueva Actividad
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="h-48 bg-gray-200">
          <img src="https://via.placeholder.com/400x200" alt="Actividad" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold">Actividad Cultural {{ i }}</h3>
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Música</span>
          </div>
          <p class="text-sm text-gray-600 mt-2">Fecha: {{ new Date().toLocaleDateString() }}</p>
          <p class="text-sm text-gray-600">Lugar: Centro Cultural #{{ i }}</p>
          <p class="mt-2 text-gray-700 line-clamp-2">Descripción breve de la actividad cultural que se realizará en este espacio.</p>
          <div class="mt-4 flex justify-between items-center">
            <button class="text-blue-600 hover:text-blue-900">Ver detalles</button>
            <div class="flex gap-2">
              <button class="text-green-600 hover:text-green-900">Editar</button>
              <button class="text-red-600 hover:text-red-900">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica para gestionar actividades culturales
</script>