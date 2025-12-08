<template>
  <section class="py-24 bg-white">
    <div class="container mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
          Discover Paradise
        </div>
        <h2 class="text-4xl md:text-5xl mb-4">
          About Cruiser's Beach Resort
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Nestled along the pristine shores of San Agustin, Philippines, Cruiser's Beach Resort offers
          an unforgettable tropical escape. Experience the perfect blend of natural beauty,
          comfortable accommodations, and warm Filipino hospitality.
        </p>
      </div>

      <!-- Image Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/about-3.png"
            alt="Resort beach view"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/about-2.png"
            alt="Resort amenities"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img
            src="/images/about-1.png"
            alt="Resort activities"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
