<script setup>
import HeaderSection from "@/components/layers/HeaderSection.vue";
import HeroSection from "@/components/HeroSection.vue";
import CarteleraSection from "@/components/CarteleraSection.vue";
import CulturaOcioSection from "@/components/CulturaOcioSection.vue";
import VideoSection from "@/components/VideoSection.vue";
import MapSection from "@/components/MapSection.vue";
import ServiciosSection from "@/components/ServiciosSection.vue";
import TalleresSection from "@/components/TalleresSection.vue";
import FooterSection from "@/components/layers/FooterSection.vue";
import { ref } from 'vue';
import img1 from '@/assets/images/3.png';
import img2 from '@/assets/images/1.png';
import img3 from '@/assets/images/2.png';

const carteleraItems = ref([
  { id: 1, imageUrl: img1, alt: 'Evento 1' },
  { id: 2, imageUrl: img2, alt: 'Evento 2' },
  { id: 3, imageUrl: img3, alt: 'Evento 3' },
  { id: 4, imageUrl: img1, alt: 'Evento 4' },
  { id: 5, imageUrl: img2, alt: 'Evento 5' },
]);

const talleres = ref([
  {
    id: 1,
    title: 'Curso de Iluminación Escénica',
    description: 'Aprende los secretos de la iluminación escénica con nuestro curso intensivo.',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Taller+de+Iluminación',
    imageAlt: 'Taller de Iluminación',
    tags: ['iluminacion', 'teatro', 'talleres'],
  },
  {
    id: 2,
    title: 'Taller de Actuación',
    description: 'Explora tu potencial actoral y desarrolla tus habilidades en el escenario.',
    imageUrl: 'https://via.placeholder.com/400x300.png?text=Taller+de+Actuación',
    imageAlt: 'Taller de Actuación',
    tags: ['actuacion', 'teatro', 'desarrollo'],
  },
]);

const servicios = ref([
  {
    id: 1,
    title: 'Plan Visual Express',
    description: 'Ideal para eventos pequeños o recurrentes (café, bar, teatro, local).',
    features: [
      '1 cartel vertical en formato impreso y digital',
      'Adaptación a stories y post cuadrado para Instagram',
      'Diseño en 72 h hábiles',
      'Publicación en CarteleraMorelos.com',
    ],
  },
]);
</script>

<template>
  <main>
    <HeaderSection />
    <HeroSection />

    <CarteleraSection :items="carteleraItems" />
    <CulturaOcioSection />
    <VideoSection />
    <MapSection />
    <ServiciosSection :servicios="servicios" />
    <TalleresSection :talleres="talleres" />
    <FooterSection />
  </main>
</template>
