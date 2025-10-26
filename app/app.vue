<script setup lang="ts">
const { locale } = useI18n()

const head = useLocaleHead({
  dir: true,
  seo: true,
  lang: true,
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs!.lang,
    dir: head.value.htmlAttrs!.dir as 'ltr',
  },
  title: 'Kerf Bend Pattern Generator for Laser Cutting',
  meta: [
    { name: 'description', content: 'A small GUI to generate parameterized lasercut kerf-bend patterns.' },
    { name: 'robots', content: 'index, follow' },
    { name: 'apple-mobile-web-app-title', content: 'Kerfe-Pattern' },
    ...(head.value.meta || []),
  ],
  link: [
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
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
