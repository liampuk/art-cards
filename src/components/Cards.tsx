import { FC, useEffect, useRef } from "react"
import styled from "styled-components"
import { cardsList } from "../cardsList"
import { useScrollContext } from "../ScrollProvider"
import { Card } from "../types"
import { MotionCard } from "./MotionCard"

export const Cards: FC = () => {
  const { updateScrollPosition } = useScrollContext()

  const divRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (divRef.current) {
      updateScrollPosition(divRef.current.scrollTop)
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [updateScrollPosition])

  return (
    <Container ref={divRef}>
      {cardsList.map((card: Card, index: number) => (
        <MotionCard
          key={`${card.image}-${index}`}
          cardImage={`${card.artist}/${card.image}`}
          cardImageMask={card.mask ? `${card.artist}/${card.mask}` : undefined}
          shineType={card.effect}
        />
      ))}
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
