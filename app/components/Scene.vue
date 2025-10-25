<script setup lang="ts">
const { width, height } = useWindowSize()

const frustum = computed(() => {
  const aspect = width.value / height.value
  const size = Math.min(width.value, height.value) * 0.005
  return {
    left: (-size * aspect) / 2,
    right: (size * aspect) / 2,
    top: size / 2,
    bottom: -size / 2,
  }
})

const linePoints = computed(() => {
  const size = Math.min(width.value, height.value) * 0.005
  const halfSize = size * 0.9 // Use 80% of frustum width

  return [
    [-halfSize, 0, 0],
    [halfSize, 0, 0],
  ]
})
</script>

<template>
  <TresScene>
    <TresOrthographicCamera
      :position="[0, 0, 1]"
      v-bind="frustum"
    />

    <TresLine :points="linePoints">
      <TresLineDashedMaterial
        :color="0x000000"
        :dash-size="0.5"
        :gap-size="0.2"
      />
    </TresLine>

    <TresAxesHelper :args="[1]" />
    <TresGridHelper :args="[10, 10]" />
  </TresScene>
</template>
