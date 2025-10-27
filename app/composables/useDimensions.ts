export const useDimensions = () => {
  const width = useState('width', () => 110)
  const height = useState('height', () => 160)
  const kerfHeight = useState('kerfHeight', () => 50)
  const dashCount = useState('dashCount', () => 3)
  const gapLength = useState('gapLength', () => 15)
  const lineSpacing = useState('lineSpacing', () => 2)
  const unit = useState('unit', () => 'mm')

  const { centerX, centerY } = useViewbox()

  const dashLength = computed(() => {
    const totalGapSpace = (dashCount.value - 1) * gapLength.value
    const availableSpace = width.value - totalGapSpace
    return availableSpace / (dashCount.value - 1)
  })

  const dashes = computed(() => {
    const result = []
    const middleIndex = (numLines.value - 1) / 2

    for (let lineIndex = 0; lineIndex < numLines.value; lineIndex++) {
      const rowDashCount = lineIndex % 2 === 1 ? dashCount.value - 1 : dashCount.value
      const y = centerY.value + (middleIndex - lineIndex) * lineSpacing.value
      const rowDashLength = dashLength.value
      const rowGapLength = gapLength.value

      const isEvenRow = lineIndex % 2 === 0

      let dashesLength
      if (isEvenRow && rowDashCount > 1) {
        dashesLength = (rowDashCount - 2) * rowDashLength + 2 * (rowDashLength / 2)
      } else {
        dashesLength = rowDashCount * rowDashLength
      }

      const gapsLength = (rowDashCount - 1) * rowGapLength
      const totalRowLength = dashesLength + gapsLength
      const startX = centerX.value - totalRowLength / 2

      let currentX = startX
      for (let i = 0; i < rowDashCount; i++) {
        let currentDashLength = rowDashLength

        if (isEvenRow && (i === 0 || i === rowDashCount - 1)) {
          currentDashLength = rowDashLength / 2
        }

        const x1 = currentX
        const x2 = x1 + currentDashLength
        result.push({ x1, x2, y })

        currentX += currentDashLength + rowGapLength
      }
    }

    return result
  })

  const numLines = computed(() => {
    const calculated = Math.floor(kerfHeight.value / lineSpacing.value) + 1
    let lines = Math.max(3, calculated)
    if (lines % 2 === 0) {
      lines -= 1
    }
    return lines
  })

  const minKerfHeight = computed(() => {
    const calculated = 2 * lineSpacing.value
    return calculated
  })

  const maxGapLength = computed(() => {
    const calculated = Math.max(0.5, dashLength.value - 0.5)
    return calculated
  })

  const minWidth = computed(() => {
    const minDashLength = 1
    const calculated = minDashLength * dashCount.value + (dashCount.value - 1) * gapLength.value
    return calculated
  })

  watch([height], () => {
    if (kerfHeight.value > height.value) {
      kerfHeight.value = height.value
    }
  })

  watch([kerfHeight], () => {
    if (height.value < kerfHeight.value) {
      height.value = kerfHeight.value
    }
  })

  watch([dashCount], () => {
    if (dashCount.value < 2) {
      dashCount.value = 2
    }
  })

  watch([dashLength], () => {
    if (gapLength.value <= 0) {
      gapLength.value = 0.5
    }
    if (gapLength.value >= dashLength.value) {
      const calculated = Math.max(0.5, dashLength.value - 0.5)
      gapLength.value = roundDimension(calculated)
    }
  })

  watch([lineSpacing], () => {
    if (kerfHeight.value < minKerfHeight.value) {
      kerfHeight.value = roundDimension(minKerfHeight.value)
    }
  })

  watch([dashCount, gapLength], () => {
    if (width.value < minWidth.value) {
      width.value = roundDimension(minWidth.value)
    }
  })

  const roundDimension = (value: number, step: number = 2) => {
    return Math.round(value / step) * step
  }

  return {
    width,
    height,
    kerfHeight,
    dashCount,
    gapLength,
    lineSpacing,
    unit,
    dashes,
    dashLength,
    numLines,
    maxGapLength,
    minKerfHeight,
    minWidth,
  }
}
