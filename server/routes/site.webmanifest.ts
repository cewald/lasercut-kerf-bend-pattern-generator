export default defineEventHandler(event => {
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL

  const manifest = {
    name: 'Kerf-Bend Pattern Generator',
    short_name: 'Kerf Pattern',
    description: 'A small GUI to generate parameterized lasercut kerf-bend patterns.',
    icons: [
      {
        src: `${baseURL}web-app-manifest-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: `${baseURL}web-app-manifest-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: baseURL,
    scope: baseURL,
  }

  setResponseHeader(event, 'Content-Type', 'application/manifest+json')
  return manifest
})
