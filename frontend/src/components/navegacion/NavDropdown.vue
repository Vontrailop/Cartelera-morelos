<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div>
      <button 
        type="button" 
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        :class="buttonClass"
        id="menu-button" 
        aria-expanded="true" 
        aria-haspopup="true"
        @click="isOpen = !isOpen"
      >
        <slot name="button-content">
          {{ buttonText }}
        </slot>
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div 
      v-if="isOpen" 
      class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      :class="[position === 'left' ? 'left-0' : 'right-0', menuClass]"
      role="menu" 
      aria-orientation="vertical" 
      aria-labelledby="menu-button" 
      tabindex="-1"
      ref="menuRef"
    >
      <div class="py-1" role="none">
        <!-- Elementos de menú como enlaces -->
        <router-link 
          v-for="(item, index) in items.filter(i => i.to && !i.divider)"
          :key="`link-${index}`"
          :to="item.to"
          class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
          :class="item.class"
          role="menuitem" 
          tabindex="-1"
          @click="handleItemClick(item)"
        >
          <div class="flex items-center">
            <component 
              v-if="item.icon" 
              :is="item.icon" 
              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" 
              aria-hidden="true" 
            />
            {{ item.text }}
          </div>
        </router-link>

        <!-- Elementos de menú como botones -->
        <button
          v-for="(item, index) in items.filter(i => !i.to && !i.divider)"
          :key="`button-${index}`"
          type="button"
          class="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
          :class="item.class"
          role="menuitem"
          tabindex="-1"
          @click="handleItemClick(item)"
        >
          <div class="flex items-center">
            <component 
              v-if="item.icon" 
              :is="item.icon" 
              class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" 
              aria-hidden="true" 
            />
            {{ item.text }}
          </div>
        </button>

        <!-- Divisores -->
        <div 
          v-for="(item, index) in items.filter(i => i.divider)"
          :key="`divider-${index}`" 
          class="border-t border-gray-100 my-1"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    default: 'Opciones'
  },
  items: {
    type: Array,
    required: true,
    // Cada item debe tener: { text: string, to?: string, action?: Function, icon?: Component, divider?: boolean, class?: string }
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  buttonClass: {
    type: String,
    default: ''
  },
  menuClass: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['item-click']);

const isOpen = ref(false);
const dropdownRef = ref(null);
const menuRef = ref(null);

const handleItemClick = (item) => {
  if (item.action) {
    item.action();
  }
  emit('item-click', item);
  isOpen.value = false;
};

// Cerrar el menú cuando se hace clic fuera de él
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Métodos expuestos para el componente padre
  defineExpose({
    open: () => { isOpen.value = true; },
    close: () => { isOpen.value = false; },
    toggle: () => { isOpen.value = !isOpen.value; }
  });
</script>