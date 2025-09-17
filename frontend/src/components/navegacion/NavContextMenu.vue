<template>
  <div class="relative inline-block text-left">
    <div>
      <slot name="trigger">
        <button 
          type="button" 
          class="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          @click="toggleMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </slot>
    </div>

    <div 
      v-if="isOpen" 
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
      :class="positionClass"
      ref="menuRef"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <slot>
          <template v-for="(item, index) in items">
            <!-- Elemento de menú normal -->
            <template v-if="!item.divider && !item.hidden">
              <router-link 
                v-if="item.to" 
                :to="item.to"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                :class="item.class"
                role="menuitem"
                @click="handleItemClick(item)"
                :key="item.id || `${item.text}-${index}`"
              >
                <component 
                  v-if="item.icon" 
                  :is="item.icon" 
                  class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" 
                  aria-hidden="true" 
                />
                {{ item.text }}
              </router-link>
              
              <button 
                v-else
                type="button" 
                class="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                :class="[item.dangerous ? 'text-red-600 hover:text-red-700' : '', item.class]"
                role="menuitem" 
                @click="handleItemClick(item)"
                :key="item.id || `${item.text}-${index}`"
              >
                <component 
                  v-if="item.icon" 
                  :is="item.icon" 
                  :class="[
                    item.dangerous ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5'
                  ]" 
                  aria-hidden="true" 
                />
                {{ item.text }}
              </button>
            </template>
            
            <!-- Divisor -->
            <div v-else-if="item.divider && !item.hidden" :key="item.id || `divider-${item.text || index}`" class="border-t border-gray-100 my-1"></div>
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    // Cada item debe tener: { text: string, to?: string, action?: Function, icon?: Component, divider?: boolean, dangerous?: boolean, hidden?: boolean, class?: string }
  },
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'right', 'left'].includes(value)
  },
  closeOnClick: {
    type: Boolean,
    default: true
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['item-click', 'open', 'close']);

const isOpen = ref(false);
const menuRef = ref(null);

// Calcular la clase de posición del menú
const positionClass = computed(() => {
  switch (props.position) {
    case 'top-right':
      return 'origin-top-right right-0 mt-2';
    case 'top-left':
      return 'origin-top-left left-0 mt-2';
    case 'bottom-right':
      return 'origin-bottom-right right-0 mb-2 bottom-full';
    case 'bottom-left':
      return 'origin-bottom-left left-0 mb-2 bottom-full';
    case 'left':
      return 'origin-top-right right-full mr-2';
    case 'right':
    default:
      return 'origin-top-left left-full ml-2';
  }
});

// Alternar la visibilidad del menú
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    emit('open');
  } else {
    emit('close');
  }
};

// Manejar el clic en un elemento del menú
const handleItemClick = (item) => {
  if (item.action) {
    item.action();
  }
  emit('item-click', item);
  if (props.closeOnClick) {
    isOpen.value = false;
    emit('close');
  }
};

// Cerrar el menú cuando se hace clic fuera de él
const handleClickOutside = (event) => {
  if (props.closeOnClickOutside && menuRef.value && !menuRef.value.contains(event.target) && isOpen.value) {
    isOpen.value = false;
    emit('close');
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Exponer métodos para controlar el menú desde el componente padre
defineExpose({
  open: () => {
    isOpen.value = true;
    emit('open');
  },
  close: () => {
    isOpen.value = false;
    emit('close');
  },
  toggle: toggleMenu
});
</script>