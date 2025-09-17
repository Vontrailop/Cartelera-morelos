<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Nueva' }} Renta Publicitaria</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Cliente -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
        <select 
          v-model="form.cliente" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar cliente</option>
          <option v-for="cliente in clientes" :key="cliente._id" :value="cliente._id">
            {{ cliente.nombre }} - {{ cliente.email }}
          </option>
        </select>
      </div>
      
      <!-- Espacio publicitario -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Espacio publicitario</label>
        <select 
          v-model="form.espacioPublicitario" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar espacio publicitario</option>
          <option v-for="espacio in espaciosPublicitarios" :key="espacio._id" :value="espacio._id">
            {{ espacio.nombre }} - {{ espacio.tipo }} - {{ espacio.direccion }}
          </option>
        </select>
      </div>
      
      <!-- Fechas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
          <input 
            v-model="form.fechaInicio" 
            type="date" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de fin</label>
          <input 
            v-model="form.fechaFin" 
            type="date" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <!-- Detalles del anuncio -->
      <div>
        <h3 class="text-lg font-medium mb-3">Detalles del anuncio</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título del anuncio</label>
          <input 
            v-model="form.tituloAnuncio" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título del anuncio"
            required
          />
        </div>
        
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Descripción del anuncio</label>
          <textarea 
            v-model="form.descripcionAnuncio" 
            rows="3" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción del anuncio"
            required
          ></textarea>
        </div>
      </div>
      
      <!-- Imagen del anuncio -->
      <div>
        <h3 class="text-lg font-medium mb-3">Imagen del anuncio</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div class="space-y-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-sm text-gray-500">Arrastra y suelta una imagen o</p>
            <button type="button" class="text-sm text-blue-600 font-medium hover:text-blue-800">
              Seleccionar archivo
            </button>
          </div>
        </div>
        
        <!-- Vista previa de imagen -->
        <div v-if="form.imagenAnuncio" class="mt-4 relative bg-gray-100 rounded-lg overflow-hidden h-48">
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-gray-500">Vista previa de la imagen</p>
          </div>
          <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Información de pago -->
      <div>
        <h3 class="text-lg font-medium mb-3">Información de pago</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Precio por día (MXN)</label>
            <input 
              v-model.number="form.precioPorDia" 
              type="number" 
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              :disabled="true"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Días totales</label>
            <input 
              v-model.number="form.diasTotales" 
              type="number" 
              min="1"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              :disabled="true"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Monto total (MXN)</label>
            <input 
              v-model.number="form.montoTotal" 
              type="number" 
              min="0"
              step="0.01"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              :disabled="true"
            />
          </div>
        </div>
      </div>
      
      <!-- Estado de la renta -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select 
          v-model="form.estado" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="pendiente">Pendiente de pago</option>
          <option value="pagado">Pagado</option>
          <option value="activo">Activo</option>
          <option value="finalizado">Finalizado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>
      
      <!-- Botones -->
      <div class="flex justify-end space-x-4">
        <button 
          type="button" 
          class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {{ isEditing ? 'Actualizar' : 'Guardar' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps({
  renta: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Datos de ejemplo para clientes y espacios publicitarios
// En una implementación real, estos datos vendrían de una API
const clientes = ref([
  { _id: '1', nombre: 'Empresa A', email: 'contacto@empresaa.com' },
  { _id: '2', nombre: 'Empresa B', email: 'contacto@empresab.com' },
  { _id: '3', nombre: 'Empresa C', email: 'contacto@empresac.com' },
]);

const espaciosPublicitarios = ref([
  { _id: '1', nombre: 'Espectacular Centro', tipo: 'Espectacular', direccion: 'Av. Central #100, Cuernavaca', precioDia: 1500 },
  { _id: '2', nombre: 'Banner Plaza Principal', tipo: 'Banner', direccion: 'Plaza Principal #50, Cuernavaca', precioDia: 800 },
  { _id: '3', nombre: 'Mural Avenida', tipo: 'Mural', direccion: 'Av. Morelos #200, Cuernavaca', precioDia: 1200 },
]);

const form = ref({
  cliente: '',
  espacioPublicitario: '',
  fechaInicio: '',
  fechaFin: '',
  tituloAnuncio: '',
  descripcionAnuncio: '',
  imagenAnuncio: null,
  precioPorDia: 0,
  diasTotales: 0,
  montoTotal: 0,
  estado: 'pendiente'
});

// Calcular días totales y monto total cuando cambian las fechas o el espacio publicitario
watch([() => form.value.fechaInicio, () => form.value.fechaFin, () => form.value.espacioPublicitario], () => {
  if (form.value.fechaInicio && form.value.fechaFin && form.value.espacioPublicitario) {
    const inicio = new Date(form.value.fechaInicio);
    const fin = new Date(form.value.fechaFin);
    const diffTime = Math.abs(fin - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir el día de inicio
    
    form.value.diasTotales = diffDays;
    
    const espacio = espaciosPublicitarios.value.find(e => e._id === form.value.espacioPublicitario);
    if (espacio) {
      form.value.precioPorDia = espacio.precioDia;
      form.value.montoTotal = espacio.precioDia * diffDays;
    }
  }
});

onMounted(() => {
  if (props.isEditing && props.renta) {
    // Llenar el formulario con los datos de la renta existente
    Object.keys(form.value).forEach(key => {
      if (props.renta[key] !== undefined) {
        form.value[key] = props.renta[key];
      }
    });
  }
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>