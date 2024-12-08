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
  left: 400px;
  width: calc(100vw - 400px - 52px);
  height: calc(100vh - 52px);
  top: 0;
  flex-direction: column;
  margin: 26px;
  overflow: scroll;
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::after {
    content: "";
    position: fixed;
    pointer-events: none;
    margin: 24px 0 0 0;

    width: calc(100vw - 400px - 48px);
    height: calc(100vh - 48px);
    top: 0;
    border-image-slice: 200;
    border-image-width: 180px;
    border-image-repeat: stretch stretch;
    border-image-source: url("main-border.svg");
    border-style: solid;
  }
`
