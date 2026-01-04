<template>
  <div class="relative">
    <!-- Navigation - Absolute positioned over hero -->
    <nav class="absolute top-0 left-0 right-0 z-20 container mx-auto px-6 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
          <span class="text-xl text-white drop-shadow-lg">Cruiser's Beach Resort</span>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-white hover:text-emerald-200 transition-colors drop-shadow-lg">Amenities</a>
          <a href="#testimonials" class="text-white hover:text-emerald-200 transition-colors drop-shadow-lg">Reviews</a>
          <a href="#location" class="text-white hover:text-emerald-200 transition-colors drop-shadow-lg">Location</a>
          <a href="#contact" class="text-white hover:text-emerald-200 transition-colors drop-shadow-lg">Contact</a>
        </div>

        <div class="flex items-center gap-4">
          <a :href="links.booking" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg">
            Book Now
          </a>
          <button class="md:hidden text-white">
            <Menu class="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section with Full Background Image -->
    <div class="relative h-screen min-h-[600px]">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Cruiser's Beach Resort - Paradise Island"
          class="w-full h-full object-cover"
        />
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
      </div>

      <!-- Hero Content -->
      <div class="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div class="max-w-3xl text-white">
          <div class="text-white mb-6">
            🌴 Your Tropical Paradise in San Agustin, Test
          </div>
          <h1 class="text-5xl md:text-7xl mb-6 drop-shadow-2xl">
            CRUISER'S BEACH RESORT
          </h1>
          <p class="text-2xl md:text-3xl mb-4 drop-shadow-lg text-emerald-50">
            Experience the Natural Beauty of the Philippines
          </p>
          <div class="flex items-start gap-2 mb-8 text-lg drop-shadow-lg">
            <MapPin class="w-6 h-6 flex-shrink-0 mt-1 text-emerald-300" />
            <span>4 Salvacion Road, 8305 San Agustin, Philippines</span>
          </div>
          <div class="flex flex-col sm:flex-row gap-4">
            <a :href="links.booking" target="_blank" rel="noopener noreferrer" class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-xl">
              Reserve Your Stay
              <ArrowRight class="w-5 h-5" />
            </a>
            <button
              @click="scrollToLocation"
              class="border-2 border-white bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg hover:bg-white/20 transition-all shadow-xl"
            >
              Contact Us
            </button>
          </div>
          <div class="mt-12 flex items-center gap-8">
            <div>
              <div class="text-4xl drop-shadow-lg">50+</div>
              <div class="text-emerald-100">Rooms</div>
            </div>
            <div>
              <div class="text-4xl drop-shadow-lg">100%</div>
              <div class="text-emerald-100">Ocean View</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div class="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div class="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Menu, MapPin } from 'lucide-vue-next'

const { links } = useAppConfig()

const scrollToLocation = () => {
  const locationSection = document.getElementById('location')
  if (locationSection) {
    locationSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
