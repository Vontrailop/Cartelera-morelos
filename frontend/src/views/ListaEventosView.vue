<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Eventos Programados</h1>
    
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="evento in eventos" :key="evento.id" class="relative">
          <div class="px-4 py-4 sm:px-6 flex justify-between items-center">
            <div>
              <div class="flex items-center">
                <p class="text-sm font-medium text-primary truncate">{{ evento.titulo }}</p>
                <p class="ml-2 flex-shrink-0 inline-flex text-xs leading-5 font-semibold rounded-full" 
                   :class="{
                     'bg-green-100 text-green-800': evento.estado === 'aprobado',
                     'bg-yellow-100 text-yellow-800': evento.estado === 'pendiente',
                     'bg-red-100 text-red-800': evento.estado === 'rechazado'
                   }">
                  {{ evento.estado.toUpperCase() }}
                </p>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{{ evento.fecha }} | {{ evento.hora }}</span>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ evento.lugar }}</span>
              </div>
            </div>
            
            <!-- Menú contextual para cada evento -->
            <NavContextMenu
              :items="getMenuItems(evento)"
              @item-click="handleMenuAction($event, evento)"
              position="right"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavContextMenu from '@/components/navegacion/NavContextMenu.vue';

const router = useRouter();

// Datos de ejemplo para eventos
const eventos = ref([
  {
    id: 1,
    titulo: 'Concierto de música clásica',
    fecha: '15/06/2023',
    hora: '19:00',
    lugar: 'Auditorio Principal',
    estado: 'aprobado',
    organizador: 'Orquesta Sinfónica de Morelos'
  },
  {
    id: 2,
    titulo: 'Exposición de arte contemporáneo',
    fecha: '20/06/2023',
    hora: '10:00',
    lugar: 'Sala de Exposiciones',
    estado: 'pendiente',
    organizador: 'Colectivo Artístico Morelos'
  },
  {
    id: 3,
    titulo: 'Conferencia: Cambio climático',
    fecha: '25/06/2023',
    hora: '17:30',
    lugar: 'Sala de Conferencias A',
    estado: 'aprobado',
    organizador: 'Universidad Autónoma del Estado de Morelos'
  },
  {
    id: 4,
    titulo: 'Presentación de libro',
    fecha: '30/06/2023',
    hora: '18:00',
    lugar: 'Sala de Conferencias B',
    estado: 'rechazado',
    organizador: 'Editorial Independiente'
  },
  {
    id: 5,
    titulo: 'Festival gastronómico',
    fecha: '05/07/2023',
    hora: '12:00',
    lugar: 'Área de Eventos al Aire Libre',
    estado: 'aprobado',
    organizador: 'Asociación de Chefs de Morelos'
  }
]);

// Configurar elementos del menú contextual según el estado del evento
const getMenuItems = (evento) => {
  const items = [
    { id: 'ver', label: 'Ver detalles', icon: 'eye' },
  ];
  
  // Agregar opciones según el estado
  if (evento.estado === 'pendiente') {
    items.push(
      { id: 'aprobar', label: 'Aprobar', icon: 'check' },
      { id: 'rechazar', label: 'Rechazar', icon: 'x', dangerous: true }
    );
  }
  
  if (evento.estado === 'aprobado') {
    items.push(
      { id: 'editar', label: 'Editar', icon: 'pencil' },
      { id: 'cancelar', label: 'Cancelar evento', icon: 'trash', dangerous: true }
    );
  }
  
  if (evento.estado === 'rechazado') {
    items.push(
      { id: 'reconsiderar', label: 'Reconsiderar', icon: 'refresh' },
      { id: 'eliminar', label: 'Eliminar', icon: 'trash', dangerous: true }
    );
  }
  
  return items;
};

// Manejar acciones del menú contextual
const handleMenuAction = (actionId, evento) => {
  switch (actionId) {
    case 'ver':
      router.push(`/eventos/${evento.id}`);
      break;
    case 'editar':
      router.push(`/eventos/${evento.id}/editar`);
      break;
    case 'aprobar':
      aprobarEvento(evento.id);
      break;
    case 'rechazar':
      rechazarEvento(evento.id);
      break;
    case 'cancelar':
      cancelarEvento(evento.id);
      break;
    case 'reconsiderar':
      reconsiderarEvento(evento.id);
      break;
    case 'eliminar':
      eliminarEvento(evento.id);
      break;
  }
};

// Funciones para manejar las acciones (simuladas)
const aprobarEvento = (id) => {
  const evento = eventos.value.find(e => e.id === id);
  if (evento) {
    evento.estado = 'aprobado';
    alert(`Evento "${evento.titulo}" aprobado`);
  }
};

const rechazarEvento = (id) => {
  const evento = eventos.value.find(e => e.id === id);
  if (evento) {
    evento.estado = 'rechazado';
    alert(`Evento "${evento.titulo}" rechazado`);
  }
};

const cancelarEvento = (id) => {
  const evento = eventos.value.find(e => e.id === id);
  if (evento) {
    evento.estado = 'cancelado';
    alert(`Evento "${evento.titulo}" cancelado`);
  }
};

const reconsiderarEvento = (id) => {
  const evento = eventos.value.find(e => e.id === id);
  if (evento) {
    evento.estado = 'pendiente';
    alert(`Evento "${evento.titulo}" en reconsideración`);
  }
};

const eliminarEvento = (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
    eventos.value = eventos.value.filter(e => e.id !== id);
    alert('Evento eliminado');
  }
};
</script>