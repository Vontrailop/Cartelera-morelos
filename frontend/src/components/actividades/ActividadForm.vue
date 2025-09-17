<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Nueva' }} Actividad</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Información básica -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input 
            v-model="form.titulo" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Título de la actividad"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select 
            v-model="form.categoria" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar categoría</option>
            <option v-for="categoria in categorias" :key="categoria._id" :value="categoria._id">
              {{ categoria.nombre }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Descripción -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea 
          v-model="form.descripcion" 
          rows="4" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción detallada de la actividad"
          required
        ></textarea>
      </div>
      
      <!-- Fechas y horarios -->
      <div>
        <h3 class="text-lg font-medium mb-3">Fechas y horarios</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hora</label>
            <input 
              v-model="form.hora" 
              type="time" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
      
      <!-- Espacio físico -->
      <div>
        <h3 class="text-lg font-medium mb-3">Ubicación</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Espacio físico</label>
          <select 
            v-model="form.espacioFisico" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar espacio</option>
            <option v-for="espacio in espaciosFisicos" :key="espacio._id" :value="espacio._id">
              {{ espacio.nombre }} - {{ espacio.direccion }}
            </option>
          </select>
        </div>
        
        <div class="mt-4 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Vista previa del mapa (Google Maps)</p>
        </div>
      </div>
      
      <!-- Organizador y contacto -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Organizador</label>
          <input 
            v-model="form.organizador" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del organizador"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email de contacto</label>
          <input 
            v-model="form.emailContacto" 
            type="email" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="email@ejemplo.com"
            required
          />
        </div>
      </div>
      
      <!-- Precio -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de entrada</label>
          <select 
            v-model="form.tipoEntrada" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="gratuita">Gratuita</option>
            <option value="pago">De pago</option>
          </select>
        </div>
        
        <div v-if="form.tipoEntrada === 'pago'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Precio (MXN)</label>
          <input 
            v-model.number="form.precio" 
            type="number" 
            min="0"
            step="0.01"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <!-- Imagen de portada -->
      <div>
        <h3 class="text-lg font-medium mb-3">Imagen de portada</h3>
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
        <div v-if="form.imagenPortada" class="mt-4 relative bg-gray-100 rounded-lg overflow-hidden h-48">
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
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  actividad: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Datos de ejemplo para categorías y espacios físicos
// En una implementación real, estos datos vendrían de una API
const categorias = ref([
  { _id: '1', nombre: 'Música' },
  { _id: '2', nombre: 'Teatro' },
  { _id: '3', nombre: 'Danza' },
  { _id: '4', nombre: 'Exposición' },
  { _id: '5', nombre: 'Taller' },
]);

const espaciosFisicos = ref([
  { _id: '1', nombre: 'Teatro Principal', direccion: 'Calle Principal #100, Cuernavaca' },
  { _id: '2', nombre: 'Galería Central', direccion: 'Av. Central #200, Cuernavaca' },
  { _id: '3', nombre: 'Auditorio Municipal', direccion: 'Plaza Central #50, Cuernavaca' },
]);

const form = ref({
  titulo: '',
  categoria: '',
  descripcion: '',
  fechaInicio: '',
  fechaFin: '',
  hora: '',
  espacioFisico: '',
  organizador: '',
  emailContacto: '',
  tipoEntrada: 'gratuita',
  precio: 0,
  imagenPortada: null
});

onMounted(() => {
  if (props.isEditing && props.actividad) {
    // Llenar el formulario con los datos de la actividad existente
    Object.keys(form.value).forEach(key => {
      if (props.actividad[key] !== undefined) {
        form.value[key] = props.actividad[key];
      }
    });
  }
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>