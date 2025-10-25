<script setup lang="ts">
const { width, height } = useWindowSize()

const frustum = computed(() => {
  const aspect = width.value / height.value
  const size = 5
  return {
    left: (-size * aspect) / 2,
    right: (size * aspect) / 2,
    top: size / 2,
    bottom: -size / 2
  }
})

</script>

<template>
  <TresScene>
      <TresOrthographicCamera
        :position="[0, 0, 1]"
        v-bind="frustum"
      />

      <!-- 2D Plane -->
      <TresMesh :position="[0, 0, 0]">
        <TresPlaneGeometry :args="[2, 2]" />
        <TresMeshBasicMaterial :color="0x0000FF" />
      </TresMesh>

      <!-- Another 2D object -->
      <TresMesh :position="[3, 0, 0]">
        <TresCircleGeometry :args="[1, 32]" />
        <TresMeshBasicMaterial :color="0xff0000" />
      </TresMesh>
    </TresScene>

  <TresAxesHelper />
  <TresGridHelper />
</template>
