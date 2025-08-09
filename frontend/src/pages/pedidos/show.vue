
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Detalle del Pedido #{{ pedido.id }}</h2>

    <div v-if="pedido" class="space-y-4">
      <div>
        <p class="text-sm font-medium text-gray-500">Cliente:</p>
        <p class="text-lg font-semibold text-gray-900">{{ pedido.cliente }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Fecha:</p>
        <p class="text-lg font-semibold text-gray-900">{{ pedido.fecha }}</p>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">Estado:</p>
        <span :class="statusClass(pedido.estado)" class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full">
          {{ pedido.estado }}
        </span>
      </div>

      <div class="pt-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Servicios Incluidos:</h3>
        <ul class="list-disc list-inside space-y-1">
          <li v-for="(service, index) in pedido.servicios" :key="index" class="text-gray-700">
            {{ service.nombre }} (x{{ service.cantidad }}) - ${{ service.precio }}
          </li>
        </ul>
      </div>

      <div class="pt-4">
        <p class="text-lg font-semibold text-gray-800">Total del Pedido: <span class="text-blue-600">${{ pedido.total }}</span></p>
      </div>

      <div class="pt-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">Documentos Relacionados:</h3>
        <p v-if="pedido.cotizacionId">
          <router-link :to="`/cotizaciones/${pedido.cotizacionId}`" class="text-blue-600 hover:underline">
            Ver Cotización #{{ pedido.cotizacionId }}
          </router-link>
        </p>
        <p v-else class="text-gray-500">No hay cotización asociada.</p>

        <p v-if="pedido.contratoId">
          <router-link :to="`/contratos/${pedido.contratoId}`" class="text-blue-600 hover:underline">
            Ver Contrato #{{ pedido.contratoId }}
          </router-link>
        </p>
        <p v-else class="text-gray-500">No hay contrato asociado.</p>
      </div>

      <div class="pt-6 flex justify-end">
        <button @click="$router.back()" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Volver
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">Cargando detalle del pedido o pedido no encontrado...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import pedidosData from '@/data/pedidos.json';

const route = useRoute();
const pedido = ref(null);

const fetchPedido = () => {
  const pedidoId = route.params.id;
  pedido.value = pedidosData.find(p => p.id === pedidoId);
};

onMounted(fetchPedido);
watch(() => route.params.id, fetchPedido);

const statusClass = (estado) => {
  switch (estado) {
    case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
    case 'Aprobado': return 'bg-green-100 text-green-800';
    case 'Rechazado': return 'bg-red-100 text-red-800';
    case 'En Proceso': return 'bg-blue-100 text-blue-800';
    case 'Completado': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>
