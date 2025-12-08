<template>
  <section class="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl text-white mb-6">
            Your Island Paradise is Waiting
          </h2>
          <p class="text-xl text-emerald-50 mb-8">
            Book your dream vacation today and experience the natural wonders of the Philippines. Limited rooms available for peak season.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
              Book Your Stay
              <ArrowRight class="w-5 h-5" />
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">
              View Packages
            </button>
          </div>
          <div class="mt-8 text-emerald-50">
            <p>✓ Best price guarantee</p>
            <p>✓ Free cancellation up to 48 hours</p>
            <p>✓ Complimentary airport transfer</p>
          </div>
        </div>

        <div class="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1672841828482-45faa4c70e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0fGVufDF8fHx8MTc2NTAyOTQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Tropical sunset at Paradise Bay"
            class="rounded-2xl shadow-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>
