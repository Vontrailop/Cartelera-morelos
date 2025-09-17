<template>
  <div>
    <!-- Versión de escritorio: pestañas horizontales -->
    <div class="hidden md:block border-b border-gray-200">
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

    <!-- Versión móvil: menú desplegable -->
    <div class="md:hidden">
      <div class="relative">
        <button 
          @click="isOpen = !isOpen" 
          class="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <span class="flex items-center">
            <component 
              v-if="activeTab && activeTab.icon" 
              :is="activeTab.icon" 
              class="mr-2 h-5 w-5 text-primary" 
              aria-hidden="true" 
            />
            {{ activeTab ? activeTab.name : 'Seleccionar' }}
          </span>
          <svg class="ml-2 -mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <div 
          v-if="isOpen" 
          class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          ref="menuRef"
        >
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.to"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
            :class="{ 'bg-gray-100 text-gray-900': isActive(tab.to) }"
            role="menuitem"
            @click="isOpen = false"
          >
            <component 
              v-if="tab.icon" 
              :is="tab.icon" 
              :class="[
                isActive(tab.to) ? 'text-primary' : 'text-gray-400',
                'mr-3 h-5 w-5'
              ]"
              aria-hidden="true"
            />
            <div class="flex justify-between w-full items-center">
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
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // Cada tab debe tener: { name: string, to: string, icon?: Component, count?: number }
  }
});

const route = useRoute();
const isOpen = ref(false);
const menuRef = ref(null);

// Verificar si una pestaña está activa
const isActive = (path) => {
  return route.path === path || route.path.startsWith(`${path}/`);
};

// Obtener la pestaña activa
const activeTab = computed(() => {
  return props.tabs.find(tab => isActive(tab.to)) || props.tabs[0];
});

// Manejar clics fuera del menú
const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target) && isOpen.value) {
    isOpen.value = false;
  }
};

// Configurar detector de clics fuera del menú
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>