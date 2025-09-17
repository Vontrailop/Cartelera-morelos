<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Espacios Publicitarios</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar espacios publicitarios..." 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todos los tipos</option>
          <option>Digital</option>
          <option>Físico</option>
        </select>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Buscar
        </button>
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Nuevo Espacio Publicitario
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="h-48 bg-gray-200">
          <img src="https://via.placeholder.com/400x200" alt="Espacio Publicitario" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold">Espacio Publicitario {{ i }}</h3>
            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
              {{ i % 2 === 0 ? 'Digital' : 'Físico' }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            Dimensiones: {{ i % 2 === 0 ? '1920x1080 px' : '3x2 metros' }}
          </p>
          <p class="text-sm text-gray-600">
            Ubicación: {{ i % 2 === 0 ? 'Página principal' : 'Centro Cultural #' + i }}
          </p>
          <p class="mt-2 text-gray-700 line-clamp-2">
            Descripción del espacio publicitario disponible para renta.
          </p>
          <div class="mt-4 flex justify-between items-center">
            <div class="text-lg font-bold text-green-600">${{ i * 1000 }} MXN</div>
            <div class="flex gap-2">
              <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                Ver detalles
              </button>
              <button class="bg-amber-500 text-white px-3 py-1 rounded hover:bg-amber-600 text-sm">
                Rentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica para gestionar espacios publicitarios
</script>