<script setup lang="ts">
const { width, height, kerfHeight, dashCount, gapLength, maxGapLength, lineSpacing, unit, minKerfHeight } =
  useDimensions()
const { baseStroke } = useViewbox()
const { t } = useI18n()
</script>

<template>
  <UForm class="space-y-4">
    <UFormField
      :label="t('editor.unit')"
      name="unit"
    >
      <USelect
        v-model="unit"
        :items="['mm', 'in', 'px']"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('editor.width')"
      name="width"
      :hint="unit"
    >
      <UInputNumber
        v-model="width"
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
        :min="1"
        :step="1"
        class="w-full"
      />
    </UFormField>

    <UFormField
      :label="t('editor.baseStroke')"
      name="baseStroke"
    >
      <UInputNumber
        v-model="baseStroke"
        class="w-full"
        :min="0.1"
        :step="0.1"
      />
    </UFormField>

    <ExportButton />
    <ShareButton />
  </UForm>
</template>
