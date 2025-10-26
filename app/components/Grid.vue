<script setup lang="ts">
const { width, height, showGrid } = useScene()

const gridSize = computed(() => {
  // Make grid size responsive to always cover viewport
  const aspect = width.value / height.value
  const size = 5
  return Math.max(size * aspect, size) * 2.5
})
</script>

<template>
  <TresGridHelper
    v-if="showGrid"
    :args="[gridSize, gridSize]"
    :rotation="[Math.PI / 2, 0, 0]"
    :position="[0, 0, 0]"
  />
</template>
