<script setup lang="ts">
import { Pane } from 'tweakpane'

const defaultControls = {
  kerfLength: 20,
  kerfVerticalDistance: 5,
  unit: 'mm',
}

const controls = ref(defaultControls)
const pane = ref<Pane>()
const paneContainer = useTemplateRef('paneContainer')

onMounted(() => {
  if (!paneContainer.value) return

  // Create Tweakpane instance with container
  pane.value = new Pane({
    title: 'Controls',
    container: paneContainer.value,
  })

  // Add position controls
  const positionFolder = pane.value.addFolder({ title: 'Sizes' })
  positionFolder.addBinding(controls.value, 'kerfLength', { step: 0.1 })
  positionFolder.addBinding(controls.value, 'kerfVerticalDistance', { step: 0.1 })
  positionFolder.addBinding(controls.value, 'unit', {
    options: {
      mm: 'mm',
      cm: 'cm',
      inch: 'inch',
    },
  })
})

// Clean up on unmount
onUnmounted(() => {
  pane.value?.dispose()
})
</script>

<template>
  <div class="relative w-full h-full">
    <div
      ref="paneContainer"
      class="absolute top-4 right-4 z-10"
    />
    <TresCanvas
      clear-color="#ffffff"
      window-size
    >
      <Scene />
    </TresCanvas>
  </div>
</template>
