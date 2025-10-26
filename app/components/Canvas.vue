<script setup lang="ts">
import { Pane } from 'tweakpane'

const { dashLength, gapLength, dashThickness, numDashes, numLines, lineSpacing, showGrid } = useDimensions()

const pane = ref<Pane>()
const paneContainer = useTemplateRef('paneContainer')

onMounted(() => {
  if (!paneContainer.value) return

  // Create Tweakpane instance with container
  pane.value = new Pane({
    title: 'Kerf Bend Parameters',
    container: paneContainer.value,
  })

  // Add Pattern controls
  const patternFolder = pane.value.addFolder({ title: 'Pattern' })
  patternFolder.addBinding(dashLength, 'value', {
    label: 'dashLength',
    min: 0.1,
    max: 2,
    step: 0.1,
  })
  patternFolder.addBinding(gapLength, 'value', {
    label: 'gapLength',
    min: 0.05,
    max: 1,
    step: 0.05,
  })
  patternFolder.addBinding(numDashes, 'value', {
    label: 'numDashes',
    min: 3,
    max: 10,
    step: 1,
  })
  patternFolder.addBinding(numLines, 'value', {
    label: 'numLines',
    min: 2,
    max: 20,
    step: 2,
  })
  patternFolder.addBinding(lineSpacing, 'value', {
    label: 'lineSpacing',
    min: 0.1,
    max: 2,
    step: 0.1,
  })

  // Add View controls
  const viewFolder = pane.value.addFolder({ title: 'View' })
  viewFolder.addBinding(showGrid, 'value', {
    label: 'Show Grid',
  })
  viewFolder.addBinding(dashThickness, 'value', {
    label: 'dashThickness',
    min: 0.01,
    max: 0.5,
    step: 0.01,
  })
})

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
