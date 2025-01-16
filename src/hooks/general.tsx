import { useEffect, useLayoutEffect, useState } from "react"

export const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return size.width > 0 && size.height > 0
    ? size
    : { width: window.innerWidth, height: window.innerHeight }
}

export const usePortrait = () => {
  const { width, height } = useWindowSize()
  return width < height
}

export const useSmoothedValue = (value: number, alpha = 0.1) => {
  const [smoothedValue, setSmoothedValue] = useState(value)

  useEffect(() => {
    setSmoothedValue((prev) => prev + alpha * (value - prev))
  }, [value, alpha])

  return smoothedValue
}
