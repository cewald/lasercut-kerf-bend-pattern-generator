<script setup lang="ts">
const { exportSvg } = useExport()
</script>

<template>
  <UButton
    @click="exportSvg"
    color="primary"
    block
  >
    Export SVG
  </UButton>
</template>
