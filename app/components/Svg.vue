<script setup lang="ts">
const svgRef = ref<SVGSVGElement | null>(null)
const { width, height, kerfHeight, dashes, unit } = useDimensions()
const { baseStroke, markerStroke, viewBox, centerX, centerY } = useViewbox()

const exportSvg = () => {
  if (!svgRef.value) return

  const svg = svgRef.value.cloneNode(true) as SVGSVGElement
  const padding = 10
  const rectX = centerX.value - width.value / 2
  const rectY = centerY.value - height.value / 2

  const exportViewBox = `${rectX - padding} ${rectY - padding} ${width.value + 2 * padding} ${height.value + 2 * padding}`
  svg.setAttribute('viewBox', exportViewBox)
  svg.setAttribute('width', `${width.value + 2 * padding}${unit.value}`)
  svg.setAttribute('height', `${height.value + 2 * padding}${unit.value}`)

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(svg)

  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'kerf-pattern.svg'
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="fixed inset-0 w-screen h-screen m-0 p-0 overflow-hidden bg-white">
    <UButton
      @click="exportSvg"
      class="absolute top-4 right-4 z-10"
    >
      Export SVG
    </UButton>
    <svg
      ref="svgRef"
      class="block w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="viewBox"
    >
      <rect
        :x="centerX - width / 2"
        :y="centerY - height / 2"
        :width="width"
        :height="height"
        fill="none"
        stroke="black"
        :stroke-width="baseStroke"
      />
      <line
        :x1="centerX - width / 2"
        :y1="centerY - kerfHeight / 2"
        :x2="centerX + width / 2"
        :y2="centerY - kerfHeight / 2"
        stroke="red"
        :stroke-width="markerStroke"
      />
      <line
        :x1="centerX - width / 2"
        :y1="centerY + kerfHeight / 2"
        :x2="centerX + width / 2"
        :y2="centerY + kerfHeight / 2"
        stroke="red"
        :stroke-width="markerStroke"
      />
      <line
        v-for="(dash, index) in dashes"
        :key="index"
        :x1="dash.x1"
        :y1="dash.y"
        :x2="dash.x2"
        :y2="dash.y"
        stroke="black"
        :stroke-width="baseStroke"
      />
    </svg>
  </div>
</template>
