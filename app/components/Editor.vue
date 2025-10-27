<script setup lang="ts">
const { width, height, kerfHeight, dashCount, gapLength, maxGapLength, lineSpacing, unit, minKerfHeight } =
  useDimensions()
const { baseStroke } = useViewbox()
const { t } = useI18n()
</script>

<template>
  <UDashboardSidebar
    id="default"
    collapsible
    :min-size="26"
    :default-size="26"
    :collapsed-size="1"
    class="flex flex-col"
  >
    <h1 class="text-balance text-2xl font-medium text-primary leading-tight mt-2">{{ t('editor.title') }}</h1>
    <p class="hyphens-auto text-pretty">{{ t('editor.description') }}</p>
    <USeparator />
    <UForm class="grid grid-cols-2 gap-4">
      <UFormField
        :label="t('editor.width')"
        name="width"
        :hint="unit"
      >
        <UInputNumber
          v-model="width"
          variant="soft"
          :step="10"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.height')"
        name="height"
        :hint="unit"
      >
        <UInputNumber
          v-model="height"
          variant="soft"
          :min="kerfHeight"
          :step="10"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.kerfHeight')"
        name="kerfHeight"
        :hint="unit"
      >
        <UInputNumber
          v-model="kerfHeight"
          variant="soft"
          :min="minKerfHeight"
          :max="height"
          :step="10"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.dashCount')"
        name="dashCount"
      >
        <UInputNumber
          v-model="dashCount"
          variant="soft"
          :min="2"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.gapLength')"
        name="gapLength"
        :hint="unit"
      >
        <UInputNumber
          v-model="gapLength"
          variant="soft"
          :min="1"
          :max="maxGapLength"
          :step="1"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.lineSpacing')"
        name="lineSpacing"
        :hint="unit"
      >
        <UInputNumber
          v-model="lineSpacing"
          variant="soft"
          :min="1"
          :step="1"
          class="w-full"
        />
      </UFormField>

      <USeparator class="col-span-2"></USeparator>

      <UFormField
        :label="t('editor.unit')"
        name="unit"
      >
        <USelect
          v-model="unit"
          variant="soft"
          :items="['mm', 'in', 'px']"
          class="w-full"
        />
      </UFormField>

      <UFormField
        :label="t('editor.baseStroke')"
        name="baseStroke"
      >
        <UInputNumber
          v-model="baseStroke"
          variant="soft"
          class="w-full"
          :min="0.1"
          :step="0.1"
        />
      </UFormField>

      <USeparator class="col-span-2"></USeparator>

      <ExportButton
        icon="i-lucide-download"
        class="col-span-2"
      />
      <ShareButton
        class="col-span-2 -mt-2"
        icon="i-lucide-share"
      />
    </UForm>
    <div class="mt-auto mb-2 flex">
      <UNavigationMenu
        :items="[
          {
            label: t('editor.helpButton'),
            icon: 'i-lucide-info',
            to: 'https://github.com/cewald/lasercut-kerf-bend-pattern-generator/issues',
            target: '_blank',
          },
          {
            label: t('editor.githubButton'),
            icon: 'i-lucide-github',
            to: 'https://github.com/cewald/lasercut-kerf-bend-pattern-generator',
            target: '_blank',
          },
        ]"
        orientation="vertical"
        class="w-full"
      />
    </div>
  </UDashboardSidebar>
</template>
