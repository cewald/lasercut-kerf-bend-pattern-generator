export const useDimensions = () => {
  const dashLength = useState('dashLength', () => 0.8)
  const gapLength = useState('gapLength', () => dashLength.value / 3)
  const numDashes = useState('numDashes', () => 5)
  const numLines = useState('numLines', () => 5)
  const lineSpacing = useState('lineSpacing', () => 0.5)
  const dashThickness = useState('dashThickness', () => 0.05)
  const showGrid = useState('showGrid', () => true)

  const indentAmount = computed(() => (dashLength.value / 3) * 2)

  return { dashLength, gapLength, dashThickness, numDashes, numLines, lineSpacing, showGrid, indentAmount }
}
