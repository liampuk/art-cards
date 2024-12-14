import { useLayoutEffect, useState } from "react"

//TODO return object
export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return size[0] > 0 && size[1] > 0 ? size : [window.innerWidth, window.innerHeight]
}

export const usePortrait = () => {
  const [width, height] = useWindowSize()
  return width < height
}
