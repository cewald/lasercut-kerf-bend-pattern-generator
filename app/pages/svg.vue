<script setup lang="ts">
const svgRef = ref<SVGSVGElement | null>(null)

const viewBoxX = ref(0)
const viewBoxY = ref(0)
const viewBoxWidth = ref(1000)
const viewBoxHeight = ref(1000)

const width = ref(200)
const height = ref(200)
const kerfHeight = ref(100)
const dashCount = ref(3)
const gapLength = ref(10)
const lineSpacing = ref(10)

const baseStroke = ref(2)
const markerStroke = computed(() => baseStroke.value / 2)

const viewBox = computed(() => `${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`)
const centerX = computed(() => viewBoxX.value + viewBoxWidth.value / 2)
const centerY = computed(() => viewBoxY.value + viewBoxHeight.value / 2)

const dashLength = computed(() => {
  const totalGapSpace = (dashCount.value - 1) * gapLength.value
  const availableSpace = width.value - totalGapSpace
  return availableSpace / dashCount.value
})

const numLines = computed(() => {
  const calculated = Math.floor(kerfHeight.value / lineSpacing.value) + 1
  let lines = Math.max(3, calculated)
  if (lines % 2 === 0) {
    lines -= 1
  }
  return lines
})

const dashes = computed(() => {
  const result = []
  const middleIndex = (numLines.value - 1) / 2

  for (let lineIndex = 0; lineIndex < numLines.value; lineIndex++) {
    const rowDashCount = lineIndex % 2 === 1 ? dashCount.value - 1 : dashCount.value
    const y = centerY.value + (middleIndex - lineIndex) * lineSpacing.value
    const rowDashLength = dashLength.value
    const rowGapLength = gapLength.value
    const dashesLength = rowDashCount * rowDashLength
    const gapsLength = (rowDashCount - 1) * rowGapLength
    const totalRowLength = dashesLength + gapsLength
    const startX = centerX.value - totalRowLength / 2

    for (let i = 0; i < rowDashCount; i++) {
      const x1 = startX + i * (rowDashLength + rowGapLength)
      const x2 = x1 + rowDashLength
      result.push({ x1, x2, y })
    }
  }

  return result
})
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
