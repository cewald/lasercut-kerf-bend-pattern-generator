<script setup lang="ts">
const { width, height, kerfHeight, dashCount, gapLength, lineSpacing } = useDimensions()
const { baseStroke } = useViewbox()
const { exportSvg } = useExport()
</script>

<template>
  <UForm class="space-y-4 bg-white p-4 rounded shadow-lg">
    <UFormField
      label="width"
      name="width"
    >
      <UInputNumber v-model="width" />
    </UFormField>

    <UFormField
      label="height"
      name="height"
    >
      <UInputNumber v-model="height" />
    </UFormField>

    <UFormField
      label="kerfHeight"
      name="kerfHeight"
    >
      <UInputNumber
        v-model="kerfHeight"
        :max="height"
      />
    </UFormField>

    <UFormField
      label="dashCount"
      name="dashCount"
    >
      <UInputNumber v-model="dashCount" />
    </UFormField>

    <UFormField
      label="gapLength"
      name="gapLength"
    >
      <UInputNumber v-model="gapLength" />
    </UFormField>

    <UFormField
      label="lineSpacing"
      name="lineSpacing"
    >
      <UInputNumber
        v-model="lineSpacing"
        :min="0.02"
        :step="0.001"
      />
    </UFormField>

    <UFormField
      label="baseStroke"
      name="baseStroke"
    >
      <UInputNumber v-model="baseStroke" />
    </UFormField>

    <UButton
      @click="exportSvg"
      color="primary"
      block
      class="mt-4"
    >
      Export SVG
    </UButton>
  </UForm>
</template>
