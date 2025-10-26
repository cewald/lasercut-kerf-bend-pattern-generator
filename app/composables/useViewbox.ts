export const useViewbox = () => {
  // Access dimension states directly to avoid circular dependency
  const width = useState<number>('width')
  const height = useState<number>('height')

  const baseStroke = useState('baseStroke', () => 1)
  const markerStroke = computed(() => baseStroke.value / 2)

  // Calculate viewBox with 10% padding on each side
  const padding = computed(() => Math.max(width.value, height.value) * 0.1)

  const viewBoxWidth = computed(() => width.value + padding.value * 2)
  const viewBoxHeight = computed(() => height.value + padding.value * 2)

  const viewBoxX = computed(() => -viewBoxWidth.value / 2)
  const viewBoxY = computed(() => -viewBoxHeight.value / 2)

  const viewBox = computed(() => `${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`)
  const centerX = computed(() => 0)
  const centerY = computed(() => 0)

  return {
    viewBoxX,
    viewBoxY,
    viewBoxWidth,
    viewBoxHeight,
    baseStroke,
    markerStroke,
    viewBox,
    centerX,
    centerY,
  }
}
