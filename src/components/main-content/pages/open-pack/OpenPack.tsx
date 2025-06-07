import gsap from "gsap"
import { FC, memo, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PackState } from "../../../../types"
import { Button } from "../hero-page/Button"
import { TitleSection } from "../TitleSection"
import { Packaging } from "./Packaging"
import { useCardStore } from "../../../../store/cardStore"

export const OpenPack: FC = memo(() => {
  const { packsRemaining } = useCardStore()
  const [packState, setPackState] = useState<PackState>("closed")
  const packagingARef = useRef<HTMLImageElement>(null)
  const packagingBRef = useRef<HTMLImageElement>(null)
  const packagingCRef = useRef<HTMLImageElement>(null)
  const triggeredRef = useRef(false)
  const [cardClickCount, setCardClickCount] = useState(0)
  const [packsRemainingLabel, setPacksRemainingLabel] = useState(packsRemaining)

  useEffect(() => {
    if (packState === "closed") {
      setPacksRemainingLabel(packsRemaining)
    }
  }, [packsRemaining])

  const clickAction = () => {
    setCardClickCount((count) => count + 1)
  }

  if (cardClickCount >= 2) {
    setCardClickCount(0)
    setPackState("resetting")
    setTimeout(() => {
      setPacksRemainingLabel(packsRemaining)
    }, 500)
    triggeredRef.current = false
    gsap.fromTo(
      packagingARef.current,
      {
        x: -50,
        y: -50,
        opacity: 0,
      },
      {
        duration: 1,
        x: 0,
        y: 0,
        opacity: 1,
        delay: 1.5,
      }
    )
    gsap.fromTo(
      packagingBRef.current,
      {
        x: 50,
        y: 50,
        opacity: 0,
      },
      {
        duration: 1,
        x: 0,
        y: 0,
        opacity: 1,
        delay: 1.5,
      }
    )
    gsap.fromTo(
      packagingCRef.current,
      {
        x: -50,
        y: 50,
        opacity: 0,
      },
      {
        duration: 1,
        x: 0,
        y: 0,
        opacity: 1,
        delay: 1.5,
      }
    )
  }

  const accentText = () => {
    if (packsRemainingLabel === 0) {
      return "No packs left, come back tomorrow!"
    } else if (cardClickCount === 1) {
      return "Click to open another pack"
    } else if (packState === "open") {
      return "Click to reveal your rare card"
    }
    return "Click on the sticker to open a pack"
  }

  if (packState === "opening") {
    if (!triggeredRef.current) {
      triggeredRef.current = true
      gsap.to(packagingARef.current, {
        duration: 1,
        x: 50,
        y: -50,
        opacity: 0,
      })
      gsap.to(packagingBRef.current, {
        duration: 1,
        x: 50,
        y: 50,
        opacity: 0,
      })
      gsap.to(packagingCRef.current, {
        duration: 1,
        x: -50,
        y: 50,
        opacity: 0,
      })
    }
  }

  return (
    <Container>
      <TitleSection title="Open a pack">
        <SubTitle>
          <Text>
            Open packs to build your art collection. There are 4 cards per pack,
            including one rare. You can open three packs per day! This website
            is free but if you’d like to support it, please do so here{" "}
            <Arrow>➚</Arrow>
          </Text>
          <TipButtonContainer href="https://ko-fi.com/liampuk" target="_blank">
            <Button label="Support on Ko-fi" size="1.4vw" />
          </TipButtonContainer>
        </SubTitle>
      </TitleSection>
      <PackagingA src="art-nouveau-packaging-s.png" ref={packagingARef} />
      <PackagingB src="art-deco-packaging-s.png" ref={packagingBRef} />
      <PackagingC src="impressionism-packaging-s.png" ref={packagingCRef} />
      <PackagingContainer>
        <Packaging
          packState={packState}
          setPackState={setPackState}
          clickAction={clickAction}
          disabled={packsRemainingLabel === 0}
        />

        <PacksRemainingContainer
          style={{ opacity: packState === "closed" ? 1 : 0 }}
        >
          <PacksRemaining src="packs-remaining-small.jpg" />
          <RemainingCount>{packsRemainingLabel}</RemainingCount>
        </PacksRemainingContainer>
      </PackagingContainer>
      <AccentBottomContainer>
        <AccentText>{accentText()}</AccentText>
        <AccentBottom src="accent-bottom.svg" />
      </AccentBottomContainer>
    </Container>
  )
})

const PacksRemaining = styled.img`
  height: 9vh;
  border-radius: 2px;
`

const PacksRemainingContainer = styled.div`
  margin-right: 2.5vw;
  margin-top: 2.5vh;
  transition: opacity 0.5s;
  align-self: start;
  width: fit-content;
  height: fit-content;
  position: relative;
  transition: opacity 0.5s;
`

const RemainingCount = styled.p`
  font-family: "Mucha";
  font-size: 6vh;
  color: #e8e2d0;
  position: absolute;
  bottom: -5vh;
  right: 2.1vh;
  width: 5vh;
  text-align: center;
`

const ExtraPack = styled.img`
  position: absolute;
  width: 14vw;
  filter: saturate(0.2);
  cursor: not-allowed;
  height: 20vw;
  width: auto;
`

const PackagingA = styled(ExtraPack)`
  top: 37vh;
  left: 17vw;
  rotate: 10deg;
`

const PackagingB = styled(ExtraPack)`
  top: 53vh;
  left: 28vw;
  rotate: 18deg;
`

const PackagingC = styled(ExtraPack)`
  top: 50vh;
  left: 6vw;
  rotate: -10deg;
`

const AccentBottomContainer = styled.div`
  position: absolute;
  bottom: 6vh;
  right: 8vw;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AccentText = styled.p`
  font-family: "Mucha";
  font-size: 0.9vw;
  font-weight: 100;
  margin: 0;
  margin-top: -10px;
`

const AccentBottom = styled.img`
  width: 100%;
  margin-top: -14px;
`

const Container = styled.div`
  width: calc(100vw - 22vw - 24px);
  height: 100%;
  padding: 4vw;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const PackagingContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  z-index: 2;
  position: relative;
  height: 100%;
  align-items: center;
  pointer-events: none;
`

const SubTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`

const Arrow = styled.span`
  margin-top: 2px;
  margin-left: 2px;
  display: inline-block;

  animation: wobble 2s infinite;
  animation-timing-function: ease-out;

  @keyframes wobble {
    0% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(25deg);
    }
    100% {
      transform: rotate(5deg);
    }
  }
`

const TipButtonContainer = styled.a`
  position: relative;
`

const Text = styled.p`
  font-size: 2.2vh;
  font-family: "EB Garamond";
  color: #222;
  width: 90%;
  margin-top: 8px;
`
