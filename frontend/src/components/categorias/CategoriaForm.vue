<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">{{ isEditing ? 'Editar' : 'Nueva' }} Categoría</h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Información básica -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input 
            v-model="form.nombre" 
            type="text" 
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre de la categoría"
            required
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="form.color" 
              type="color" 
              class="w-12 h-10 border rounded cursor-pointer"
              required
            />
            <input 
              v-model="form.color" 
              type="text" 
              class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#RRGGBB"
              required
            />
          </div>
        </div>
      </div>
      
      <!-- Descripción -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea 
          v-model="form.descripcion" 
          rows="3" 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descripción de la categoría"
          required
        ></textarea>
      </div>
      
      <!-- Icono -->
      <div>
        <h3 class="text-lg font-medium mb-3">Icono</h3>
        <div class="grid grid-cols-4 md:grid-cols-8 gap-4">
          <button 
            v-for="icon in availableIcons" 
            :key="icon" 
            type="button"
            class="p-3 border rounded-lg hover:bg-gray-100 flex items-center justify-center"
            :class="{ 'ring-2 ring-blue-500 bg-blue-50': form.icono === icon }"
            @click="form.icono = icon"
          >
            <span class="text-xl">{{ icon }}</span>
          </button>
        </div>
      </div>
      
      <!-- Tipo de categoría -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de categoría</label>
        <div class="flex space-x-4">
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              v-model="form.tipo" 
              value="actividad" 
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Actividad</span>
          </label>
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              v-model="form.tipo" 
              value="espacio" 
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Espacio</span>
          </label>
          <label class="inline-flex items-center">
            <input 
              type="radio" 
              v-model="form.tipo" 
              value="publicidad" 
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Publicidad</span>
          </label>
        </div>
      </div>
      
      <!-- Estado -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <div class="flex items-center">
          <label class="inline-flex items-center">
            <input 
              type="checkbox" 
              v-model="form.activo" 
              class="form-checkbox h-5 w-5 text-blue-600"
            />
            <span class="ml-2">Activo</span>
          </label>
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
  categoria: {
    type: Object,
    default: () => ({})
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

// Lista de iconos disponibles (emojis como ejemplo)
const availableIcons = [
  '🎭', '🎬', '🎨', '🎤', '🎧', '🎵', '🎹', '🎷',
  '🎺', '🎸', '🎻', '📚', '🎮', '🏛️', '🏰', '🏯',
  '🎪', '🎟️', '🎫', '🎯', '🎲', '🎼', '🎭', '🎨'
];

const form = ref({
  nombre: '',
  descripcion: '',
  color: '#3B82F6', // Color azul por defecto
  icono: '🎭',
  tipo: 'actividad',
  activo: true
});

onMounted(() => {
  if (props.isEditing && props.categoria) {
    // Llenar el formulario con los datos de la categoría existente
    Object.keys(form.value).forEach(key => {
      if (props.categoria[key] !== undefined) {
        form.value[key] = props.categoria[key];
      }
    });
  }
});

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>