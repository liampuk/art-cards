import { FC, RefObject } from "react"
import styled from "styled-components"
import { MotionCard } from "../card/MotionCard"

export const HeroCard: FC<{
  cardRef: RefObject<HTMLDivElement>
}> = ({ cardRef }) => {
  return (
    <Container ref={cardRef}>
      <MotionCard
        cardImage="rossetti/proserpine"
        cardImageMask="rossetti/proserpine-mask"
        shineType="lines"
      />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 200px;
  right: 100px;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.5); */
`
