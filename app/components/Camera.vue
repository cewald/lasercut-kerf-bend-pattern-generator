<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import type { OrthographicCamera } from 'three'

const { enableRotate, frustum } = useScene()

const cameraRef = useTemplateRef<OrthographicCamera>('cameraRef')
const orbitControlsRef = useTemplateRef<InstanceType<typeof OrbitControls>>('orbitControlsRef')

const resetCamera = () => {
  if (cameraRef.value) {
    const camera = toRaw(cameraRef.value)
    camera.position.set(0, 0, 5)
    camera.zoom = 1
    camera.updateProjectionMatrix()
  }
  if (orbitControlsRef.value) {
    const controls = toRaw((orbitControlsRef.value as any).value || orbitControlsRef.value)
    if (controls && typeof controls === 'object' && 'target' in controls && 'update' in controls) {
      controls.target.set(0, 0, 0)
      controls.update()
    }
  }
}

// Reset camera when Escape is pressed
onKeyStroke('Escape', e => {
  e.preventDefault()
  resetCamera()
})

defineExpose({ resetCamera })
</script>

<template>
  <TresOrthographicCamera
    ref="cameraRef"
    :position="[0, 0, 5]"
    :look-at="[0, 0, 0]"
    v-bind="frustum"
    make-default
  />

  <OrbitControls
    ref="orbitControlsRef"
    :enable-rotate="enableRotate"
    :enable-pan="false"
    :enable-zoom="false"
    :min-polar-angle="Math.PI * 0"
    :max-polar-angle="Math.PI * 1"
    :min-azimuth-angle="-Math.PI * 0.5"
    :max-azimuth-angle="Math.PI * 0.5"
  />
</template>
