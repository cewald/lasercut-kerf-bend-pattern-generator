export const useUrlSync = () => {
  const { width, height, kerfHeight, dashCount, gapLength, lineSpacing, unit } = useDimensions()
  const { baseStroke } = useViewbox()

  const route = useRoute()
  const router = useRouter()

  const paramHash = computed(() => {
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
  })

  const shareUrl = computed(() => {
    if (!window) return ''
    const hash = paramHash.value
    const url = new URL(window?.location?.href)
    url.searchParams.set('c', hash)
    return url.toString()
  })

  const decodeParams = (hash: string) => {
    try {
      if (!hash) return null
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

  return {
    paramHash,
    shareUrl,
  }
}
