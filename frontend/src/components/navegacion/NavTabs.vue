<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      <router-link
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.to"
        :class="[
          isActive(tab.to)
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center'
        ]"
      >
        <component 
          v-if="tab.icon" 
          :is="tab.icon" 
          :class="[
            isActive(tab.to) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500',
            'mr-2 h-5 w-5'
          ]"
          aria-hidden="true"
        />
        {{ tab.name }}
        <span
          v-if="tab.count !== undefined"
          :class="[
            isActive(tab.to) ? 'bg-primary-100 text-primary' : 'bg-gray-100 text-gray-900',
            'ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium'
          ]"
        >
          {{ tab.count }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // Cada tab debe tener: { name: string, to: string, icon?: Component, count?: number }
  }
});

const route = useRoute();

// Verificar si una pestaña está activa
const isActive = (path) => {
  return route.path === path || route.path.startsWith(`${path}/`);
};
</script>