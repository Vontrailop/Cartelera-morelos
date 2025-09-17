<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Registrar' }} Pago</h2>
    
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
      
      <!-- Concepto de pago -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
        <select 
          v-model="form.tipoPago" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar concepto</option>
          <option value="renta_publicitaria">Renta de espacio publicitario</option>
          <option value="actividad">Actividad cultural</option>
          <option value="espacio_fisico">Renta de espacio físico</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      
      <!-- Referencia según el tipo de pago -->
      <div v-if="form.tipoPago === 'renta_publicitaria'">
        <label class="block text-sm font-medium text-gray-700 mb-1">Renta publicitaria</label>
        <select 
          v-model="form.referenciaId" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar renta</option>
          <option v-for="renta in rentasPublicitarias" :key="renta._id" :value="renta._id">
            {{ renta.tituloAnuncio }} - {{ renta.espacioNombre }} - {{ formatCurrency(renta.montoTotal) }}
          </option>
        </select>
      </div>
      
      <div v-else-if="form.tipoPago === 'actividad'">
        <label class="block text-sm font-medium text-gray-700 mb-1">Actividad</label>
        <select 
          v-model="form.referenciaId" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar actividad</option>
          <option v-for="actividad in actividades" :key="actividad._id" :value="actividad._id">
            {{ actividad.titulo }} - {{ actividad.fechaInicio }}
          </option>
        </select>
      </div>
      
      <div v-else-if="form.tipoPago === 'espacio_fisico'">
        <label class="block text-sm font-medium text-gray-700 mb-1">Espacio físico</label>
        <select 
          v-model="form.referenciaId" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar espacio físico</option>
          <option v-for="espacio in espaciosFisicos" :key="espacio._id" :value="espacio._id">
            {{ espacio.nombre }} - {{ espacio.direccion }}
          </option>
        </select>
      </div>
      
      <div v-else-if="form.tipoPago === 'otro'">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción del concepto</label>
        <input 
          v-model="form.conceptoDescripcion" 
          type="text" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción detallada del concepto de pago"
          required
        />
      </div>
      
      <!-- Información del pago -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Monto (MXN)</label>
          <input 
            v-model.number="form.monto" 
            type="number" 
            min="0"
            step="0.01"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Fecha de pago</label>
          <input 
            v-model="form.fechaPago" 
            type="date" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <!-- Método de pago -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
          <select 
            v-model="form.metodoPago" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="deposito">Depósito bancario</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Referencia de pago</label>
          <input 
            v-model="form.referenciaPago" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Número de referencia, últimos 4 dígitos, etc."
          />
        </div>
      </div>
      
      <!-- Estado del pago -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <select 
          v-model="form.estado" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="completado">Completado</option>
          <option value="pendiente">Pendiente</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>
      
      <!-- Comprobante de pago -->
      <div>
        <h3 class="text-lg font-medium mb-3">Comprobante de pago</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div class="space-y-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-sm text-gray-500">Arrastra y suelta un archivo o</p>
            <button type="button" class="text-sm text-blue-600 font-medium hover:text-blue-800">
              Seleccionar archivo
            </button>
          </div>
        </div>
        
        <!-- Vista previa del comprobante -->
        <div v-if="form.comprobante" class="mt-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span class="text-sm text-gray-700">comprobante.pdf</span>
          <button type="button" class="ml-2 text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Notas -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
        <textarea 
          v-model="form.notas" 
          rows="3" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Notas o comentarios adicionales sobre el pago"
        ></textarea>
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
          {{ isEditing ? 'Actualizar' : 'Registrar pago' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  pago: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Datos de ejemplo para clientes, rentas, actividades y espacios
// En una implementación real, estos datos vendrían de una API
const clientes = ref([
  { _id: '1', nombre: 'Empresa A', email: 'contacto@empresaa.com' },
  { _id: '2', nombre: 'Empresa B', email: 'contacto@empresab.com' },
  { _id: '3', nombre: 'Juan Pérez', email: 'juan@example.com' },
]);

const rentasPublicitarias = ref([
  { _id: '1', tituloAnuncio: 'Promoción Verano', espacioNombre: 'Espectacular Centro', montoTotal: 15000 },
  { _id: '2', tituloAnuncio: 'Gran Inauguración', espacioNombre: 'Banner Plaza Principal', montoTotal: 8000 },
]);

const actividades = ref([
  { _id: '1', titulo: 'Concierto de Jazz', fechaInicio: '2023-07-15' },
  { _id: '2', titulo: 'Exposición de Arte', fechaInicio: '2023-08-10' },
]);

const espaciosFisicos = ref([
  { _id: '1', nombre: 'Teatro Principal', direccion: 'Calle Principal #100, Cuernavaca' },
  { _id: '2', nombre: 'Galería Central', direccion: 'Av. Central #200, Cuernavaca' },
]);

const form = ref({
  cliente: '',
  tipoPago: '',
  referenciaId: '',
  conceptoDescripcion: '',
  monto: null,
  fechaPago: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
  metodoPago: '',
  referenciaPago: '',
  estado: 'completado',
  comprobante: null,
  notas: ''
});

onMounted(() => {
  if (props.isEditing && props.pago) {
    // Llenar el formulario con los datos del pago existente
    Object.keys(form.value).forEach(key => {
      if (props.pago[key] !== undefined) {
        form.value[key] = props.pago[key];
      }
    });
  }
});

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>