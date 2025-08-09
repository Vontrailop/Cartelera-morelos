
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Pedido</h2>
    <form @submit.prevent="submitPedido" class="space-y-6">
      <div>
        <label for="cliente" class="block text-sm font-medium text-gray-700">Cliente</label>
        <input type="text" id="cliente" v-model="pedido.cliente" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" required>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Servicios</label>
        <div v-for="(service, index) in pedido.servicios" :key="index" class="flex items-center space-x-4 mt-2">
          <select v-model="service.id" @change="updateServicePrice(index)" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Seleccione un servicio</option>
            <option v-for="s in availableServices" :key="s.id" :value="s.id">{{ s.nombre }}</option>
          </select>
          <input type="number" v-model.number="service.cantidad" placeholder="Cantidad" class="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" min="1" required>
          <input type="text" v-model="service.precio" placeholder="Precio" class="block w-24 rounded-md border-gray-300 shadow-sm bg-gray-100" readonly>
          <button type="button" @click="removeService(index)" class="text-red-600 hover:text-red-900">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
        <button type="button" @click="addService" class="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Añadir Servicio
        </button>
      </div>

      <div>
        <label for="total" class="block text-sm font-medium text-gray-700">Total</label>
        <input type="text" id="total" :value="calculatedTotal" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100" readonly>
      </div>

      <div class="flex justify-end">
        <button type="submit" class="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Guardar Pedido
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import servicesData from '@/data/services.json';

const pedido = ref({
  cliente: '',
  servicios: [],
});

const availableServices = ref([]);

onMounted(() => {
  availableServices.value = servicesData;
});

const addService = () => {
  pedido.value.servicios.push({ id: '', cantidad: 1, precio: 0 });
};

const removeService = (index) => {
  pedido.value.servicios.splice(index, 1);
};

const updateServicePrice = (index) => {
  const selectedService = availableServices.value.find(s => s.id === pedido.value.servicios[index].id);
  if (selectedService) {
    pedido.value.servicios[index].precio = selectedService.precio;
  } else {
    pedido.value.servicios[index].precio = 0;
  }
};

const calculatedTotal = computed(() => {
  return pedido.value.servicios.reduce((sum, service) => {
    return sum + (service.cantidad * service.precio);
  }, 0).toFixed(2);
});

const submitPedido = () => {
  console.log('Pedido a guardar:', pedido.value);
  alert('Pedido guardado (simulado)!');
  // Aquí iría la lógica para enviar el pedido a la API
};
</script>
