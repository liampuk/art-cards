import gsap from "gsap"
import { FC, memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { cardsListFull } from "../../../../cardsList"
import { useScrollStore } from "../../../../store"
import { MotionCard } from "../../../card/MotionCard"

type Props = {
  index: number
}

const calculateCardWidth = (windowWidth: number) => {
  return `${(windowWidth - 0.22 * windowWidth - 0.08 * windowWidth) / 5 - 32}px`
}

export const CollectionCard: FC<Props> = memo(({ index }) => {
  const [cardFocussed, setCardFocussed] = useState(false)
  const lenis = useScrollStore((state) => state.lenis)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardWidth, setCardWidth] = useState(
    calculateCardWidth(window.innerWidth)
  )

  const handleResize = () => {
    setCardWidth(calculateCardWidth(window.innerWidth))
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const card = cardsListFull[index]

  const handleClick = () => {
    // 348 / 485
    if (cardRef.current) {
      if (cardFocussed) {
        lenis?.start()
        setCardFocussed(false)
        gsap.to(cardRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.5,
          zIndex: 1,
          ease: "power2.out",
        })
      } else {
        lenis?.stop()
        setCardFocussed(true)
        const rect = cardRef.current.getBoundingClientRect()
        const centerX = (window.innerWidth / 2 - rect.width / 2) * 1.22
        const centerY = window.innerHeight / 2 - rect.height / 2

        const x = centerX - rect.left
        const y = centerY - rect.top

        gsap.to(cardRef.current, {
          x: x,
          y: y,
          duration: 0.5,
          zIndex: 6,
        })
      }
    }
  }

  return (
    <>
      <Barrier
        style={{ display: cardFocussed ? "block" : "none" }}
        onClick={handleClick}
      />
      <BlankCard key={`blank-card-${index}`}>
        {String(index + 1).padStart(3, "0")}
        <CardContainer onClick={handleClick} ref={cardRef}>
          <MotionCard
            cardImage={`${card.artist}/${card.image}-m`}
            cardImageMask={card.mask && `${card.artist}/${card.mask}`}
            shineType={card?.effect}
            externalCardWidth={cardFocussed ? "25vw" : cardWidth}
            disableClick
          />
        </CardContainer>
      </BlankCard>
    </>
  )
})

const Barrier = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
`

const CardContainer = styled.div`
  position: absolute;
  z-index: 1;
`

const BlankCard = styled.div`
  height: auto;
  aspect-ratio: 348 / 485;

  /* box-shadow: inset 0 0 5vw rgba(0, 0, 0, 0.2); */

  outline-offset: -8px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Mucha";
  font-size: 1.5vw;
  color: #444;
  user-select: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    border-radius: 8px;
    border: 2px solid rgba(0, 0, 0, 0.5);
  }
`
