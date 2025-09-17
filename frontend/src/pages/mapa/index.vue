<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Mapa Interactivo</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar ubicación..." 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todas las categorías</option>
          <option>Espacios Físicos</option>
          <option>Actividades</option>
          <option>Espacios Publicitarios</option>
        </select>
        <input 
          type="date" 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Filtrar
        </button>
      </div>
    </div>
    
    <div class="flex h-[calc(100vh-200px)]">
      <!-- Mapa -->
      <div class="w-3/4 bg-gray-200 rounded-lg overflow-hidden relative">
        <!-- Aquí se integrará Google Maps -->
        <div class="absolute inset-0 flex items-center justify-center">
          <p class="text-gray-500">Mapa de Google se cargará aquí</p>
        </div>
        
        <!-- Controles del mapa -->
        <div class="absolute top-4 right-4 bg-white rounded-lg shadow p-2 flex flex-col gap-2">
          <button class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
            <span>+</span>
          </button>
          <button class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200">
            <span>-</span>
          </button>
        </div>
      </div>
      
      <!-- Panel lateral -->
      <div class="w-1/4 bg-white rounded-lg ml-4 p-4 overflow-y-auto">
        <h3 class="font-medium mb-4">Resultados (8)</h3>
        
        <div class="space-y-4">
          <div v-for="i in 8" :key="i" class="border-b pb-4 last:border-b-0">
            <div class="flex items-center mb-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                :class="{
                  'bg-blue-100 text-blue-600': i % 3 === 0,
                  'bg-green-100 text-green-600': i % 3 === 1,
                  'bg-amber-100 text-amber-600': i % 3 === 2,
                }"
              >
                <span>{{ i }}</span>
              </div>
              <h4 class="font-medium">
                {{ 
                  i % 3 === 0 ? 'Espacio Cultural ' + i : 
                  i % 3 === 1 ? 'Actividad ' + i : 
                  'Espacio Publicitario ' + i 
                }}
              </h4>
            </div>
            <p class="text-sm text-gray-500 mb-1">
              {{ i % 2 === 0 ? 'Calle Principal #' + (i * 100) : 'Avenida Central #' + (i * 50) }}, Cuernavaca
            </p>
            <p class="text-sm text-gray-500 mb-2">
              {{ new Date().toLocaleDateString() }}
            </p>
            <button class="text-sm text-blue-600 hover:text-blue-800">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica para el mapa interactivo con Google Maps + Geocode API
</script>