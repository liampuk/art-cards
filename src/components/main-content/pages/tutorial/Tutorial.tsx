import { FC, memo } from "react"
import styled from "styled-components"
import { TitleSection } from "../TitleSection"

export const Tutorial: FC = memo(() => {
  return (
    <Container>
      <TitleSection title="About">
        <Text>
          I made this website to explore using Art Nouveau design on the web. I
          also wanted to see how HDR can be used to enhance experiences. I'm
          planning on putting together some tutorials for the techniques I used,
          check back here soon for an update!
        </Text>
        <Text>
          - If you have any questions please contact me!
          <TextLink href="mailto:liampuk@gmail.com">liampuk@gmail.com</TextLink>
        </Text>
        <Text>
          - Find more of my work here:
          <TextLink href="https://liamp.uk">liamp.uk</TextLink>
        </Text>
      </TitleSection>
    </Container>
  )
})

const Container = styled.div`
  width: calc(100vw - 22vw - 24px);
  height: 100vh;
  padding: 4vw;
  position: relative;
  overflow: hidden;
`

const Text = styled.p`
  font-size: 2.2vh;
  font-family: "EB Garamond";
  color: #222;
  margin-top: 8px;
`

const TextLink = styled.a`
  color: #222;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 8px;
`
