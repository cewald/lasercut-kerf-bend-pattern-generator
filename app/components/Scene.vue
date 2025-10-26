<script setup lang="ts">
import * as THREE from 'three'

const { dashLength, gapLength, numDashes, numLines, lineSpacing, rectWidth, rectHeight, kerfHeight } = useDimensions()
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

const kerfHeightMarkers = computed(() => {
  const halfHeight = kerfHeight.value / 2
  const width = rectWidth.value
  const thickness = dashThickness.value / 2
  const z = -0.001

  return [
    {
      position: [0, halfHeight, z] as [number, number, number],
      size: [width, thickness, 0.01] as [number, number, number],
    },
    {
      position: [0, -halfHeight, z] as [number, number, number],
      size: [width, thickness, 0.01] as [number, number, number],
    },
  ]
})

const rectangleEdges = computed(() => {
  const width = rectWidth.value
  const height = rectHeight.value
  const halfWidth = width / 2
  const halfHeight = height / 2
  const thickness = dashThickness.value
  const halfThickness = thickness / 2
  const z = -0.01

  return [
    {
      position: [0, halfHeight, z] as [number, number, number],
      size: [width + thickness, thickness, 0.01] as [number, number, number],
    },
    {
      position: [0, -halfHeight, z] as [number, number, number],
      size: [width + thickness, thickness, 0.01] as [number, number, number],
    },
    {
      position: [-halfWidth, 0, z] as [number, number, number],
      size: [thickness, height, 0.01] as [number, number, number],
    },
    {
      position: [halfWidth, 0, z] as [number, number, number],
      size: [thickness, height, 0.01] as [number, number, number],
    },
  ]
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

    <TresMesh
      v-for="(edge, index) in rectangleEdges"
      :key="`edge-${index}`"
      :position="edge.position"
    >
      <TresBoxGeometry :args="edge.size" />
      <TresMeshBasicMaterial :color="0x000000" />
    </TresMesh>

    <TresMesh
      v-for="(marker, index) in kerfHeightMarkers"
      :key="`kerf-marker-${index}`"
      :position="marker.position"
    >
      <TresBoxGeometry :args="marker.size" />
      <TresMeshBasicMaterial :color="0xff0000" />
    </TresMesh>
  </TresScene>
</template>
