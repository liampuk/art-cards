import { FC } from "react"
import styled from "styled-components"

export const Collection: FC = () => {
  return (
    <Container>
      <img src="accent-top.svg" />
      <Title>Collection</Title>
      <TitleSection>
        <Text>
          Explore your art collection. Click on a card for an expanded view.
          Your collection is stored locally, to save it or share between devices
          scroll to the bottom for a unique link.
        </Text>
      </TitleSection>
    </Container>
  )
}

const Container = styled.div`
  width: calc(100vw - 424px);
  height: 100vh;
  padding: 80px;
  position: relative;
  overflow: hidden;
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
  margin-top: 8px;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
`
