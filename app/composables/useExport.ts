export const useExport = () => {
  const { width, height, unit } = useDimensions()
  const { centerX, centerY } = useViewbox()

  const svgRef = useState<SVGSVGElement | null>('svgRef', () => null)

  const setSvgRef = (el: SVGSVGElement) => {
    svgRef.value = el
  }

  const exportSvg = () => {
    if (!svgRef.value) return

    const svg = svgRef.value.cloneNode(true) as SVGSVGElement
    const padding = 10
    const rectX = centerX.value - width.value / 2
    const rectY = centerY.value - height.value / 2

    const exportViewBox = `${rectX - padding} ${rectY - padding} ${width.value + 2 * padding} ${height.value + 2 * padding}`
    svg.setAttribute('viewBox', exportViewBox)
    svg.setAttribute('width', `${width.value + 2 * padding}${unit.value}`)
    svg.setAttribute('height', `${height.value + 2 * padding}${unit.value}`)

    svg.removeAttribute('class')

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)

    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'lasercut-kerf-bend-pattern.svg'
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    setSvgRef,
    exportSvg,
  }
}
