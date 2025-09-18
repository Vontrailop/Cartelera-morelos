<template>
  <section class="py-12 bg-black">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl font-bukhari text-center text-white mb-8">Días Random</h2>
      <div class="aspect-w-16 aspect-h-9 relative">
        <img src="@/assets/images/cuernavaca.jpg" alt="Video placeholder" class="w-full h-full object-cover">
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-24 h-24 text-white opacity-70" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}
.aspect-h-9 > img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
