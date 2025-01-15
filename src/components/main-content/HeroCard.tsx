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
    <Centering>
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
    </Centering>
  )
}

const Container = styled.div`
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.5); */
  pointer-events: all;
`

const Centering = styled.div`
  position: sticky;
  width: fit-content;
  height: fit-content;
  top: 50%;
  transform: translateY(-50%);
`
