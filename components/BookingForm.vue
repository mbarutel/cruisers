<template>
  <section id="booking" class="py-24 bg-gradient-to-b from-white to-emerald-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <div class="inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full mb-4">
          Book Your Stay
        </div>
        <h2 class="text-4xl md:text-5xl mb-4">
          Reserve Your Paradise Getaway
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Fill out the form below and we'll get back to you within 24 hours to confirm your reservation.
        </p>
      </div>

      <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Room Type Selection -->
          <div>
            <label class="block text-lg mb-3">Room Type *</label>
            <div class="grid md:grid-cols-3 gap-4">
              <button
                v-for="room in roomTypes"
                :key="room"
                type="button"
                @click="formData.roomType = room"
                :class="[
                  'p-4 border-2 rounded-lg transition-all text-left',
                  formData.roomType === room
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-emerald-300'
                ]"
              >
                {{ room }}
              </button>
            </div>
            <p v-if="errors.roomType" class="text-red-600 text-sm mt-1">{{ errors.roomType }}</p>
          </div>

          <!-- Date Selection -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg mb-3">Check-in Date *</label>
              <DatePicker
                v-model="formData.checkIn"
                mode="date"
                :min-date="new Date()"
                :attributes="dateAttributes"
                class="w-full"
              >
                <template #default="{ togglePopover }">
                  <button
                    type="button"
                    @click="togglePopover"
                    class="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span :class="formData.checkIn ? 'text-gray-900' : 'text-gray-400'">
                      {{ formData.checkIn ? formatDate(formData.checkIn) : 'Select check-in date' }}
                    </span>
                    <Calendar class="w-5 h-5 text-gray-400" />
                  </button>
                </template>
              </DatePicker>
              <p v-if="errors.checkIn" class="text-red-600 text-sm mt-1">{{ errors.checkIn }}</p>
            </div>

            <div>
              <label class="block text-lg mb-3">Check-out Date *</label>
              <DatePicker
                v-model="formData.checkOut"
                mode="date"
                :min-date="minCheckOutDate"
                :attributes="dateAttributes"
                class="w-full"
              >
                <template #default="{ togglePopover }">
                  <button
                    type="button"
                    @click="togglePopover"
                    class="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-emerald-300 transition-colors flex items-center justify-between"
                  >
                    <span :class="formData.checkOut ? 'text-gray-900' : 'text-gray-400'">
                      {{ formData.checkOut ? formatDate(formData.checkOut) : 'Select check-out date' }}
                    </span>
                    <Calendar class="w-5 h-5 text-gray-400" />
                  </button>
                </template>
              </DatePicker>
              <p v-if="errors.checkOut" class="text-red-600 text-sm mt-1">{{ errors.checkOut }}</p>
            </div>
          </div>

          <!-- Guest Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg mb-3">Adults *</label>
              <select
                v-model.number="formData.adults"
                class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
              >
                <option :value="1">1 Adult</option>
                <option :value="2">2 Adults</option>
                <option :value="3">3 Adults</option>
                <option :value="4">4 Adults</option>
                <option :value="5">5 Adults</option>
                <option :value="6">6+ Adults</option>
              </select>
              <p v-if="errors.adults" class="text-red-600 text-sm mt-1">{{ errors.adults }}</p>
            </div>

            <div>
              <label class="block text-lg mb-3">Children</label>
              <select
                v-model.number="formData.children"
                class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 transition-colors"
              >
                <option :value="0">No Children</option>
                <option :value="1">1 Child</option>
                <option :value="2">2 Children</option>
                <option :value="3">3 Children</option>
                <option :value="4">4+ Children</option>
              </select>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-lg mb-3">Full Name *</label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="John Doe"
                class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <p v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</p>
            </div>

            <div>
              <label class="block text-lg mb-3">Email Address *</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="john@example.com"
                class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</p>
            </div>
          </div>

          <div>
            <label class="block text-lg mb-3">Phone Number *</label>
            <input
              v-model="formData.phone"
              type="tel"
              placeholder="+63 999 123 4567"
              class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors"
            />
            <p v-if="errors.phone" class="text-red-600 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <!-- Special Requests -->
          <div>
            <label class="block text-lg mb-3">Special Requests (Optional)</label>
            <textarea
              v-model="formData.specialRequests"
              rows="4"
              placeholder="Any special requirements or requests?"
              class="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-5 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Submit Booking Request</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
              <ArrowRight v-if="!isSubmitting" class="w-5 h-5" />
            </button>
          </div>

          <!-- Success Message -->
          <div
            v-if="submitSuccess"
            class="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-lg text-emerald-800"
          >
            <p class="font-semibold">Booking request sent successfully!</p>
            <p class="text-sm mt-1">We'll get back to you within 24 hours at {{ formData.email }}</p>
          </div>

          <!-- Error Message -->
          <div
            v-if="submitError"
            class="p-4 bg-red-50 border-2 border-red-500 rounded-lg text-red-800"
          >
            <p class="font-semibold">Failed to send booking request</p>
            <p class="text-sm mt-1">{{ submitError }}</p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { DatePicker } from 'v-calendar'
import { Calendar, ArrowRight } from 'lucide-vue-next'
import 'v-calendar/style.css'

const roomTypes = [
  'Bungalow - Beach Front',
  'Delux Double Room with Sea View',
  'Family Bungalow'
]

interface BookingFormData {
  roomType: string
  checkIn: Date | null
  checkOut: Date | null
  adults: number
  children: number
  name: string
  email: string
  phone: string
  specialRequests: string
}

const formData = ref<BookingFormData>({
  roomType: '',
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  name: '',
  email: '',
  phone: '',
  specialRequests: ''
})

const errors = ref<Partial<Record<keyof BookingFormData, string>>>({})
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const minCheckOutDate = computed(() => {
  if (!formData.value.checkIn) return new Date()
  const minDate = new Date(formData.value.checkIn)
  minDate.setDate(minDate.getDate() + 1)
  return minDate
})

const dateAttributes = [
  {
    key: 'today',
    highlight: {
      color: 'emerald',
      fillMode: 'light'
    },
    dates: new Date()
  }
]

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!formData.value.roomType) {
    errors.value.roomType = 'Please select a room type'
    isValid = false
  }

  if (!formData.value.checkIn) {
    errors.value.checkIn = 'Please select a check-in date'
    isValid = false
  }

  if (!formData.value.checkOut) {
    errors.value.checkOut = 'Please select a check-out date'
    isValid = false
  }

  if (formData.value.checkIn && formData.value.checkOut && formData.value.checkOut <= formData.value.checkIn) {
    errors.value.checkOut = 'Check-out must be after check-in'
    isValid = false
  }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Please enter your name'
    isValid = false
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'Please enter your email'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Please enter your phone number'
    isValid = false
  }

  if (!formData.value.adults || formData.value.adults < 1) {
    errors.value.adults = 'Please select number of adults'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  submitSuccess.value = false
  submitError.value = ''

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await $fetch('/api/booking', {
      method: 'POST',
      body: {
        roomType: formData.value.roomType,
        checkIn: formData.value.checkIn?.toISOString(),
        checkOut: formData.value.checkOut?.toISOString(),
        adults: formData.value.adults,
        children: formData.value.children,
        name: formData.value.name,
        email: formData.value.email,
        phone: formData.value.phone,
        specialRequests: formData.value.specialRequests
      }
    })

    submitSuccess.value = true
    
    // Reset form after successful submission
    setTimeout(() => {
      formData.value = {
        roomType: '',
        checkIn: null,
        checkOut: null,
        adults: 2,
        children: 0,
        name: '',
        email: '',
        phone: '',
        specialRequests: ''
      }
      submitSuccess.value = false
    }, 5000)
  } catch (error: any) {
    submitError.value = error.data?.message || 'Please try again later or contact us directly.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
