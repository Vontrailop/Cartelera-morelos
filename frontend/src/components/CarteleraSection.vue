<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bukhari text-center mb-4">Cartelera de Eventos</h2>
      <p class="text-lg text-center text-gray-600 mb-8">No te pierdas lo más destacado de la semana.</p>
      <EventCarousel />
    </div>
  </section>
</template>

<script setup>
import EventCarousel from "@/components/ui/EventCarousel.vue";
</script>