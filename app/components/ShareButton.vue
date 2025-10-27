<script setup lang="ts">
const { copyUrl } = useUrlSync()
const { t } = useI18n()
const toast = useToast()

const handleCopyUrl = async () => {
  const success = await copyUrl()
  if (success) {
    toast.add({
      title: t('toast.urlCopied'),
      description: t('toast.urlCopiedMeta'),
      color: 'success',
    })
  } else {
    toast.add({
      title: t('toast.urlCopyFailed'),
      color: 'error',
    })
  }
}
</script>

<template>
  <UButton
    @click="handleCopyUrl"
    color="neutral"
    variant="outline"
    size="xl"
    block
  >
    {{ t('editor.shareButton') }}
  </UButton>
</template>
