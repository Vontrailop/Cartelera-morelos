<script setup>
import footerImage from '@/assets/images/3.png'
import Button from '@/components/ui/Button.vue'
import Separator from '@/components/ui/Separator.vue'
import { Facebook, Instagram, Twitter } from 'lucide-vue-next'

const menuLinks = [
  { text: 'Blog', href: 'https://carteleramorelos.com/blog/' },
  { text: 'Cine / Teatro / Danza', href: 'https://carteleramorelos.com/cine-teatro-danza/' },
  { text: 'Cursos / Talleres / Conferencias', href: 'https://carteleramorelos.com/cursos-talleres-conferencias/' },
  { text: 'Directorio', href: 'https://carteleramorelos.com/directorio/' },
  { text: 'Eventos', href: 'https://carteleramorelos.com/eventos/' },
  { text: 'Inicio', href: 'https://carteleramorelos.com/' },
  { text: 'Música', href: 'https://carteleramorelos.com/musica/' }
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/' },
  { icon: Instagram, href: 'https://instagram.com/' },
  { icon: Twitter, href: 'https://twitter.com/' }
]
</script>

<template>
  <footer class="flex flex-col w-full items-start gap-[75px] px-4 py-12 bg-[#2f2f2f] md:px-8 lg:px-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 lg:gap-[80px]">
      <!-- Menu Column -->
      <div class="flex flex-col items-start gap-5">
        <div class="w-full">
          <h3 class="font-carteleramorelos-com-semantic-heading-3 text-white">
            Menu
          </h3>
        </div>
        <nav class="flex flex-col items-start gap-[10.7px]">
          <a
            v-for="(link, index) in menuLinks"
            :key="index"
            :href="link.href"
            class="text-white text-base leading-6 whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.text }}
          </a>
        </nav>
      </div>

      <!-- Logo Column -->
      <div class="flex flex-col items-center justify-center">
        <div
          class="relative w-[161px] h-[161px] bg-cover bg-[50%_50%]"
          :style="{ backgroundImage: `url(${footerImage})` }"
        ></div>
      </div>

      <!-- Contact Column -->
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-4">
          <h3 class="font-carteleramorelos-com-semantic-heading-3 text-white text-center whitespace-nowrap">
            Contacto
          </h3>
          <p class="text-white text-base text-center leading-6 whitespace-nowrap">
            contacto@carteleramorelos.com
          </p>
          <a
            href="https://chat.whatsapp.com/DWoiT4i55Py9IzvJQ0kY8V"
            class="underline text-white text-center whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            GRUPO WHATSAPP
          </a>
        </div>

        <div class="flex flex-col items-center gap-4">
          <h3 class="font-carteleramorelos-com-semantic-heading-3 text-white text-center whitespace-nowrap">
            Redes Sociales
          </h3>
          <div class="flex items-center justify-center gap-[7px]">
            <Button
              v-for="(social, index) in socialLinks"
              :key="index"
              variant="ghost"
              size="icon"
              class="rounded-full p-0 h-auto"
            >
              <a :href="social.href" target="_blank" rel="noopener noreferrer">
                <component :is="social.icon" class="w-6 h-6 text-white" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <Separator class="bg-gray-700 w-full" />

    <div class="flex w-full items-center justify-center">
      <p class="text-white text-xs text-center leading-[18px] whitespace-nowrap">
        <span>© 2025 Cartelera Morelos. Creada por </span>
        <a
          href="http://tblackbox.com/"
          class="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          TBlackbox
        </a>
      </p>
    </div>
  </footer>
</template>
