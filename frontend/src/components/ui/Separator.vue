<template>
  <div class="shrink-0 bg-slate-200" :class="orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'"></div>
</template>

<script setup>
defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
  },
});
</script>
