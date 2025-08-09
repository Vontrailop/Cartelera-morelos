<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-800">Listado de Pedidos</h2>
      <router-link v-if="authStore.isClient || authStore.isAdmin" to="/pedidos/crear"
                   class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Crear Nuevo Pedido
      </router-link>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="pedido in pedidos" :key="pedido.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ pedido.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ pedido.cliente }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ pedido.fecha }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="statusClass(pedido.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ pedido.estado }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <router-link :to="`/pedidos/${pedido.id}`" class="text-blue-600 hover:text-blue-900 mr-3">Ver</router-link>
              <button @click="editPedido(pedido.id)" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
              <button @click="cancelPedido(pedido.id)" class="text-red-600 hover:text-red-900">Cancelar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import pedidosData from '@/data/pedidos.json';

const authStore = useAuthStore();
const pedidos = ref([]);

onMounted(() => {
  // Simular carga de datos
  pedidos.value = pedidosData;
});

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

const editPedido = (id) => {
  alert(`Editar pedido ${id}`);
  // Lógica para editar pedido
};

const cancelPedido = (id) => {
  alert(`Cancelar pedido ${id}`);
  // Lógica para cancelar pedido
};
</script>