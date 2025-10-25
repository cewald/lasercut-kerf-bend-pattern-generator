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
</script>

<template>
  <TresScene>
    <TresOrthographicCamera
      :position="[0, 0, 1]"
      v-bind="frustum"
    />

    <TresMesh :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[2, 2]" />
      <TresMeshBasicMaterial :color="0x0000ff" />
    </TresMesh>
  </TresScene>

  <TresAxesHelper />
  <TresGridHelper />
</template>
