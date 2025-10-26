<script setup lang="ts">
const { dashLength, gapLength, dashThickness, numDashes, numLines, lineSpacing, showGrid, indentAmount } =
  useDimensions()

const { width, height } = useWindowSize()

const frustum = computed(() => {
  const aspect = width.value / height.value
  const size = 5
  return {
    left: (-size * aspect) / 2,
    right: (size * aspect) / 2,
    top: size / 2,
    bottom: -size / 2,
    near: 0.1,
    far: 1000,
  }
})

const gridSize = computed(() => {
  // Make grid size responsive to always cover viewport
  const aspect = width.value / height.value
  const size = 5
  return Math.max(size * aspect, size) * 2.5
})

const dashedLines = computed(() => {
  const dashes: Array<{ position: [number, number, number]; size: [number, number, number] }> = []
  const middleIndex = (numLines.value - 1) / 2

  for (let lineIndex = 0; lineIndex < numLines.value; lineIndex++) {
    const rowIndent = lineIndex % 2 === 1 ? indentAmount.value : 0
    const rowNumDashes = lineIndex % 2 === 1 ? numDashes.value - 1 : numDashes.value

    const y = (middleIndex - lineIndex) * lineSpacing.value
    const totalLength = rowNumDashes * dashLength.value + (rowNumDashes - 1) * gapLength.value
    const startX = lineIndex % 2 === 1 ? -(totalLength + dashLength.value + gapLength.value) / 2 : -totalLength / 2

    for (let dashIndex = 0; dashIndex < rowNumDashes; dashIndex++) {
      const x = startX + dashIndex * (dashLength.value + gapLength.value) + dashLength.value / 2 + rowIndent
      dashes.push({
        position: [x, y, 0],
        size: [dashLength.value, dashThickness.value, 0.01],
      })
    }
  }

  return dashes
})
</script>

<template>
  <TresScene>
    <TresOrthographicCamera
      :position="[0, 0, 5]"
      :look-at="[0, 0, 0]"
      v-bind="frustum"
    />

    <!-- Render dashed lines as boxes -->
    <TresMesh
      v-for="(dash, index) in dashedLines"
      :key="index"
      :position="dash.position"
    >
      <TresBoxGeometry :args="dash.size" />
      <TresMeshBasicMaterial :color="0x000000" />
    </TresMesh>

    <!-- Grid on XY plane (rotated 90 degrees around X axis) -->
    <TresGridHelper
      v-if="showGrid"
      :args="[gridSize, gridSize]"
      :rotation="[Math.PI / 2, 0, 0]"
      :position="[0, 0, -0.1]"
    />
  </TresScene>
</template>
