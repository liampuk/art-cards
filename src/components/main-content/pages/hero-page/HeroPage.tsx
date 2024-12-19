import { FC } from "react"
import styled from "styled-components"
import { MotionCard } from "../../../card/MotionCard"
import { Button } from "./Button"

export const HeroPage: FC = () => {
  return (
    <Container>
      <div>
        <HeroImage src="hero11.jpg" />
        <AccountButtonContainer>
          <Button />
        </AccountButtonContainer>
      </div>
      <MotionCard
        cardImage="rossetti/proserpine"
        cardImageMask="rossetti/proserpine-mask"
        shineType="lines"
      />
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`

const AccountButtonContainer = styled.div`
  position: absolute;
  top: 60vh;
  left: 21vw;
`

const HeroImage = styled.img`
  height: 60vh;
  margin-left: 8vw;
`
