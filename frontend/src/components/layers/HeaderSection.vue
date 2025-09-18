<template>
  <!-- Barra full-width fija -->
  <header class="fixed top-0 left-0 right-0 z-[9999] bg-white shadow-md">
    <!-- Contenido centrado -->
    <div class="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <img :src="logoCM" alt="Logo Cartelera Morelos" class="w-[60px] h-[60px] object-contain" />
        <img :src="logoText" alt="Cartelera Morelos" class="w-[160px] h-[60px] object-contain" />
      </div>

      <!-- Menú de escritorio -->
      <nav class="hidden md:flex items-center space-x-10">
        <router-link
          v-for="link in navLinks"
          :key="link.text"
          :to="link.to"
          class="no-underline text-gray-700 hover:text-teal-600 transition-colors"
          style="padding: 2em;"
        >
          {{ link.text }}
        </router-link>
        <div class="w-8 h-8 bg-gray-200 rounded-full" aria-hidden="true"></div>
      </nav>

      <!-- Botón de hamburguesa para móvil -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="text-gray-700 hover:text-teal-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú móvil (overlay) -->
    <div v-if="isMenuOpen" class="md:hidden">
      <nav class="flex flex-col items-center space-y-4 py-4">
        <router-link
          v-for="link in navLinks"
          :key="link.text"
          :to="link.to"
          class="no-underline text-gray-700 hover:text-teal-600 transition-colors"
          @click="isMenuOpen = false"
        >
          {{ link.text }}
        </router-link>
        <div class="w-8 h-8 bg-gray-200 rounded-full" aria-hidden="true"></div>
      </nav>
    </div>
  </header>

</template>

<script setup>
import { ref } from 'vue';
import logoCM from '@/assets/images/3.png';
import logoText from '@/assets/images/cartelera-morelos-texto.png';

const isMenuOpen = ref(false);

const navLinks = [
  { text: 'Inicio', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Blog', to: '#' },
  { text: 'Eventos', to: '#' },
  { text: 'Servicios', to: '#' },
  { 'text': 'Contacto', to: '#' }
];
</script>

<style scoped>
/* Fallback por si algo global lo sobreescribe */
header {
  background: #ffffff !important;
}
.font-bukhari { font-family: 'Bukhari Script', cursive; }
.font-facad { font-family: 'FACAD', sans-serif; }
</style>