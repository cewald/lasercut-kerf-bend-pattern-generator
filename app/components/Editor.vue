<script setup lang="ts">
const { width, height, kerfHeight, dashCount, gapLength, maxGapLength, lineSpacing, unit, minKerfHeight } =
  useDimensions()
const { baseStroke } = useViewbox()
</script>

<template>
  <UForm class="space-y-4">
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
      :hint="unit"
    >
      <UInputNumber
        v-model="width"
        :step="10"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="height"
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
      label="kerfHeight"
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
      label="dashCount"
      name="dashCount"
    >
      <UInputNumber
        v-model="dashCount"
        :min="2"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="gapLength"
      name="gapLength"
      :hint="unit"
    >
      <UInputNumber
        v-model="gapLength"
        :min="0.1"
        :max="maxGapLength"
        :step="1"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="lineSpacing"
      name="lineSpacing"
      :hint="unit"
    >
      <UInputNumber
        v-model="lineSpacing"
        :min="0.1"
        :step="1"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="baseStroke"
      name="baseStroke"
    >
      <UInputNumber
        v-model="baseStroke"
        class="w-full"
      />
    </UFormField>

    <ExportButton />
    <ShareButton />
  </UForm>
</template>
