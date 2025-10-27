<script setup lang="ts">
const { locale } = useI18n()

const head = useLocaleHead({
  dir: true,
  seo: true,
  lang: true,
})

const config = useRuntimeConfig()
const baseURL = config.app.baseURL

const title = 'Kerf-Bend Pattern Generator for Laser Cutting'
const description = 'A small GUI to generate parameterized lasercut kerf-bend patterns.'
const ogImage = `${baseURL}og-image.png`
const ogImageAlt = 'Kerf-Bend Pattern Generator Preview'

const seo = useSeoMeta({
  title,
  description,
  author: 'Ewald',
  keywords:
    'laser cutting, kerf bending, pattern generator, fabrication, parametric design, woodworking, digital fabrication',
  // Open Graph
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: baseURL,
  ogImage,
  ogImageAlt,
  ogSiteName: 'Kerf-Bend Pattern Generator',
  ogLocale: locale.value,
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
  twitterImageAlt: ogImageAlt,
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs!.lang,
    dir: head.value.htmlAttrs!.dir as 'ltr',
  },
  title: title,
  meta: [
    { name: 'description', content: description },
    { name: 'robots', content: 'index, follow' },
    { name: 'apple-mobile-web-app-title', content: 'Kerfe-Pattern' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'format-detection', content: 'telephone=no' },
    ...(head.value.meta || []),
  ],
  link: [
    { rel: 'canonical', href: baseURL },
    { rel: 'shortcut icon', href: `${baseURL}favicon.ico` },
    { rel: 'icon', type: 'image/png', href: `${baseURL}favicon-96x96.png`, sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}apple-touch-icon.png` },
    { rel: 'manifest', href: `${baseURL}site.webmanifest` },
    ...(head.value.link || []),
  ],
  bodyAttrs: {
    class: 'antialiased font-sans font-normal',
  },
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UApp>
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
