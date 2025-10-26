export const useViewbox = () => {
  const viewBoxX = useState('viewBoxX', () => 0)
  const viewBoxY = useState('viewBoxY', () => 0)
  const viewBoxWidth = useState('viewBoxWidth', () => 1000)
  const viewBoxHeight = useState('viewBoxHeight', () => 1000)

  const baseStroke = useState('baseStroke', () => 2)
  const markerStroke = computed(() => baseStroke.value / 2)

  const viewBox = computed(() => `${viewBoxX.value} ${viewBoxY.value} ${viewBoxWidth.value} ${viewBoxHeight.value}`)
  const centerX = computed(() => viewBoxX.value + viewBoxWidth.value / 2)
  const centerY = computed(() => viewBoxY.value + viewBoxHeight.value / 2)

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
