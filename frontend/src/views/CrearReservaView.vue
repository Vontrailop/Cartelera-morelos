<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Crear Nueva Reserva</h1>
    
    <NavStepper 
      :steps="steps" 
      :canProceed="canProceedToNextStep" 
      @step-change="handleStepChange"
      @finish="handleFinish"
    >
      <!-- Paso 1: Selección de espacio -->
      <div v-if="currentStep === 0" class="space-y-6">
        <div>
          <label for="espacio" class="block text-sm font-medium text-gray-700">Espacio</label>
          <select 
            id="espacio" 
            v-model="formData.espacioId"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            <option value="">Selecciona un espacio</option>
            <option v-for="espacio in espacios" :key="espacio.id" :value="espacio.id">
              {{ espacio.nombre }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input 
            type="date" 
            id="fecha" 
            v-model="formData.fecha"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="horario" class="block text-sm font-medium text-gray-700">Horario</label>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="horaInicio" class="block text-xs text-gray-500">Hora inicio</label>
              <input 
                type="time" 
                id="horaInicio" 
                v-model="formData.horaInicio"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              />
            </div>
            <div>
              <label for="horaFin" class="block text-xs text-gray-500">Hora fin</label>
              <input 
                type="time" 
                id="horaFin" 
                v-model="formData.horaFin"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Paso 2: Información del solicitante -->
      <div v-if="currentStep === 1" class="space-y-6">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input 
            type="text" 
            id="nombre" 
            v-model="formData.nombre"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono</label>
          <input 
            type="tel" 
            id="telefono" 
            v-model="formData.telefono"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="organizacion" class="block text-sm font-medium text-gray-700">Organización</label>
          <input 
            type="text" 
            id="organizacion" 
            v-model="formData.organizacion"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
      </div>
      
      <!-- Paso 3: Detalles del evento -->
      <div v-if="currentStep === 2" class="space-y-6">
        <div>
          <label for="titulo" class="block text-sm font-medium text-gray-700">Título del evento</label>
          <input 
            type="text" 
            id="titulo" 
            v-model="formData.titulo"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea 
            id="descripcion" 
            v-model="formData.descripcion"
            rows="4"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          ></textarea>
        </div>
        
        <div>
          <label for="asistentes" class="block text-sm font-medium text-gray-700">Número de asistentes</label>
          <input 
            type="number" 
            id="asistentes" 
            v-model="formData.asistentes"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          />
        </div>
        
        <div>
          <label for="equipos" class="block text-sm font-medium text-gray-700">Equipos requeridos</label>
          <div class="mt-2 space-y-2">
            <div v-for="equipo in equiposDisponibles" :key="equipo.id" class="flex items-center">
              <input 
                type="checkbox" 
                :id="`equipo-${equipo.id}`" 
                :value="equipo.id" 
                v-model="formData.equipos"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label :for="`equipo-${equipo.id}`" class="ml-2 block text-sm text-gray-700">
                {{ equipo.nombre }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Paso 4: Confirmación -->
      <div v-if="currentStep === 3" class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Resumen de la reserva</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="text-sm font-medium text-gray-500">Espacio</h4>
              <p class="mt-1">{{ getEspacioNombre(formData.espacioId) }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Fecha y horario</h4>
              <p class="mt-1">{{ formData.fecha }} de {{ formData.horaInicio }} a {{ formData.horaFin }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Solicitante</h4>
              <p class="mt-1">{{ formData.nombre }}</p>
              <p class="text-sm text-gray-500">{{ formData.email }}</p>
              <p class="text-sm text-gray-500">{{ formData.telefono }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Organización</h4>
              <p class="mt-1">{{ formData.organizacion }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Evento</h4>
              <p class="mt-1">{{ formData.titulo }}</p>
              <p class="text-sm text-gray-500">{{ formData.descripcion }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Asistentes</h4>
              <p class="mt-1">{{ formData.asistentes }}</p>
            </div>
            
            <div>
              <h4 class="text-sm font-medium text-gray-500">Equipos</h4>
              <ul class="mt-1 list-disc list-inside">
                <li v-for="equipoId in formData.equipos" :key="equipoId" class="text-sm">
                  {{ getEquipoNombre(equipoId) }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="mt-6">
            <div class="flex items-center">
              <input 
                id="terminos" 
                type="checkbox" 
                v-model="formData.aceptaTerminos"
                class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label for="terminos" class="ml-2 block text-sm text-gray-700">
                Acepto los términos y condiciones para la reserva de espacios
              </label>
            </div>
          </div>
        </div>
      </div>
    </NavStepper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import NavStepper from '@/components/navegacion/NavStepper.vue';

const router = useRouter();
const currentStep = ref(0);

// Definir los pasos del proceso
const steps = [
  { name: 'Selección de espacio', description: 'Fecha y horario' },
  { name: 'Información del solicitante', description: 'Datos de contacto' },
  { name: 'Detalles del evento', description: 'Información adicional' },
  { name: 'Confirmación', description: 'Revisar y confirmar' }
];

// Datos del formulario
const formData = ref({
  espacioId: '',
  fecha: '',
  horaInicio: '',
  horaFin: '',
  nombre: '',
  email: '',
  telefono: '',
  organizacion: '',
  titulo: '',
  descripcion: '',
  asistentes: null,
  equipos: [],
  aceptaTerminos: false
});

// Datos de ejemplo
const espacios = [
  { id: 1, nombre: 'Auditorio Principal' },
  { id: 2, nombre: 'Sala de Conferencias A' },
  { id: 3, nombre: 'Sala de Conferencias B' },
  { id: 4, nombre: 'Sala de Exposiciones' },
  { id: 5, nombre: 'Área de Eventos al Aire Libre' }
];

const equiposDisponibles = [
  { id: 1, nombre: 'Proyector' },
  { id: 2, nombre: 'Sistema de sonido' },
  { id: 3, nombre: 'Micrófonos inalámbricos' },
  { id: 4, nombre: 'Pódium' },
  { id: 5, nombre: 'Mesas y sillas adicionales' },
  { id: 6, nombre: 'Conexión a internet dedicada' }
];

// Funciones auxiliares
const getEspacioNombre = (id) => {
  const espacio = espacios.find(e => e.id === parseInt(id));
  return espacio ? espacio.nombre : 'No seleccionado';
};

const getEquipoNombre = (id) => {
  const equipo = equiposDisponibles.find(e => e.id === parseInt(id));
  return equipo ? equipo.nombre : '';
};

// Validación para avanzar al siguiente paso
const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 0: // Validación del paso 1
      return formData.value.espacioId && formData.value.fecha && formData.value.horaInicio && formData.value.horaFin;
    case 1: // Validación del paso 2
      return formData.value.nombre && formData.value.email && formData.value.telefono;
    case 2: // Validación del paso 3
      return formData.value.titulo && formData.value.asistentes;
    case 3: // Validación del paso 4
      return formData.value.aceptaTerminos;
    default:
      return true;
  }
});

// Manejar cambio de paso
const handleStepChange = (step) => {
  currentStep.value = step;
};

// Manejar finalización del proceso
const handleFinish = () => {
  // Aquí se enviaría el formulario al servidor
  console.log('Formulario enviado:', formData.value);
  
  // Mostrar mensaje de éxito y redirigir
  alert('Reserva creada con éxito');
  router.push('/espacios-fisicos/reservas');
};
</script>