<script setup lang="ts">
const { showGrid, frustum } = useScene()

const gridSize = computed(() => {
  // Make grid size based on frustum to cover viewport
  const viewWidth = frustum.value.right - frustum.value.left
  const viewHeight = frustum.value.top - frustum.value.bottom
  return Math.max(viewWidth, viewHeight) * 1.5
})
</script>

<template>
  <TresGridHelper
    v-if="showGrid"
    :args="[gridSize, gridSize, undefined, 0xdddddd]"
    :rotation="[Math.PI / 2, 0, 0]"
    :position="[0, 0, -0.002]"
  />
</template>
