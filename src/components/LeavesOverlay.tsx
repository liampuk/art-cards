import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { useWindowSize } from "../hooks/general"

export const LeavesOverlay: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [documentWidth, documentHeight] = useWindowSize()
  const pixelRatio = window.devicePixelRatio
  const documentWidthPixel = documentWidth * pixelRatio
  const documentHeightPixel = documentHeight * pixelRatio

  const setUpCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      const width = documentWidthPixel
      const height = documentHeightPixel
      canvas.width = width
      canvas.height = height

      // ctx.rect(0, 0, width, height)
      // ctx.fillStyle = "red"
      // ctx.fill()

      ctx.fillStyle = "rgba(0,0,0,0.1)"
      // ctx.fillStyle = "black"

      // for (let i = 0; i < 10; i++) {
      //   ctx.beginPath()
      //   ctx.arc(
      //     width - (500 * Math.random() + 200),
      //     500 * Math.random() + 300,
      //     100,
      //     0,
      //     2 * Math.PI
      //   )
      //   ctx.fill()
      //   ctx.closePath()
      // }

      for (let i = 0; i < 60; i++) {
        ctx.beginPath()
        ctx.arc(
          (width / 2) * Math.random() + width / 2,
          (height / 1.5) * Math.random(),
          Math.random() * 50 + 50,
          0,
          2 * Math.PI
        )
        ctx.fill()
        ctx.closePath()
      }
    }
  }

  useEffect(() => {
    setUpCanvas()
  }, [])

  return (
    <Container>
      <Canvas ref={canvasRef} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  pointer-events: none;
  isolation: isolate;
  backdrop-filter: none;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  /* opacity: 0.15; */
  filter: blur(10px);
`
