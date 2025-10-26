<script setup lang="ts">
import { Pane } from 'tweakpane'

const { dashLength, gapLength, numDashes, numLines, lineSpacing } = useDimensions()
const { dashThickness, showGrid, enableRotate, rotationAltered } = useScene()

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
  viewFolder.addBinding(enableRotate, 'value', {
    label: 'Enable Rotate',
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
    <div class="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
      <div ref="paneContainer" />
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="enableRotate && rotationAltered"
          class="text-xs text-gray-600 bg-white/90 px-2 py-1 rounded shadow-sm mt-2 inline-block"
        >
          Press <UKbd>ESC</UKbd> to reset rotation
        </div>
      </Transition>
    </div>
    <TresCanvas
      clear-color="#ffffff"
      window-size
    >
      <Scene />
    </TresCanvas>
  </div>
</template>
