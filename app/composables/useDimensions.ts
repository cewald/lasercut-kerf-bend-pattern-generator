export const useDimensions = () => {
  const dashLength = useState('dashLength', () => 1)
  const gapLength = useState('gapLength', () => dashLength.value / 3)
  const numDashes = useState('numDashes', () => 5)
  const numLines = useState('numLines', () => 21)
  const lineSpacing = useState('lineSpacing', () => 0.1)

  return {
    dashLength,
    gapLength,
    numDashes,
    numLines,
    lineSpacing,
  }
}
