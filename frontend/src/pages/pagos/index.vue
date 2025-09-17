<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Pagos y Facturación</h1>
    
    <div class="mb-6 flex justify-between items-center">
      <div class="flex gap-2">
        <input 
          type="text" 
          placeholder="Buscar pagos..." 
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Todos los estados</option>
          <option>Pagado</option>
          <option>Pendiente</option>
          <option>Cancelado</option>
        </select>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Buscar
        </button>
      </div>
      <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
        Registrar Pago
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pago</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Concepto</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factura</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="i in 5" :key="i" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">PAG-{{ 2000 + i }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">Cliente {{ i }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">
                {{ i % 2 === 0 ? 'Renta de espacio publicitario' : 'Publicación de actividad' }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ new Date().toLocaleDateString() }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">${{ i * 1500 }} MXN</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="{
                  'px-2 py-1 text-xs rounded-full': true,
                  'bg-green-100 text-green-800': i % 3 === 0,
                  'bg-yellow-100 text-yellow-800': i % 3 === 1,
                  'bg-red-100 text-red-800': i % 3 === 2
                }"
              >
                {{ i % 3 === 0 ? 'Pagado' : i % 3 === 1 ? 'Pendiente' : 'Cancelado' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button 
                v-if="i % 3 === 0" 
                class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200"
              >
                Descargar
              </button>
              <span v-else class="text-xs text-gray-500">No disponible</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button class="text-blue-600 hover:text-blue-900 mr-3">Ver</button>
              <button 
                v-if="i % 3 === 1" 
                class="text-green-600 hover:text-green-900"
              >
                Procesar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Aquí irá la lógica para gestionar pagos y facturación
</script>