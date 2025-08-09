
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Listado de Cotizaciones</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cotizacion in cotizaciones" :key="cotizacion.id" class="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800">Cotización #{{ cotizacion.id }}</h3>
        <p class="text-sm text-gray-600">Cliente: {{ cotizacion.cliente }}</p>
        <p class="text-sm text-gray-600">Fecha: {{ cotizacion.fecha }}</p>
        <p class="text-sm text-gray-600">Total: ${{ cotizacion.total }}</p>
        <div class="mt-2">
          <span :class="statusClass(cotizacion.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
            {{ cotizacion.estado }}
          </span>
        </div>

        <div v-if="authStore.isClient && cotizacion.estado === 'Pendiente'" class="mt-4 flex space-x-2">
          <button @click="acceptCotizacion(cotizacion.id)"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
            Aceptar
          </button>
          <button @click="rejectCotizacion(cotizacion.id)"
                  class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import cotizacionesData from '@/data/cotizaciones.json';

const authStore = useAuthStore();
const cotizaciones = ref([]);

onMounted(() => {
  cotizaciones.value = cotizacionesData;
});

const statusClass = (estado) => {
  switch (estado) {
    case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
    case 'Aceptada': return 'bg-green-100 text-green-800';
    case 'Rechazada': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const acceptCotizacion = (id) => {
  alert(`Cotización ${id} aceptada (simulado)!`);
  // Lógica para aceptar cotización
};

const rejectCotizacion = (id) => {
  alert(`Cotización ${id} rechazada (simulado)!`);
  // Lógica para rechazar cotización
};
</script>
