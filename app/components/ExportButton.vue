<script setup lang="ts">
const { exportSvg } = useExport()
const { t } = useI18n()
</script>

<template>
  <UButton
    @click="exportSvg"
    color="primary"
    size="xl"
    block
  >
    {{ t('editor.exportButton') }}
  </UButton>
</template>
