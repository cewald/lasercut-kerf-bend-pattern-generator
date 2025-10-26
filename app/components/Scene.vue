<script setup lang="ts">
const { dashLength, gapLength, numDashes, numLines, lineSpacing, rectWidth, rectHeight } = useDimensions()
const { dashThickness } = useScene()

const dashedLines = computed(() => {
  const dashes: Array<{ position: [number, number, number]; size: [number, number, number] }> = []
  const middleIndex = (numLines.value - 1) / 2

  for (let lineIndex = 0; lineIndex < numLines.value; lineIndex++) {
    const rowNumDashes = lineIndex % 2 === 1 ? numDashes.value - 1 : numDashes.value

    const y = (middleIndex - lineIndex) * lineSpacing.value
    const dashesLength = rowNumDashes * dashLength.value
    const gapsLength = (rowNumDashes - 1) * gapLength.value
    const totalRowLength = dashesLength + gapsLength

    // Center each line independently
    const startX = -totalRowLength / 2

    for (let dashIndex = 0; dashIndex < rowNumDashes; dashIndex++) {
      const x = startX + dashIndex * (dashLength.value + gapLength.value) + dashLength.value / 2
      dashes.push({
        position: [x, y, 0],
        size: [dashLength.value, dashThickness.value, 0.01],
      })
    }
  }

  return dashes
})

// Create rectangle outline as thin boxes (same approach as dashed lines)
const rectangleEdges = computed(() => {
  const width = rectWidth.value
  const height = rectHeight.value
  const halfWidth = width / 2
  const halfHeight = height / 2
  const thickness = dashThickness.value
  const z = -0.01 // Slightly behind the dashes

  return [
    {
      position: [0, halfHeight, z],
      size: [width, thickness, 0.01],
    },
    {
      position: [0, -halfHeight, z],
      size: [width, thickness, 0.01],
    },
    {
      position: [-halfWidth, 0, z],
      size: [thickness, height, 0.01],
    },
    {
      position: [halfWidth, 0, z],
      size: [thickness, height, 0.01],
    },
  ] satisfies Array<{ position: [number, number, number]; size: [number, number, number] }>
})
</script>

<template>
  <TresScene>
    <Camera />
    <Grid />

    <TresMesh
      v-for="(dash, index) in dashedLines"
      :key="index"
      :position="dash.position"
    >
      <TresBoxGeometry :args="dash.size" />
      <TresMeshBasicMaterial :color="0x000000" />
    </TresMesh>

    <!-- Rectangle outline (using same thickness as dashed lines) -->
    <TresMesh
      v-for="(edge, index) in rectangleEdges"
      :key="`edge-${index}`"
      :position="edge.position"
    >
      <TresBoxGeometry :args="edge.size" />
      <TresMeshBasicMaterial :color="0x000000" />
    </TresMesh>
  </TresScene>
</template>
