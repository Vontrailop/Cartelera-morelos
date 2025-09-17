
<template>
  <div>
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardResumen v-for="metric in metrics" :key="metric.title" :title="metric.title" :value="metric.value" :icon="metric.icon" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import CardResumen from '@/components/common/CardResumen.vue';
import { 
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  RectangleStackIcon 
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const adminMetrics = [
  { title: 'Pedidos Totales', value: '125', icon: ClipboardDocumentListIcon },
  { title: 'Contratos Activos', value: '32', icon: DocumentTextIcon },
  { title: 'Equipos Disponibles', value: '18', icon: RectangleStackIcon },
  { title: 'Ingresos del Mes', value: '$12,500', icon: null },
];

const clientMetrics = [
  { title: 'Mis Pedidos', value: '8', icon: ClipboardDocumentListIcon },
  { title: 'Cotizaciones Pendientes', value: '2', icon: DocumentTextIcon },
  { title: 'Contratos Firmados', value: '3', icon: DocumentTextIcon },
];

const collaboratorMetrics = [
  { title: 'Pedidos Asignados', value: '5', icon: ClipboardDocumentListIcon },
  { title: 'Equipos a Cargo', value: '4', icon: RectangleStackIcon },
];

const metrics = computed(() => {
  if (authStore.isAdmin) return adminMetrics;
  if (authStore.isClient) return clientMetrics;
  if (authStore.isCollaborator) return collaboratorMetrics;
  return [];
});
</script>
