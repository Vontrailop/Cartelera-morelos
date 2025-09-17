<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Nuevo' }} Espacio Publicitario</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Información básica -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input 
            v-model="form.nombre" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del espacio publicitario"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select 
            v-model="form.tipo" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccionar tipo</option>
            <option value="Espectacular">Espectacular</option>
            <option value="Banner">Banner</option>
            <option value="Mural">Mural</option>
            <option value="Digital">Digital</option>
            <option value="Impreso">Impreso</option>
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
          placeholder="Descripción detallada del espacio publicitario"
          required
        ></textarea>
      </div>
      
      <!-- Dimensiones y Precio -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Ancho (cm)</label>
          <input 
            v-model.number="form.ancho" 
            type="number" 
            min="1"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Alto (cm)</label>
          <input 
            v-model.number="form.alto" 
            type="number" 
            min="1"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Precio por día (MXN)</label>
          <input 
            v-model.number="form.precioDia" 
            type="number" 
            min="0"
            step="0.01"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      
      <!-- Ubicación -->
      <div>
        <h3 class="text-lg font-medium mb-3">Ubicación</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input 
              v-model="form.direccion" 
              type="text" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dirección completa"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input 
              v-model="form.ciudad" 
              type="text" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ciudad"
              required
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
            <input 
              v-model.number="form.latitud" 
              type="number" 
              step="0.000001"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
            <input 
              v-model.number="form.longitud" 
              type="number" 
              step="0.000001"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div class="mt-4 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Mapa para seleccionar ubicación (Google Maps)</p>
        </div>
      </div>
      
      <!-- Disponibilidad -->
      <div>
        <h3 class="text-lg font-medium mb-3">Disponibilidad</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select 
              v-model="form.estado" 
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="disponible">Disponible</option>
              <option value="ocupado">Ocupado</option>
              <option value="mantenimiento">En mantenimiento</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Duración mínima de renta (días)</label>
            <input 
              v-model.number="form.duracionMinima" 
              type="number" 
              min="1"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
      
      <!-- Imágenes -->
      <div>
        <h3 class="text-lg font-medium mb-3">Imágenes</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div class="space-y-2">
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-sm text-gray-500">Arrastra y suelta imágenes o</p>
            <button type="button" class="text-sm text-blue-600 font-medium hover:text-blue-800">
              Seleccionar archivos
            </button>
          </div>
        </div>
        
        <!-- Vista previa de imágenes -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div v-for="i in 2" :key="i" class="relative bg-gray-100 rounded-lg overflow-hidden h-32">
            <div class="absolute inset-0 flex items-center justify-center">
              <p class="text-gray-500">Imagen {{ i }}</p>
            </div>
            <button type="button" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
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
  espacio: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const form = ref({
  nombre: '',
  tipo: '',
  descripcion: '',
  ancho: null,
  alto: null,
  precioDia: null,
  direccion: '',
  ciudad: '',
  latitud: null,
  longitud: null,
  estado: 'disponible',
  duracionMinima: 1,
  imagenes: []
});

onMounted(() => {
  if (props.isEditing && props.espacio) {
    // Llenar el formulario con los datos del espacio existente
    Object.keys(form.value).forEach(key => {
      if (props.espacio[key] !== undefined) {
        form.value[key] = props.espacio[key];
      }
    });
  }
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>