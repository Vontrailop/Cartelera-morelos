<template>
  <section class="relative w-full min-h-[85vh] overflow-hidden">
    <!-- Fondo -->
    <img
      :src="bgSrc"
      :alt="bgAlt"
      class="absolute inset-0 h-full w-full object-cover object-center"
      style="filter: brightness(40%)"
    />

    <!-- Contenido -->
    <div
      class="relative z-10 mx-auto max-w-6xl px-4 h-full
                 flex flex-col items-center justify-center text-center"
    >
      <!-- Título como imagen -->
      <img
        :src="titleImgSrc"
        :alt="titleAlt"
        loading="eager"
        style="height: 40%; margin-top: 10em"
      />

      <!-- Subtítulo -->
      <p  style="font-size: 28px; color: #ffffff;">
        {{ subtitle }}
      </p>

      <!-- CTA -->
      <p
        :href="ctaHref"
        class="p-6 mt-5 inline-flex items-center justify-center rounded-full
               border border-white/80 px-6 md:px-8 py-2.5
               text-white/95 text-sm md:text-base
               backdrop-blur-[2px] hover:bg-white/10 transition"
        style="font-size: 36px; color: #f1f1f1; padding: 1px 2em 1px 2em; margin-top: 1em;"
      >
        {{ ctaLabel }}
      </p>
    </div>
  </section>
</template>

<script setup>
import heroDefault from '@/assets/images/cuernavaca.jpg'
import titleDefault from '@/assets/images/cartelera-morelos-3.png'
import {computed} from "vue";

const props = defineProps({
  bgSrc: { type: String, default: heroDefault },
  bgAlt: { type: String, default: 'Fondo Cartelera Morelos' },
  titleImgSrc: { type: String, default: titleDefault },
  titleAlt: { type: String, default: 'Cartelera Morelos' },
  subtitle: {
    type: String,
    default: 'Descubre las actividades culturales y las recomendaciones en Morelos y alrededores.'
  },
  ctaLabel: { type: String, default: 'Explorar Ahora' },
  ctaHref: { type: String, default: '#' },
  overlay: { type: String, default: 'gradient' }, // 'gradient' | 'solid'
  overlayOpacity: { type: Number, default: 0.55 }, // si overlay === 'solid'
})

const overlayStyle = computed(() =>
  props.overlay === 'gradient'
    ? { background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)' }
    : { background: `rgba(0,0,0,${props.overlayOpacity})` }
)

// contorno visible del título (imagen)
const titleShadow = {
  filter:
    'drop-shadow(0 10px 24px rgba(0,0,0,0.45)) drop-shadow(0 2px 0 rgba(0,0,0,0.25))'
}
</script>
