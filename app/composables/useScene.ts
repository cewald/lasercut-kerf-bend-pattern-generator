export const useScene = () => {
  const { width, height } = useWindowSize()
  const { rectWidth, rectHeight } = useDimensions()

  const frustum = computed(() => {
    const aspect = width.value / height.value

    // Add padding around the rectangle (5% on each side)
    const padding = 1.1
    const rectWidthWithPadding = rectWidth.value * padding
    const rectHeightWithPadding = rectHeight.value * padding

    // Determine which dimension to fit based on aspect ratio
    let viewWidth: number
    let viewHeight: number

    if (rectWidthWithPadding / rectHeightWithPadding > aspect) {
      // Rectangle is wider relative to viewport - fit to width
      viewWidth = rectWidthWithPadding
      viewHeight = viewWidth / aspect
    } else {
      // Rectangle is taller relative to viewport - fit to height
      viewHeight = rectHeightWithPadding
      viewWidth = viewHeight * aspect
    }

    return {
      left: -viewWidth / 2,
      right: viewWidth / 2,
      top: viewHeight / 2,
      bottom: -viewHeight / 2,
      near: 0.1,
      far: 1000,
    }
  })

  const dashThicknessBase = useState('dashThicknessBase', () => 0.002)
  const dashThickness = computed(() => {
    const viewHeight = frustum.value.top - frustum.value.bottom
    return viewHeight * dashThicknessBase.value
  })

  const showGrid = useState('showGrid', () => true)
  const enableRotate = useState('enableRotate', () => false)
  const rotationAltered = useState('rotationAltered', () => false)

  return {
    frustum,
    width,
    height,
    dashThickness,
    dashThicknessBase,
    showGrid,
    enableRotate,
    rotationAltered,
  }
}
