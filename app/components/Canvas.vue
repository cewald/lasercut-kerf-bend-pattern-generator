<script setup lang="ts">
const { dashLength, gapLength, numDashes, lineSpacing, rectWidth, rectHeight, kerfHeight } = useDimensions()
const { dashThicknessBase, showGrid, enableRotate, rotationAltered } = useScene()

const { t } = useI18n()

const minRectWidth = computed(() => {
  const minDashLength = 0.1
  return (numDashes.value - 1) * gapLength.value + numDashes.value * minDashLength
})

const minRectHeight = computed(() => {
  return kerfHeight.value
})

const maxGapLength = computed(() => {
  return Math.max(0.05, dashLength.value - 0.01)
})

watch([minRectWidth], () => {
  if (rectWidth.value < minRectWidth.value) {
    rectWidth.value = minRectWidth.value
  }
})

watch([minRectHeight], () => {
  if (rectHeight.value < minRectHeight.value) {
    rectHeight.value = minRectHeight.value
  }
})

watch([maxGapLength], () => {
  if (gapLength.value >= maxGapLength.value) {
    gapLength.value = maxGapLength.value
  }
})
</script>

<template>
  <div class="relative w-full h-full">
    <div class="absolute top-4 right-4 z-10 flex flex-col items-start gap-2">
      <UForm class="space-y-4">
        <UFormField
          label="rectWidth"
          name="rectWidth"
        >
          <UInputNumber
            v-model="rectWidth"
            :min="minRectWidth"
            :step="0.01"
          />
        </UFormField>

        <UFormField
          label="rectHeight"
          name="rectHeight"
        >
          <UInputNumber
            v-model="rectHeight"
            :min="minRectHeight"
            :step="0.01"
          />
        </UFormField>

        <UFormField
          label="kerfHeight"
          name="kerfHeight"
        >
          <UInputNumber
            v-model="kerfHeight"
            :min="0.2"
            :step="0.1"
          />
        </UFormField>

        <UFormField
          label="numDashes"
          name="numDashes"
        >
          <UInputNumber
            v-model="numDashes"
            :min="2"
          />
        </UFormField>

        <UFormField
          label="gapLength"
          name="gapLength"
        >
          <UInputNumber
            v-model="gapLength"
            :min="0.05"
            :max="maxGapLength"
            :step="0.05"
          />
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

        <div class="mt-12 space-y-4">
          <USwitch
            label="enableRotate"
            v-model="enableRotate"
          />
          <USwitch
            label="showGrid"
            v-model="showGrid"
          />
          <UFormField
            label="dashThickness"
            name="dashThickness"
          >
            <UInputNumber
              v-model="dashThicknessBase"
              :step="0.001"
              :min="0.001"
              :max="0.01"
            />
          </UFormField>
        </div>
      </UForm>
      <Transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="enableRotate && rotationAltered"
          aria-hidden="true"
          class="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm mt-2 inline-block pointer-events-none select-none"
        >
          <I18nT
            keypath="tweakpane.resetRotationHint"
            tag="span"
          >
            <template v-slot:key>
              <UKbd>ESC</UKbd>
            </template>
          </I18nT>
        </div>
      </Transition>
    </div>
    <TresCanvas
      clear-color="#ffffff"
      window-size
    >
      <Scene />
    </TresCanvas>
  </div>
</template>
