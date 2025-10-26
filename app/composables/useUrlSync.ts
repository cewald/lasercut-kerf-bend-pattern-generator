export const useUrlSync = () => {
  const { width, height, kerfHeight, dashCount, gapLength, lineSpacing, unit } = useDimensions()
  const { baseStroke } = useViewbox()

  const route = useRoute()
  const router = useRouter()

  const encodeParams = () => {
    const params = {
      w: width.value,
      h: height.value,
      k: kerfHeight.value,
      d: dashCount.value,
      g: gapLength.value,
      l: lineSpacing.value,
      u: unit.value,
      s: baseStroke.value,
    }
    const json = JSON.stringify(params)
    return btoa(json)
  }

  const decodeParams = (hash: string) => {
    try {
      const json = atob(hash)
      const params = JSON.parse(json)
      return params
    } catch {
      return null
    }
  }

  onMounted(() => {
    const configHash = route.query.c

    if (configHash && typeof configHash === 'string') {
      const params = decodeParams(configHash)
      if (params) {
        if (params.w !== undefined) width.value = Number(params.w)
        if (params.h !== undefined) height.value = Number(params.h)
        if (params.k !== undefined) kerfHeight.value = Number(params.k)
        if (params.d !== undefined) dashCount.value = Number(params.d)
        if (params.g !== undefined) gapLength.value = Number(params.g)
        if (params.l !== undefined) lineSpacing.value = Number(params.l)
        if (params.u !== undefined) unit.value = String(params.u)
        if (params.s !== undefined) baseStroke.value = Number(params.s)
      }

      router.replace({ query: {} })
    }
  })

  const copyUrl = async () => {
    try {
      const hash = encodeParams()
      const url = new URL(window.location.href)
      url.searchParams.set('c', hash)
      await navigator.clipboard.writeText(url.toString())
      return true
    } catch (error) {
      console.error('Failed to copy URL:', error)
      return false
    }
  }

  return {
    copyUrl,
  }
}
