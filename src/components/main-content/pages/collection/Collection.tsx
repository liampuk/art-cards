import { FC, memo } from "react"
import styled from "styled-components"
import { TitleSection } from "../TitleSection"
import { Button } from "../hero-page/Button"
import { CollectionCard } from "./CollectionCard"

export const Collection: FC = memo(() => {
  return (
    <Container>
      <TitleSection title="Collection">
        <Text>
          Explore your art collection. Click on a card for an expanded view.
          Your collection is stored locally, to save it or share between devices
          scroll to the bottom for a unique link.
        </Text>
      </TitleSection>
      <PackHeader>
        <SideAccent src="side-accent.svg" $height="5vh" $margin="0 1vw" />
        <HeaderContent>
          <PackTitle>Pre-Raphaelite Pack</PackTitle>
          <PackCount>45/45</PackCount>
        </HeaderContent>
        <SideAccent src="side-accent.svg" $flip $height="5vh" $margin="0 1vw" />
      </PackHeader>
      <CollectionSection>
        {Array.from({ length: 45 }).map((_, i) => (
          <CollectionCard key={`collection-card-${i}`} index={i} />
        ))}
      </CollectionSection>
      <FooterSection>
        <SideAccent src="flower-accent.svg" $height="30vh" $margin="4px" />
        <FooterContentWrapper>
          <PackTitle>Save Collection</PackTitle>
          <FooterContent>
            <FooterText>
              <p>
                Your collection is stored locally. It will be deleted if you
                clear data in your browser. To save your collection or open it
                on a different device, scan the QR code or click the button to
                copy a unique link to your current collection.
              </p>
              <FooterButtonSection>
                <p>
                  To load your collection on a new device or if data is lost, go
                  to the saved url and click ‘accept’ to load your collection.
                </p>
                <ButtonContainer>
                  <Button label="Save Collection" />
                </ButtonContainer>
              </FooterButtonSection>
            </FooterText>
            <QrImage src="qr-placeholder.jpg" />
          </FooterContent>
        </FooterContentWrapper>
        <SideAccent
          src="flower-accent.svg"
          $height="30vh"
          $flip
          $margin="4px"
        />
      </FooterSection>
    </Container>
  )
})

const FooterButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`

const ButtonContainer = styled.div`
  position: relative;
`

const FooterText = styled.div`
  flex-grow: 1;
  margin-right: 32px;
  font-family: "EB Garamond";
  font-size: 1.2vw;

  p {
    margin: 12px 0;
  }
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
`

const QrImage = styled.img`
  height: 25vh;
  width: 25vh;
`

const FooterContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
`

const FooterSection = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: row;
`

const CollectionSection = styled.div`
  display: grid;

  grid-template-columns: repeat(5, calc((100vw - 22vw - 8vw) / 5 - 32px));
  grid-column-gap: 32px;
  grid-row-gap: 32px;
  margin-top: 32px;
`

const PackHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const PackCount = styled.p`
  margin: 0;
  margin-top: 4px;
  font-family: "Mucha";
  font-weight: 100;
  font-size: 1vw;
`

const PackTitle = styled.p`
  margin: 0;
  font-family: "Mucha";
  font-size: 1.7vw;
`
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const SideAccent = styled.img<{
  $flip?: boolean
  $height: string
  $margin?: string
}>`
  width: auto;
  height: ${(props) => props.$height};
  margin: ${(props) => props.$margin ?? "0"};
  transform: ${(props) => (props.$flip ? "scaleX(-1)" : "none")};
`

const Container = styled.div`
  width: calc(100vw - 22vw - 24px);
  padding: 4vw;
  position: relative;
`

const Text = styled.p`
  font-size: 1.3vw;
  font-family: "EB Garamond";
  color: #222;
  margin-top: 8px;
`
