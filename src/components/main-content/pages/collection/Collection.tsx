import { FC } from "react"
import styled from "styled-components"
import { TitleSection } from "../TitleSection"

export const Collection: FC = () => {
  return (
    <Container>
      <TitleSection title="Collection">
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
  width: calc(100vw - 22vw - 24px);
  height: 100vh;
  padding: 80px;
  position: relative;
  overflow: hidden;
`

const Text = styled.p`
  font-size: 20px;
  font-family: "EB Garamond";
  color: #222;
  margin-top: 8px;
`
