export const useScene = () => {
  const { width, height } = useWindowSize()

  const frustum = computed(() => {
    const aspect = width.value / height.value
    const size = 5
    return {
      left: (-size * aspect) / 2,
      right: (size * aspect) / 2,
      top: size / 2,
      bottom: -size / 2,
      near: 0.1,
      far: 1000,
    }
  })

  const showGrid = useState('showGrid', () => true)
  const enableRotate = useState('enableRotate', () => true)
  const dashThickness = useState('dashThickness', () => 0.02)

  return {
    frustum,
    width,
    height,
    dashThickness,
    showGrid,
    enableRotate,
  }
}
