export const useUrlSync = () => {
  const { width, height, kerfHeight, dashCount, gapLength, lineSpacing, unit } = useDimensions()
  const { baseStroke } = useViewbox()

  const route = useRoute()
  const router = useRouter()

  onMounted(() => {
    const params = route.query

    if (params.width) width.value = Number(params.width)
    if (params.height) height.value = Number(params.height)
    if (params.kerfHeight) kerfHeight.value = Number(params.kerfHeight)
    if (params.dashCount) dashCount.value = Number(params.dashCount)
    if (params.gapLength) gapLength.value = Number(params.gapLength)
    if (params.lineSpacing) lineSpacing.value = Number(params.lineSpacing)
    if (params.unit) unit.value = String(params.unit)
    if (params.baseStroke) baseStroke.value = Number(params.baseStroke)
  })

  const updateUrl = useDebounceFn(() => {
    router.replace({
      query: {
        width: width.value.toString(),
        height: height.value.toString(),
        kerfHeight: kerfHeight.value.toString(),
        dashCount: dashCount.value.toString(),
        gapLength: gapLength.value.toString(),
        lineSpacing: lineSpacing.value.toString(),
        unit: unit.value,
        baseStroke: baseStroke.value.toString(),
      },
    })
  }, 300)

  watch([width, height, kerfHeight, dashCount, gapLength, lineSpacing, unit, baseStroke], updateUrl)

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      return true
    } catch (error) {
      console.error('Failed to copy URL:', error)
      return false
    }
  }

  return {
    copyUrl,
  }
}
