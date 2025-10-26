<script setup lang="ts">
const svgRef = ref<SVGSVGElement | null>(null)
const { width, height, kerfHeight, dashes } = useDimensions()
const { baseStroke, markerStroke, viewBox, centerX, centerY } = useViewbox()
const { setSvgRef } = useExport()

onMounted(() => {
  if (svgRef.value) {
    setSvgRef(svgRef.value)
  }
})
</script>

<template>
  <div class="w-full h-full m-0 p-0 overflow-hidden bg-white">
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
