<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Prueba de Mapa con API Key</h1>
    
    <div class="mb-4">
      <p class="text-gray-700 mb-2">
        Esta es una prueba del componente de mapa utilizando la API Key de Google Maps proporcionada.
      </p>
    </div>
    
    <div class="border rounded-lg overflow-hidden">
      <MapaInteractivo 
        :initial-center="{ lat: 18.9242, lng: -99.2216 }" 
        :initial-zoom="13"
        :markers="testMarkers"
        @marker-click="handleMarkerClick"
        @map-click="handleMapClick"
      />
    </div>
    
    <div class="mt-4 p-4 bg-white border rounded-lg">
      <h2 class="text-lg font-semibold mb-2">Eventos del mapa</h2>
      <div v-if="lastEvent" class="p-3 bg-gray-50 rounded">
        <p><strong>Último evento:</strong> {{ lastEvent.type }}</p>
        <pre class="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">{{ JSON.stringify(lastEvent.data, null, 2) }}</pre>
      </div>
      <p v-else class="text-gray-500">Haz clic en el mapa o en un marcador para ver información del evento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MapaInteractivo from '../components/mapa/MapaInteractivo.vue';

// Marcadores de prueba
const testMarkers = [
  {
    id: 1,
    lat: 18.9242,
    lng: -99.2216,
    title: 'Centro de Cuernavaca',
    type: 'Espacios Físicos',
    info: 'Centro histórico de Cuernavaca'
  },
  {
    id: 2,
    lat: 18.9342,
    lng: -99.2316,
    title: 'Parque Ecológico',
    type: 'Puntos de Interés',
    info: 'Parque con áreas verdes y actividades recreativas'
  },
  {
    id: 3,
    lat: 18.9142,
    lng: -99.2116,
    title: 'Teatro de la Ciudad',
    type: 'Actividades',
    info: 'Teatro principal para eventos culturales'
  }
];

// Estado para mostrar eventos
const lastEvent = ref(null);

// Manejadores de eventos
const handleMarkerClick = (marker) => {
  lastEvent.value = {
    type: 'Clic en marcador',
    data: marker
  };
};

const handleMapClick = (location) => {
  lastEvent.value = {
    type: 'Clic en mapa',
    data: location
  };
};
</script>