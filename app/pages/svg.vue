<script setup lang="ts">
const svgRef = ref<SVGSVGElement | null>(null)

const viewBoxX = ref(0)
const viewBoxY = ref(0)
const viewBoxWidth = ref(1000)
const viewBoxHeight = ref(1000)

const width = ref(200)
const height = ref(200)
const kerfHeight = ref(100)
const dashCount = ref(5)
const gapLength = ref(20)
const lineSpacing = ref(10)

const baseStroke = ref(2)
const markerStroke = computed(() => baseStroke.value / 2)

const viewBox = computed(() => `${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`)
const centerX = computed(() => viewBoxX.value + viewBoxWidth.value / 2)
const centerY = computed(() => viewBoxY.value + viewBoxHeight.value / 2)
</script>

<template>
  <div class="fixed inset-0 w-screen h-screen m-0 p-0 overflow-hidden bg-white">
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
    </svg>
  </div>
</template>
