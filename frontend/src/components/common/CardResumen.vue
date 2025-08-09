
<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
      </div>
      <div v-if="icon" class="p-3 bg-blue-100 rounded-full">
        <component :is="icon" class="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: Object,
    default: null,
  },
});
</script>
