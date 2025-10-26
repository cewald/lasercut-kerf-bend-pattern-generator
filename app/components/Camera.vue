<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'

const { enableRotate, frustum } = useScene()

const cameraRef = ref<any>(null)
const orbitControlsRef = ref<any>(null)

const resetCamera = () => {
  // Reset camera position
  if (cameraRef.value) {
    cameraRef.value.position.set(0, 0, 5)
    cameraRef.value.zoom = 1
    cameraRef.value.updateProjectionMatrix()
  }

  // Reset orbit controls target
  if (orbitControlsRef.value) {
    const controls = orbitControlsRef.value.value || orbitControlsRef.value
    if (controls && controls.target) {
      controls.target.set(0, 0, 0)
      controls.update()
    }
  }
}

defineExpose({ resetCamera })
</script>

<template>
  <TresScene>
    <TresOrthographicCamera
      ref="cameraRef"
      :position="[0, 0, 5]"
      :look-at="[0, 0, 0]"
      v-bind="frustum"
    />

    <OrbitControls
      ref="orbitControlsRef"
      :enable-rotate="enableRotate"
      :enable-pan="false"
      :min-polar-angle="Math.PI * 0"
      :max-polar-angle="Math.PI * 1"
      :min-azimuth-angle="-Math.PI * 0.5"
      :max-azimuth-angle="Math.PI * 0.5"
    />
  </TresScene>
</template>
