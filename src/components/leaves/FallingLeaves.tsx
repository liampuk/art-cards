import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { useWindowSize } from "../../hooks/general"
import { Leaf } from "../../types"
import { useScrollContext } from "../ScrollProvider"

export const FallingLeaves: FC = () => {
  const { scrollPosition } = useScrollContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const image = new Image()
  image.src = "leaf2.png"
  const leaves = useRef<Leaf[]>([])
  const canvasWidth = 1000
  const { height } = useWindowSize()

  const animationFrameRef = useRef<number | null>(null)

  const createLeaf = () => {
    leaves.current.push({
      x: 100 + Math.random() * (canvasWidth - 200),
      y: 200 + Math.random() * 600,
      rotate: Math.random() * 360,
      rnd: Math.random(),
      size: 80 + Math.random() * 30,
      fadeIn: 0,
    })
  }

  useEffect(() => {
    if (scrollPosition === 0) {
      Array.from({ length: 10 }).forEach(() => createLeaf())
    } else if (scrollPosition < height / 2) {
      const rng = Math.random()
      if (rng > 0.5) {
        createLeaf()
      }
    }
  }, [scrollPosition])

  const draw = (ctx: CanvasRenderingContext2D, step: number) => {
    const canvas = ctx.canvas
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    leaves.current = leaves.current.map((leaf) => {
      leaf.y += 1 + leaf.rnd
      leaf.x += Math.sin(leaf.y / 50) / 2
      leaf.rotate = 1.5 * leaf.rnd - Math.sin(leaf.y / 50)
      if (leaf.fadeIn < 1) {
        leaf.fadeIn += 0.1
      }
      return leaf
    })

    leaves.current.forEach((leaf) => {
      ctx.save()
      ctx.translate(leaf.x, leaf.y)
      ctx.rotate(leaf.rotate)
      ctx.globalAlpha = leaf.rnd * leaf.fadeIn
      ctx.drawImage(image, -leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size)

      ctx.restore()
    })

    animationFrameRef.current = window.requestAnimationFrame((_t) =>
      draw(ctx, step + 1)
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // ctx.globalCompositeOperation = "multiply"
        animationFrameRef.current = window.requestAnimationFrame((_t) =>
          draw(ctx, 0)
        )
      }
    }

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <Container
      style={{
        top: `${(-Math.pow(scrollPosition / height, 2) * height) / 3}px`,
        // top: `${-scrollPosition}px`,
        // opacity: 0.5 - Math.pow(scrollPosition / height, 2) * 0.5,
      }}
    >
      <canvas ref={canvasRef} width={canvasWidth} height={height * 2} />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  right: 0;
  width: 1000px;
  height: 180vh;
  /* background-color: green; */
  /* mix-blend-mode: multiply; */
  filter: blur(10px);
  opacity: 0.18;
  mask-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 25%,
    rgba(0, 0, 0, 0) 75%
  );
`
