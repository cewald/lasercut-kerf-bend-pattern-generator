<script setup lang="ts">
const { width, height, kerfHeight, dashCount, gapLength, maxGapLength, lineSpacing, unit, minKerfHeight } =
  useDimensions()
const { baseStroke } = useViewbox()
const { exportSvg } = useExport()
</script>

<template>
  <UForm class="space-y-4 p-4">
    <UFormField
      label="unit"
      name="unit"
    >
      <USelect
        v-model="unit"
        :items="['mm', 'in', 'px']"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="width"
      name="width"
    >
      <UInputNumber
        v-model="width"
        :step="10"
      />
    </UFormField>

    <UFormField
      label="height"
      name="height"
    >
      <UInputNumber
        v-model="height"
        :min="kerfHeight"
        :step="10"
      />
    </UFormField>

    <UFormField
      label="kerfHeight"
      name="kerfHeight"
    >
      <UInputNumber
        v-model="kerfHeight"
        :min="minKerfHeight"
        :max="height"
        :step="10"
      />
    </UFormField>

    <UFormField
      label="dashCount"
      name="dashCount"
    >
      <UInputNumber
        v-model="dashCount"
        :min="2"
      />
    </UFormField>

    <UFormField
      label="gapLength"
      name="gapLength"
    >
      <UInputNumber
        v-model="gapLength"
        :min="0.1"
        :max="maxGapLength"
        :step="1"
      />
    </UFormField>

    <UFormField
      label="lineSpacing"
      name="lineSpacing"
    >
      <UInputNumber
        v-model="lineSpacing"
        :min="0.1"
        :step="1"
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
