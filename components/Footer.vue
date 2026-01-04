<template>
  <footer class="bg-gray-900 text-gray-300 py-16">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg"></div>
            <span class="text-xl text-white">Cruiser's Beach Resort</span>
          </div>
          <p class="mb-4">
            Your gateway to tropical paradise in San Agustin, Philippines.
          </p>
          <div class="flex gap-4">
            <a :href="links.social.facebook" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a :href="links.social.instagram" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
            <a :href="`tel:${links.phone}`" class="hover:text-emerald-400 transition-colors">
              <Phone class="w-5 h-5" />
            </a>
            <a :href="`mailto:${links.email}`" class="hover:text-emerald-400 transition-colors">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-white mb-4">Accommodations</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Deluxe Rooms</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Ocean View Suites</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Beach Villas</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Family Cottages</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white mb-4">Experiences</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Island Hopping</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Diving & Snorkeling</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Spa Treatments</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">Cultural Tours</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-white mb-4">Contact</h3>
          <ul class="space-y-2">
            <li><a :href="links.booking" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">Reservations</a></li>
            <li><a :href="links.googleMaps" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-400 transition-colors">Directions</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">FAQs</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition-colors">About Us</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2025 Cruiser's Beach Resort. All rights reserved.</p>
          <div class="flex gap-6">
            <a :href="links.legal.privacy" class="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a :href="links.legal.terms" class="hover:text-emerald-400 transition-colors">Terms of Service</a>
            <a :href="links.legal.bookingPolicy" class="hover:text-emerald-400 transition-colors">Booking Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Mail, Phone } from 'lucide-vue-next'

const { links } = useAppConfig()
</script>
