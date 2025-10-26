<script setup lang="ts">
const { copyUrl } = useUrlSync()
const toast = useToast()

const handleCopyUrl = async () => {
  const success = await copyUrl()
  if (success) {
    toast.add({
      title: 'URL copied to clipboard',
      color: 'success',
    })
  } else {
    toast.add({
      title: 'Failed to copy URL',
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
    block
  >
    Copy Share URL
  </UButton>
</template>
