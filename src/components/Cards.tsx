import { FC } from "react"
import styled from "styled-components"
import { MotionCard } from "./MotionCard"

export const Cards: FC = () => {
  return (
    <Container>
      <MotionCard
        cardImage="joan-of-arc-2"
        cardImageMask="joan-of-arc-2-mask"
        shineType="lines"
      />
      <MotionCard
        cardImage="mariana"
        cardImageMask="mariana-mask"
        shineType="galaxy"
      />
      <MotionCard
        cardImage="the-day-dream"
        cardImageMask="the-day-dream-mask"
        shineType="diagonal"
      />
      <MotionCard
        cardImage="joan-of-arc"
        cardImageMask="joan-of-arc-mask"
        shineType="diagonal"
      />
      <MotionCard cardImage="gathering-almond-blossoms" shineType="diagonal" />
    </Container>
  )
}

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  margin-left: 20vw;
`
