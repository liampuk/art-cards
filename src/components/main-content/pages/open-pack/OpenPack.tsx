import gsap from "gsap"
import { FC, useRef, useState } from "react"
import styled from "styled-components"
import { PackState } from "../../../../types"
import { Button } from "../hero-page/Button"
import { Packaging } from "./Packaging"

export const OpenPack: FC = () => {
  const [packState, setPackState] = useState<PackState>("closed")
  const packagingARef = useRef<HTMLImageElement>(null)
  const packagingBRef = useRef<HTMLImageElement>(null)
  const packagingCRef = useRef<HTMLImageElement>(null)
  const triggeredRef = useRef(false)

  const accentText =
    packState === "open"
      ? "Click to reveal your rare card"
      : "Click on the sticker to open a pack"

  if (packState === "opening") {
    if (!triggeredRef.current) {
      triggeredRef.current = true
      gsap.to(packagingARef.current, {
        duration: 1,
        x: -50,
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
      <img src="accent-top.svg" />
      <Title>Open Pack</Title>
      <TitleSection>
        <Text>
          Open packs to build your art collection. There are 4 cards per pack,
          including one rare. You can open two packs per day! This website is
          free but if you’d like to say thanks, please do so here{" "}
          <Arrow>➚</Arrow>
        </Text>
        <TipButtonContainer href="https://ko-fi.com/liampuk" target="_blank">
          <Button label="Support on Ko-fi" size={24} />
        </TipButtonContainer>
      </TitleSection>
      <PackagingA src="art-nouveau-packaging.png" ref={packagingARef} />
      <PackagingB src="art-deco-packaging.png" ref={packagingBRef} />
      <PackagingC src="impressionism-packaging.png" ref={packagingCRef} />
      <PackagingContainer>
        <Packaging setPackState={setPackState} />
      </PackagingContainer>
      <AccentBottomContainer>
        {/* <AccentText>Click to open another pack</AccentText> */}
        <AccentText>{accentText}</AccentText>
        <AccentBottom src="accent-bottom.svg" />
      </AccentBottomContainer>
    </Container>
  )
}

const ExtraPack = styled.img`
  position: absolute;
  width: 14vw;
  filter: saturate(0.2);
  cursor: not-allowed;
`

const PackagingA = styled(ExtraPack)`
  top: 32vh;
  left: 17vw;
  rotate: 10deg;
`

const PackagingB = styled(ExtraPack)`
  top: 51vh;
  left: 28vw;
  rotate: 18deg;
`

const PackagingC = styled(ExtraPack)`
  top: 48vh;
  left: 6vw;
  rotate: -10deg;
`

const AccentBottomContainer = styled.div`
  position: absolute;
  bottom: 60px;
  right: 9vw;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AccentText = styled.p`
  font-family: "Mucha";
  font-weight: 100;
  margin: 0;
  margin-top: -10px;
`

const AccentBottom = styled.img`
  width: 100%;
  margin-top: -14px;
`

const Container = styled.div`
  width: calc(100vw - 424px);
  height: 100vh;
  padding: 80px;
  position: relative;
  overflow: hidden;
`

const PackagingContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
  z-index: 2;
`

const TitleSection = styled.div`
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

const Title = styled.h1`
  font-size: 48px;
  font-family: Mucha;
  font-weight: 100;
  color: #222;
  margin-left: 70px;
  margin-top: -28px;
  margin-bottom: 0;
`

const Text = styled.p`
  font-size: 20px;
  font-family: "EB Garamond";
  color: #222;
  width: 90%;
  margin-top: 8px;
`
