
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Listado de Equipos</h2>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="equipo in equipos" :key="equipo.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ equipo.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ equipo.nombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ equipo.tipo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="statusClass(equipo.estado)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ equipo.estado }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button @click="assignEquipo(equipo.id)" class="text-blue-600 hover:text-blue-900 mr-3">Asignar a Pedido</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import equiposData from '@/data/equipos.json';

const equipos = ref([]);

onMounted(() => {
  equipos.value = equiposData;
});

const statusClass = (estado) => {
  switch (estado) {
    case 'Disponible': return 'bg-green-100 text-green-800';
    case 'En Uso': return 'bg-yellow-100 text-yellow-800';
    case 'En Mantenimiento': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const assignEquipo = (id) => {
  alert(`Asignar equipo ${id} a un pedido (simulado)!`);
  // Lógica para asignar equipo
};
</script>
