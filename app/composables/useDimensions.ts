export const useDimensions = () => {
  const gapLength = useState('gapLength', () => 0.3)
  const numDashes = useState('numDashes', () => 5)
  const numLines = useState('numLines', () => 21)
  const lineSpacing = useState('lineSpacing', () => 0.1)
  const rectWidth = useState('rectWidth', () => 10)
  const rectHeight = useState('rectHeight', () => 5)

  const dashLength = computed(() => {
    const totalGapSpace = (numDashes.value - 1) * gapLength.value
    const availableSpace = rectWidth.value - totalGapSpace
    return Math.max(0.1, availableSpace / numDashes.value)
  })

  return {
    dashLength,
    gapLength,
    numDashes,
    numLines,
    lineSpacing,
    rectWidth,
    rectHeight,
  }
}
