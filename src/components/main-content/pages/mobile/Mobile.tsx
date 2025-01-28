import { useState } from "react"
import styled from "styled-components"
import { cardsListFull } from "../../../../cardsList"
import { Card } from "../../../../types"
import { MotionCardMobile } from "../../../card/MotionCardMobile"
import { Button } from "../hero-page/Button"

const BASE_URL = import.meta.env.BASE_URL

export const Mobile = () => {
  const [card, setCard] = useState<Card>({
    image: "proserpine-m",
    mask: "proserpine-mask",
    effect: "lines",
    artist: "rossetti",
  })

  const randomiseCard = () => {
    setCard(
      cardsListFull.filter((card) => card.effect === "lines")[
        Math.floor(
          Math.random() *
            cardsListFull.filter((card) => card.effect === "lines").length
        )
      ]
    )
  }

  return (
    <Container>
      <Row>
        <Title>Gallery Quest</Title>
        <Text>Tap the card to view in 3D. See more on desktop!</Text>
      </Row>
      <div>
        <MotionCardMobile
          cardImage={`${card.artist}/${card.image}`}
          cardImageMask={`${card.mask}`}
          shineType={card.effect}
          externalCardWidth="280px"
        />
      </div>
      <Row>
        <ButtonContainer onClick={randomiseCard}>
          <Button label="Random Card" width="200px" size="20px" />
        </ButtonContainer>
      </Row>
    </Container>
  )
}

const ButtonContainer = styled.div`
  position: relative;
`

const Title = styled.h1`
  font-family: "Mucha";
  font-weight: 100;
  margin: 0;
  margin-top: 8px;
  font-size: 36px;
`

const Text = styled.p`
  font-size: 18px;
  font-family: "EB Garamond";
  color: #222;
  margin: 0;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 0;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &::before {
    content: "";
    position: fixed;
    pointer-events: none;

    width: calc(100vw - 6vw);
    height: calc(100% - 6vw);
    top: 0;
    left: 0;
    border: 3vw solid #e8e2d0;
    z-index: 4;
  }

  &::after {
    content: "";
    position: fixed;
    pointer-events: none;

    width: calc(100vw - 6vw);
    height: calc(100% - 6vw);
    top: 3vw;
    left: 3vw;
    border-image-slice: 200;
    border-image-width: 100px;
    border-image-repeat: stretch stretch;
    border-image-source: url("${BASE_URL}main-border2.svg");
    border-style: solid;
    border-width: 1px;
    z-index: 4;
  }
`
