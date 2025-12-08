<template>
  <section id="location" class="py-24 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
          Find Us
        </div>
        <h2 class="text-4xl md:text-5xl mb-4">
          Visit Cruiser's Beach Resort
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Located in the beautiful coastal town of San Agustin, Philippines
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Map Image -->
        <div class="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1680170868966-e46b865b05f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGlsaXBwaW5lcyUyMG1hcCUyMGxvY2F0aW9ufGVufDF8fHx8MTc2NTA4Njg1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Map of Philippines showing San Agustin location"
            class="w-full h-full object-cover rounded-2xl shadow-lg"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent rounded-2xl"></div>
          <div class="absolute bottom-6 left-6 text-white">
            <p class="text-2xl">San Agustin, Philippines</p>
            <p class="text-emerald-200">Surigao del Sur Province</p>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl mb-2">Address</h3>
                <p class="text-gray-700">4 Salvacion Road</p>
                <p class="text-gray-700">8305 San Agustin</p>
                <p class="text-gray-700">Philippines</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl mb-2">Contact</h3>
                <p class="text-gray-700">+63 XXX XXX XXXX</p>
                <p class="text-gray-700">reservations@cruisersbeach.ph</p>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl mb-2">Check-in / Check-out</h3>
                <p class="text-gray-700">Check-in: 2:00 PM</p>
                <p class="text-gray-700">Check-out: 12:00 PM</p>
              </div>
            </div>
          </div>

          <button class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg">
            <MapPin class="w-5 h-5" />
            Get Directions
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPin, Phone, Clock } from 'lucide-vue-next'
</script>
