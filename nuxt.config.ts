// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt', '@tresjs/nuxt'],
  css: ['~/assets/styles/main.css'],
  i18n: {
    strategy: 'prefix_except_default',
    baseUrl: import.meta.env.NUXT_APP_BASE_URL || 'http://localhost:3000/',
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        language: 'en',
        name: 'English',
        file: 'en.json',
        isCatchallLocale: true,
      },
    ],
    detectBrowserLanguage: false,
  },
})
