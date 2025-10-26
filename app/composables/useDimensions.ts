export const useDimensions = () => {
  const gapLength = useState('gapLength', () => 0.3)
  const numDashes = useState('numDashes', () => 5)
  const lineSpacing = useState('lineSpacing', () => 0.1)
  const rectWidth = useState('rectWidth', () => 5)
  const rectHeight = useState('rectHeight', () => 6)
  const kerfHeight = useState('kerfHeight', () => 2)

  const dashLength = computed(() => {
    const totalGapSpace = (numDashes.value - 1) * gapLength.value
    const availableSpace = rectWidth.value - totalGapSpace
    return Math.max(0.1, availableSpace / numDashes.value)
  })

  const numLines = computed(() => {
    // Use floor to ensure total line height never exceeds kerfHeight
    const calculated = Math.floor(kerfHeight.value / lineSpacing.value) + 1
    let lines = Math.max(3, calculated)

    // Ensure it's odd
    if (lines % 2 === 0) {
      lines -= 1 // Reduce by 1 to stay within kerfHeight
    }

    return lines
  })

  return {
    dashLength,
    gapLength,
    numDashes,
    numLines,
    lineSpacing,
    rectWidth,
    rectHeight,
    kerfHeight,
  }
}
