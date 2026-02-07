declare module 'nuxt/schema' {
  interface AppConfigInput {
    links?: {
      googleMaps?: string
      phone?: string
      email?: string
      social?: {
        facebook?: string
        instagram?: string
      }
      legal?: {
        privacy?: string
        terms?: string
        bookingPolicy?: string
      }
    }
  }

  // Add this for runtime types
  interface AppConfig {
    links: {
      googleMaps: string
      phone: string
      email: string
      social: {
        facebook: string
        instagram: string
      }
      legal: {
        privacy: string
        terms: string
        bookingPolicy: string
      }
    }
  }
}

export default defineAppConfig({
  links: {
    // Google Maps
    googleMaps: 'https://www.google.com/maps/place/Cruisers+beach+resort/@8.7127517,126.2073645,17z/data=!4m9!3m8!1s0x33020daa05a9a7ef:0xe130b836c8edcefb!5m2!4m1!1i2!8m2!3d8.7127517!4d126.2099394!16s%2Fg%2F11vlnb6pyl',

    // Contact
    phone: '+63 997 990 2802',
    email: 'cruisersseafront@gmail.com',

    // Social media
    social: {
      facebook: 'https://www.facebook.com/icsbeachresortandfarm',
      instagram: 'https://www.instagram.com/cruisers_seafront/',
    },

    // Legal pages
    legal: {
      privacy: '#', // TODO: Add privacy policy URL
      terms: '#', // TODO: Add terms of service URL
      bookingPolicy: '#', // TODO: Add booking policy URL
    },
  },
})
