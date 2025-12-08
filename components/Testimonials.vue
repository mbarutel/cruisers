<template>
  <section id="testimonials" class="py-24 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
          Guest Reviews
        </div>
        <h2 class="text-4xl md:text-5xl mb-4">
          Stories from Our Guests
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover why travelers from around the world choose Paradise Bay Resort.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100"
        >
          <div class="flex gap-1 mb-4">
            <Star
              v-for="i in testimonial.rating"
              :key="i"
              class="w-5 h-5 fill-emerald-500 text-emerald-500"
            />
          </div>
          <p class="text-gray-700 mb-6">{{ testimonial.content }}</p>
          <div class="flex items-center gap-4">
            <ImageWithFallback
              :src="testimonial.image"
              :alt="testimonial.name"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div>{{ testimonial.name }}</div>
              <div class="text-gray-600">{{ testimonial.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'

interface Testimonial {
  name: string
  role: string
  image: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: 'Maria Santos',
    role: 'Honeymooner from Manila',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    content: 'The most magical place for our honeymoon! The sunset views, private beach, and warm hospitality made our stay unforgettable. Pure paradise!',
    rating: 5,
  },
  {
    name: 'James Anderson',
    role: 'Travel Blogger',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    content: 'I\'ve visited resorts all over Southeast Asia, and this is hands down one of the best. The natural beauty is unmatched, and the staff treats you like family.',
    rating: 5,
  },
  {
    name: 'Sofia Reyes',
    role: 'Family Vacation',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    content: 'Our family had the best week here! The kids loved the beach, we enjoyed the spa, and the island hopping tour was incredible. Already planning our return!',
    rating: 5,
  },
]
</script>
