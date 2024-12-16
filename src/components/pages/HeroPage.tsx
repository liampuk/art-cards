import { FC } from "react"
import styled from "styled-components"
import { Button } from "../Button"
import { MotionCard } from "../MotionCard"

export const HeroPage: FC = () => {
  return (
    <Container>
      <div>
        <HeroImage src="hero4.jpg" />
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
  top: 550px;
  left: 360px;
`

const HeroImage = styled.img`
  mix-blend-mode: darken;
  height: 500px;
  margin-left: 150px;
`
