<template>
  <div class="overflow-hidden bg-white rounded-lg shadow-lg">
    <img :src="imageUrl" :alt="title" class="w-full">
    <div class="p-6">
      <h3 class="text-xl font-bold">{{ title }}</h3>
      <p class="mt-2 text-gray-600">{{ description }}</p>
      <p class="mt-4 font-semibold text-gray-800">{{ schedule }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
});
</script>
