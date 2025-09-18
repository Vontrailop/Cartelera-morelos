<template>
  <div class="w-full bg-white">
    <!-- Barra de búsqueda -->
    <form
      @submit.prevent="onSubmit"
      class="w-full max-w-[520px] ml-auto mr-6 mt-6"
      role="search"
      aria-label="Buscar eventos"
    >
      <div
        class="flex items-center gap-3 rounded-full border border-neutral-200 bg-white shadow-sm pl-4 pr-2 h-12 focus-within:ring-2 focus-within:ring-teal-400"
      >
        <!-- Icono lupa -->
        <svg class="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" stroke-width="2"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
        </svg>

        <input
          v-model="query"
          type="search"
          placeholder="Buscar eventos"
          class="flex-1 outline-none bg-transparent text-[15px] placeholder:text-neutral-400"
          @keyup.enter="onSubmit"
          aria-label="Buscar eventos por título o descripción"
        />

        <button
          type="submit"
          class="px-5 py-2 rounded-full bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition"
        >
          Buscar
        </button>
      </div>

      <!-- contador / limpiar -->
      <div class="flex items-center gap-3 mt-2 text-sm text-neutral-500">
        <span v-if="query">Resultados: {{ filteredEvents.length }}</span>
        <button v-if="query" type="button" @click="clearQuery" class="underline hover:text-neutral-700">
          Limpiar
        </button>
      </div>
    </form>

    <!-- Carrusel -->
    <swiper
      :modules="[EffectCoverflow, Pagination, Navigation]"
      effect="coverflow"
      grab-cursor="true"
      centered-slides="true"
      slides-per-view="auto"
      :coverflow-effect="{ rotate: 0, stretch: 0, depth: 250, modifier: 1, slideShadows: false }"
      navigation
      pagination
      class="mySwiper"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="(event, index) in filteredEvents"
        :key="event.id"
        class="flex justify-center items-center"
      >
        <Card
          class="flex flex-col items-start relative rounded-lg overflow-hidden shadow-lg w-full h-full"
        >
          <CardContent class="p-0 relative w-full">
            <div
              :class="`relative w-full ${event.imageHeight} rounded-lg bg-cover bg-center`"
              :style="{ backgroundImage: `url(${event.image})` }"
            />
            <div
              :class="`flex flex-col ${event.contentWidth} ${event.contentHeight} items-start gap-[9px] ${event.contentPadding} absolute ${event.contentTop} left-[15px]`"
            >
              <div class="h-14 flex flex-col items-start w-full">
                <h2 class="font-titulos-articulos text-[#4e4e4e]">
                  {{ event.title }}
                </h2>
              </div>

              <div :class="`${index === 0 ? 'h-[183px]' : ''} flex flex-col items-start w-full`">
                <p class="font-texto-articulo text-[#638784]">
                  {{ event.description }}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </swiper-slide>
    </swiper>

    <!-- vacío -->
    <div v-if="!filteredEvents.length" class="w-full flex justify-center py-16 text-neutral-500">
      No hay eventos que coincidan con “{{ query }}”.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'

// === búsqueda ===
const query = ref('')
const strip = (s) =>
  (s || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "") // quita acentos

// usa tu eventData existente
const eventData = [
  {
    id: 1,
    title: "Prófugos del Asilo",
    description: "Concierto de rock en vivo.",
    image: "https://placehold.co/250x300",
    imageHeight: "h-[300px]",
    contentTop: "top-[310px]",
    contentWidth: "w-full",
    contentHeight: "h-[90px]",
    contentPadding: "p-2",
  },
  {
    id: 2,
    title: "Noiz Fest",
    description: "Festival alternativo en Cuernavaca.",
    image: "https://placehold.co/300x350",
    imageHeight: "h-[350px]",
    contentTop: "top-[360px]",
    contentWidth: "w-full",
    contentHeight: "h-[90px]",
    contentPadding: "p-2",
  },
  {
    id: 3,
    title: "Mandalas para el alma",
    description: "Taller de mandalas y meditación.",
    image: "https://placehold.co/250x300",
    imageHeight: "h-[300px]",
    contentTop: "top-[310px]",
    contentWidth: "w-full",
    contentHeight: "h-[90px]",
    contentPadding: "p-2",
  },
];

// filtra por título/description (y opcionalmente tags si las agregas)
const filteredEvents = computed(() => {
  const q = strip(query.value)
  if (!q) return eventData
  return eventData.filter(e =>
    strip(e.title).includes(q) ||
    strip(e.description).includes(q)
  )
})

const clearQuery = () => (query.value = '')

// === reset del carrusel al filtrar ===
const swiperRef = ref(null)
const onSwiper = (instance) => (swiperRef.value = instance)
watch(filteredEvents, (list) => {
  if (swiperRef.value && list.length) swiperRef.value.slideTo(0, 0)
})

const onSubmit = () => {
  // opcional: aseguras ir al primer slide al “buscar”
  if (swiperRef.value && filteredEvents.value.length) swiperRef.value.slideTo(0, 300)
}
</script>

<style scoped>
.mySwiper {
  width: 100%;
  max-width: 1200px;
  height: 520px;
  padding: 20px 0;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 450px;
}
</style>
