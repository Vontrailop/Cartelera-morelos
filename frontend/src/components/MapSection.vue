<script setup>
import { onMounted, watch } from 'vue';
import { useMap } from '@/composables/useMap';
import { useEventSearch } from '@/composables/useEventSearch';

const { initMap, addMarkers } = useMap();
const { events, loading } = useEventSearch();

// El ID del elemento donde se renderizará el mapa
const mapElementId = 'interactive-map';

// Inicializa el mapa cuando el componente se monta
onMounted(() => {
  initMap(mapElementId, {});
});

// Observa los cambios en la lista de eventos y actualiza los marcadores
watch(events, (newEvents) => {
  // Asumimos que cada evento tiene un objeto `espacio_fisico_id` 
  // con las propiedades `lat` y `lng`. 
  // Necesitarás ajustar tu API para que devuelva esta información.
  const locations = newEvents.map(event => ({
    lat: event.espacio_fisico_id?.lat, // Usamos optional chaining por seguridad
    lng: event.espacio_fisico_id?.lng,
    nombre: event.nombre,
  })).filter(loc => loc.lat && loc.lng); // Filtramos los que no tienen coordenadas

  addMarkers(locations);
}, { deep: true });

</script>

<template>
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bukhari text-center mb-2">Encuentra tu Evento</h2>
      <p class="text-lg text-center text-gray-600 mb-8">Explora los eventos directamente en el mapa.</p>
      
      <div class="w-full h-[500px] bg-gray-200 rounded-lg shadow-md relative">
        <div :id="mapElementId" class="w-full h-full rounded-lg"></div>
        
        <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <p class="text-gray-700">Actualizando mapa...</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Puedes añadir estilos específicos si es necesario */
</style>
