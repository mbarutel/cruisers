<template>
  <section id="features" class="py-24 bg-gradient-to-b from-emerald-50 to-teal-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-block bg-white text-emerald-700 px-4 py-2 rounded-full mb-4 shadow-sm">
          Resort Amenities
        </div>
        <h2 class="text-4xl md:text-5xl mb-4">
          Everything for Your Perfect Getaway
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Immerse yourself in nature while enjoying world-class amenities and Filipino hospitality.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white p-8 rounded-2xl hover:shadow-lg transition-shadow border border-emerald-100"
        >
          <div class="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mb-4">
            <component :is="feature.icon" class="w-6 h-6 text-emerald-600" />
          </div>
          <h3 class="text-2xl mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Waves, Palmtree, UtensilsCrossed, Wifi, Wind, Flower2 } from 'lucide-vue-next'
import type { Component } from 'vue'

interface Feature {
  icon: Component
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Waves,
    title: 'Private Beach Access',
    description: 'Exclusive access to pristine white sand beaches and crystal-clear turquoise waters.',
  },
  {
    icon: Palmtree,
    title: 'Tropical Gardens',
    description: 'Stroll through lush gardens filled with native Philippine flora and palm trees.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Island Cuisine',
    description: 'Savor fresh seafood and authentic Filipino dishes at our beachfront restaurant.',
  },
  {
    icon: Wind,
    title: 'Water Sports',
    description: 'Snorkeling, diving, kayaking, and island hopping adventures await.',
  },
  {
    icon: Flower2,
    title: 'Spa & Wellness',
    description: 'Rejuvenate with traditional Filipino hilot massage and natural treatments.',
  },
  {
    icon: Wifi,
    title: 'Modern Comfort',
    description: 'Stay connected with high-speed WiFi while surrounded by natural beauty.',
  },
]
</script>
