import { FC, memo } from "react"
import styled from "styled-components"
import { TitleSection } from "../TitleSection"

export const Tutorial: FC = memo(() => {
  return (
    <Container>
      <TitleSection title="About">
        <Text>
          This website demonstrates the possibilities of using HDR effects on
          the web. HDR is not widely supported, and the combination of HDR and
          lots of layers used in the shine animations can be very slow on some
          devices. I'm still working on adding features so for now you can open
          as many packs as you like and explore the whole pre-raphaellite
          collection!
        </Text>
        <Text>
          Tutorial coming soon - If you have any questions please contact me!{" "}
          <TextLink href="mailto:liampuk@gmail.com">liampuk@gmail.com</TextLink>
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
