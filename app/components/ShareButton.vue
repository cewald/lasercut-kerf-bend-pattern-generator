<script setup lang="ts">
const { shareUrl } = useUrlSync()
const { t } = useI18n()
const { copy, copied } = useClipboard()
</script>

<template>
  <div>
    <UFieldGroup
      class="w-full"
      @click="copy(shareUrl)"
    >
      <UBadge
        color="neutral"
        variant="outline"
        size="lg"
        trailing-icon="i-lucide-share"
        class="px-3"
      />
      <UInput
        v-model="shareUrl"
        :ui="{ trailing: 'pe-0.5', base: ['pe-10', copied ? '' : 'text-dimmed'] }"
        size="xl"
        class="w-full"
        readonly
        aria-readonly="true"
        :aria-label="t('editor.shareButtonHelp')"
      >
        <template
          v-if="shareUrl?.length"
          #trailing
        >
          <UTooltip
            :text="t('editor.shareButtonTooltip')"
            :content="{ side: 'right' }"
          >
            <UButton
              :color="copied ? 'success' : 'neutral'"
              variant="link"
              :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
              :aria-label="t('editor.shareButton')"
            />
          </UTooltip>
        </template>
      </UInput>
    </UFieldGroup>
    <div
      class="mt-1 self-center text-sm text-dimmed px-1 hyphens-auto text-pretty leading-tight"
      aria-hidden="true"
    >
      {{ t('editor.shareButtonHelp') }}
    </div>
  </div>
</template>
