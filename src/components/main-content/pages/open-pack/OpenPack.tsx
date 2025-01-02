import { FC } from "react"
import styled from "styled-components"
import { Button } from "../hero-page/Button"
import { Packaging } from "./Packaging"

export const OpenPack: FC = () => {
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
      <Packaging />
    </Container>
  )
}

const Container = styled.div`
  width: calc(100vw - 424px);
  height: 100vh;
  padding: 100px;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
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
  margin-top: -24px;
  margin-bottom: 0;
`

const Text = styled.p`
  font-size: 22px;
  font-family: "EB Garamond";
  color: #222;
  width: 90%;
  margin-top: 12px;
`
