import { FC } from "react"
import styled from "styled-components"
import { Button } from "../Button"
import { MotionCard } from "../MotionCard"

export const HeroPage: FC = () => {
  return (
    <Container>
      <div>
        <HeroImage src="hero7.jpg" />
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
  top: 58vh;
  left: 21vw;
`

const HeroImage = styled.img`
  mix-blend-mode: darken;
  height: 60vh;
  margin-left: 8vw;
`
