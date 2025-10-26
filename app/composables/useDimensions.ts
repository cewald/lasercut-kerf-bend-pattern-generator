export const useDimensions = () => {
  const dashLength = useState('dashLength', () => 0.8) // Length of each dash
  const gapLength = useState('gapLength', () => dashLength.value / 3) // Gap between dashes
  const numDashes = useState('numDashes', () => 5) // 4 dashes per line
  const numLines = useState('numLines', () => 5) // 5 lines total
  const lineSpacing = useState('lineSpacing', () => 0.5) // Vertical spacing between lines
  const dashThickness = useState('dashThickness', () => 0.05) // Thickness of the dash

  const startY = computed(() => 1.5) // Starting Y position
  const indentAmount = computed(() => (dashLength.value / 3) * 2) // Indent amount for every second line

  return { dashLength, gapLength, dashThickness, numDashes, numLines, lineSpacing, startY, indentAmount }
}
