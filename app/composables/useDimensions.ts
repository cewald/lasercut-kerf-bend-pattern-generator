export const useDimensions = () => {
  const width = useState('width', () => 900)
  const height = useState('height', () => 600)
  const kerfHeight = useState('kerfHeight', () => 160)
  const dashCount = useState('dashCount', () => 5)
  const gapLength = useState('gapLength', () => 10)
  const lineSpacing = useState('lineSpacing', () => 10)
  const unit = useState('unit', () => 'mm')

  const { centerX, centerY } = useViewbox()

  const dashLength = computed(() => {
    const totalGapSpace = (dashCount.value - 1) * gapLength.value
    const availableSpace = width.value - totalGapSpace
    return availableSpace / dashCount.value
  })

  const dashes = computed(() => {
    const result = []
    const middleIndex = (numLines.value - 1) / 2

    for (let lineIndex = 0; lineIndex < numLines.value; lineIndex++) {
      const rowDashCount = lineIndex % 2 === 1 ? dashCount.value - 1 : dashCount.value
      const y = centerY.value + (middleIndex - lineIndex) * lineSpacing.value
      const rowDashLength = dashLength.value
      const rowGapLength = gapLength.value
      const dashesLength = rowDashCount * rowDashLength
      const gapsLength = (rowDashCount - 1) * rowGapLength
      const totalRowLength = dashesLength + gapsLength
      const startX = centerX.value - totalRowLength / 2

      for (let i = 0; i < rowDashCount; i++) {
        const x1 = startX + i * (rowDashLength + rowGapLength)
        const x2 = x1 + rowDashLength
        result.push({ x1, x2, y })
      }
    }

    return result
  })

  const minKerfHeight = computed(() => {
    return 2 * lineSpacing.value
  })

  const maxGapLength = computed(() => {
    return Math.max(0.1, dashLength.value - 0.1)
  })

  watch([height], () => {
    if (kerfHeight.value > height.value) {
      // Round auto-calculated kerfHeight to nearest 0.5
      kerfHeight.value = Math.round(height.value * 2) / 2
    }
  })

  watch([kerfHeight], () => {
    if (height.value < kerfHeight.value) {
      // Round auto-calculated height to nearest 0.5
      height.value = Math.round(kerfHeight.value * 2) / 2
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
      gapLength.value = Math.round(calculated * 2) / 2
    }
  })

  watch([lineSpacing], () => {
    if (kerfHeight.value < minKerfHeight.value) {
      kerfHeight.value = Math.round(minKerfHeight.value * 2) / 2
    }
  })

  const numLines = computed(() => {
    const calculated = Math.floor(kerfHeight.value / lineSpacing.value) + 1
    let lines = Math.max(3, calculated)
    if (lines % 2 === 0) {
      lines -= 1
    }
    return lines
  })

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
  }
}
