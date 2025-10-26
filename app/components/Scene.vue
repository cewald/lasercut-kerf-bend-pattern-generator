<script setup lang="ts">
import * as THREE from 'three'

const { dashLength, gapLength, numDashes, numLines, lineSpacing } = useDimensions()
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

// Calculate rectangle bounds around the lines
const rectangleBounds = computed(() => {
  const maxDashes = numDashes.value
  const dashesLength = maxDashes * dashLength.value
  const gapsLength = (maxDashes - 1) * gapLength.value
  const maxRowLength = dashesLength + gapsLength

  const middleIndex = (numLines.value - 1) / 2
  const topY = middleIndex * lineSpacing.value
  const bottomY = -middleIndex * lineSpacing.value

  const verticalPadding = 4 // 4 units spacing top and bottom

  return {
    width: maxRowLength,
    height: topY - bottomY + verticalPadding * 2,
    position: [0, 0, -0.01] as [number, number, number], // Slightly behind the dashes
  }
})

// Create line geometry for rectangle outline
const rectangleGeometry = computed(() => {
  const { width, height } = rectangleBounds.value
  const halfWidth = width / 2
  const halfHeight = height / 2

  const points = [
    new THREE.Vector3(-halfWidth, halfHeight, 0),
    new THREE.Vector3(halfWidth, halfHeight, 0),
    new THREE.Vector3(halfWidth, -halfHeight, 0),
    new THREE.Vector3(-halfWidth, -halfHeight, 0),
    new THREE.Vector3(-halfWidth, halfHeight, 0), // Close the rectangle
  ]

  return new THREE.BufferGeometry().setFromPoints(points)
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

    <TresLine
      :position="rectangleBounds.position"
      :geometry="rectangleGeometry"
    >
      <TresLineBasicMaterial :color="0x000000" />
    </TresLine>
  </TresScene>
</template>
