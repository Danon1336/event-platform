// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    'tailwindcss/tailwind.css',
    'leaflet/dist/leaflet.css' // Добавляем Leaflet CSS
  ]
})
