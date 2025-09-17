<template>
  <div class="mapa-navegacion-page">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Mapa de Navegación</h1>
          <p class="text-gray-600 mb-6">
            Esta página muestra la estructura completa del sistema Cartelera Morelos, permitiéndote
            entender la organización de los diferentes módulos y cómo navegar entre ellos.
          </p>
          
          <div class="border-t border-gray-200 pt-6">
            <MapaNavegacion />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MapaNavegacion from '../components/navegacion/MapaNavegacion.vue';
</script>

<style scoped>
.mapa-navegacion-page {
  min-height: calc(100vh - 64px); /* Ajustar según la altura del header */
  background-color: #f9fafb;
}
</style>