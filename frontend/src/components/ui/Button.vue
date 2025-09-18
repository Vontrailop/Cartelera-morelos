<template>
  <button :class="buttonClasses">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'default',
  },
});

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
    {
      'bg-slate-900 text-slate-50 hover:bg-slate-900/90': props.variant === 'default',
      'bg-transparent border border-slate-200 hover:bg-slate-100': props.variant === 'outline',
      'text-slate-900 underline-offset-4 hover:underline': props.variant === 'link',
      'hover:bg-slate-100 hover:text-slate-900': props.variant === 'ghost',
    },
    {
      'h-10 px-4 py-2': props.size === 'default',
      'h-9 rounded-md px-3': props.size === 'sm',
      'h-11 rounded-md px-8': props.size === 'lg',
      'h-10 w-10': props.size === 'icon',
    },
  ];
});
</script>
