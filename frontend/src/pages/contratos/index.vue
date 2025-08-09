
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Listado de Contratos</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Firma</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documento</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="contrato in contratos" :key="contrato.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ contrato.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contrato.cliente }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ contrato.fechaFirma }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="statusClass(contrato.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ contrato.estado }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a :href="contrato.documentoUrl" target="_blank" class="text-blue-600 hover:text-blue-900">Ver PDF</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import contratosData from '@/data/contratos.json';

const contratos = ref([]);

onMounted(() => {
  contratos.value = contratosData;
});

const statusClass = (estado) => {
  switch (estado) {
    case 'Activo': return 'bg-green-100 text-green-800';
    case 'Finalizado': return 'bg-gray-100 text-gray-800';
    case 'Pendiente Firma': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
</script>
