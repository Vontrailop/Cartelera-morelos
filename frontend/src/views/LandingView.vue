<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Cartelera Morelos</h1>
            <p class="text-xl mb-8">Descubre los mejores eventos en Morelos. Conciertos, exposiciones, teatro, deportes y mucho más.</p>
            <div class="flex flex-wrap gap-4">
              <router-link to="/eventos" class="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-lg transition duration-300">
                Ver Eventos
              </router-link>
              <router-link to="/login" class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Iniciar Sesión
              </router-link>
            </div>
          </div>
          <div class="md:w-1/2">
            <img src="@/assets/images/hero-image.svg" alt="Eventos en Morelos" class="rounded-lg shadow-xl">
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Events Section -->
    <section class="featured-events py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Eventos Destacados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Event Card 1 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <img src="@/assets/images/event1.svg" alt="Evento 1" class="w-full h-48 object-cover">
            <div class="p-6">
              <span class="text-sm text-blue-600 font-semibold">10 Oct, 2023</span>
              <h3 class="text-xl font-bold mb-2">Festival de Música en Cuernavaca</h3>
              <p class="text-gray-600 mb-4">Un evento imperdible con los mejores artistas locales e internacionales.</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-800 font-bold">$250 MXN</span>
                <router-link to="/eventos/1" class="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</router-link>
              </div>
            </div>
          </div>
          
          <!-- Event Card 2 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <img src="@/assets/images/event2.svg" alt="Evento 2" class="w-full h-48 object-cover">
            <div class="p-6">
              <span class="text-sm text-blue-600 font-semibold">15 Oct, 2023</span>
              <h3 class="text-xl font-bold mb-2">Exposición de Arte Contemporáneo</h3>
              <p class="text-gray-600 mb-4">Descubre las obras de los artistas más innovadores de la región.</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-800 font-bold">Entrada Libre</span>
                <router-link to="/eventos/2" class="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</router-link>
              </div>
            </div>
          </div>
          
          <!-- Event Card 3 -->
          <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <img src="@/assets/images/event3.svg" alt="Evento 3" class="w-full h-48 object-cover">
            <div class="p-6">
              <span class="text-sm text-blue-600 font-semibold">22 Oct, 2023</span>
              <h3 class="text-xl font-bold mb-2">Teatro en el Centro Histórico</h3>
              <p class="text-gray-600 mb-4">Una obra clásica representada por el mejor elenco de la ciudad.</p>
              <div class="flex justify-between items-center">
                <span class="text-gray-800 font-bold">$180 MXN</span>
                <router-link to="/eventos/3" class="text-blue-600 hover:text-blue-800 font-medium">Ver detalles</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/eventos" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            Ver todos los eventos
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Explora por Categorías</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="category-card bg-blue-100 rounded-lg p-6 text-center hover:bg-blue-200 transition duration-300">
            <div class="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-music text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Música</h3>
          </div>
          <div class="category-card bg-green-100 rounded-lg p-6 text-center hover:bg-green-200 transition duration-300">
            <div class="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-theater-masks text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Teatro</h3>
          </div>
          <div class="category-card bg-yellow-100 rounded-lg p-6 text-center hover:bg-yellow-200 transition duration-300">
            <div class="bg-yellow-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-palette text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Arte</h3>
          </div>
          <div class="category-card bg-red-100 rounded-lg p-6 text-center hover:bg-red-200 transition duration-300">
            <div class="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-futbol text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold">Deportes</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">¿Organizas eventos en Morelos?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Publica tus eventos en nuestra plataforma y llega a miles de personas interesadas en actividades culturales y de entretenimiento.</p>
        <router-link to="/registro" class="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-lg transition duration-300">
          Registra tu evento
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingView',
  components: {},
  setup() {
    return {};
  }
}
</script>

<style scoped>
.hero {
  background-size: cover;
  background-position: center;
}
</style>