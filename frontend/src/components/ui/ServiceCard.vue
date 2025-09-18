<template>
  <div class="max-w-2xl mx-auto bg-teal-400 text-white rounded-lg p-8">
    <h3 class="text-3xl font-afacad font-bold mb-4">{{ servicio.title }}</h3>
    <p class="mb-6">{{ servicio.description }}</p>
    <ul class="text-left space-y-2">
      <li v-for="feature in servicio.features" :key="feature">- {{ feature }}</li>
    </ul>
    <button class="mt-8 bg-white text-teal-500 font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition">
      CONTRATAR
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  servicio: {
    type: Object,
    required: true,
  },
});
</script>
