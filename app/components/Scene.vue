<script setup lang="ts">
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

// Create dashed line segments as individual meshes
const dashedLines = computed(() => {
  const dashLength = 0.8 // Length of each dash
  const gapLength = dashLength / 3 // Gap between dashes
  const dashThickness = 0.05 // Thickness of the dash
  const numDashes = 5 // 4 dashes per line
  const numLines = 5 // 5 lines total
  const lineSpacing = 0.5 // Vertical spacing between lines
  const startY = 1.5 // Starting Y position
  const indentAmount = (dashLength / 3) * 2 // Indent amount for every second line

  const dashes: Array<{ position: [number, number, number]; size: [number, number, number] }> = []

  for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
    const rowIndent = lineIndex % 2 === 1 ? indentAmount : 0
    const rowNumDashes = lineIndex % 2 === 1 ? numDashes - 1 : numDashes

    const y = startY - lineIndex * lineSpacing
    const totalLength = rowNumDashes * dashLength + (rowNumDashes - 1) * gapLength
    const startX = lineIndex % 2 === 1 ? -(totalLength + dashLength + gapLength) / 2 : -totalLength / 2

    for (let dashIndex = 0; dashIndex < rowNumDashes; dashIndex++) {
      const x = startX + dashIndex * (dashLength + gapLength) + dashLength / 2 + rowIndent
      dashes.push({
        position: [x, y, 0],
        size: [dashLength, dashThickness, 0.01],
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

    <TresAxesHelper :args="[3]" />
    <TresGridHelper :args="[10, 10]" />
  </TresScene>
</template>
