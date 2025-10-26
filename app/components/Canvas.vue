<script setup lang="ts">
const { dashLength, gapLength, numDashes, numLines, lineSpacing, rectWidth, rectHeight } = useDimensions()
const { dashThickness, showGrid, enableRotate, rotationAltered } = useScene()

const { t } = useI18n()

const minRectWidth = computed(() => {
  const minDashLength = 0.1
  return (numDashes.value - 1) * gapLength.value + numDashes.value * minDashLength
})

const maxGapLength = computed(() => {
  return Math.max(0.05, dashLength.value - 0.01)
})

watch([minRectWidth], () => {
  if (rectWidth.value < minRectWidth.value) {
    rectWidth.value = minRectWidth.value
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
          <UInput
            v-model="rectWidth"
            type="number"
            :min="minRectWidth"
            :step="0.05"
          />
        </UFormField>

        <UFormField
          label="rectHeight"
          name="rectHeight"
        >
          <UInput
            v-model="rectHeight"
            type="number"
          />
        </UFormField>

        <UFormField
          label="gapLength"
          name="gapLength"
        >
          <UInput
            v-model="gapLength"
            type="number"
            :min="0.05"
            :max="maxGapLength"
            :step="0.05"
          />
        </UFormField>

        <UFormField
          label="numDashes"
          name="numDashes"
        >
          <UInput
            v-model="numDashes"
            type="number"
            :min="2"
          />
        </UFormField>

        <UFormField
          label="numLines"
          name="numLines"
        >
          <UInput
            v-model="numLines"
            type="number"
          />
        </UFormField>

        <UFormField
          label="lineSpacing"
          name="lineSpacing"
        >
          <UInput
            v-model="lineSpacing"
            type="number"
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
