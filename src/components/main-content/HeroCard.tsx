import { FC, RefObject } from "react"
import styled from "styled-components"
import { MotionCard } from "../card/MotionCard"

export const HeroCard: FC<{
  cardRef: RefObject<HTMLDivElement>
  rotateX: number | null
  rotateY: number | null
  bgX: number | null
  bgY: number | null
}> = ({ cardRef, rotateX, rotateY, bgX, bgY }) => {
  return (
    <Container ref={cardRef}>
      <MotionCard
        cardImage="rossetti/proserpine"
        cardImageMask="rossetti/proserpine-mask"
        shineType="lines"
        externalRotateX={rotateX}
        externalRotateY={rotateY}
        externalBgX={bgX}
        externalBgY={bgY}
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 200px;
  right: 150px;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.5); */
`
