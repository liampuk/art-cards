import { FC, RefObject } from "react"
import styled from "styled-components"
import { MotionCard } from "../card/MotionCard"

export const HeroCard: FC<{
  cardRef: RefObject<HTMLDivElement>
  rotateX: number | null
  rotateY: number | null
  bgX: number | null
  bgY: number | null
  scale: number | null
}> = ({ cardRef, rotateX, rotateY, bgX, bgY, scale }) => {
  return (
    <Container ref={cardRef}>
      <MotionCard
        cardImage="rossetti/proserpine-m"
        cardImageMask="rossetti/proserpine-mask"
        shineType="lines"
        externalRotateX={rotateX}
        externalRotateY={rotateY}
        externalBgX={bgX}
        externalBgY={bgY}
        externalScale={scale}
      />
    </Container>
  )
}

const Container = styled.div`
  position: sticky;
  top: 20vh;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.5); */
  pointer-events: all;
`
