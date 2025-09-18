<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-4xl font-bukhari mb-4">Servicios</h2>
      <p class="text-lg text-gray-600 mb-8">Plan de Diseño y Campañas para Eventos</p>
      <div class="flex flex-wrap justify-center gap-8">
        <ServiceCard v-for="servicio in servicios" :key="servicio.id" :servicio="servicio" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
import ServiceCard from './ui/ServiceCard.vue';

defineProps({
  servicios: {
    type: Array,
    required: true,
  },
});
</script>