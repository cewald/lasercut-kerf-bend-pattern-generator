<script setup lang="ts">
const { exportSvg } = useExport()
const { t } = useI18n()
</script>

<template>
  <UButton
    @click="exportSvg"
    color="primary"
    block
  >
    {{ t('editor.exportButton') }}
  </UButton>
</template>
