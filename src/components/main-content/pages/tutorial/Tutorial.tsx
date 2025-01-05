import { FC } from "react"
import styled from "styled-components"
import { TitleSection } from "../TitleSection"

export const Tutorial: FC = () => {
  return (
    <Container>
      <TitleSection title="Tutorial">
        <Text>
          Coming soon. For now if you have any questions please contact me!{" "}
          <TextLink href="mailto:liampuk@gmail.com">liampuk@gmail.com</TextLink>
        </Text>
      </TitleSection>
    </Container>
  )
}

const Container = styled.div`
  width: calc(100vw - 22vw - 24px);
  height: 100vh;
  padding: 4vw;
  position: relative;
  overflow: hidden;
`

const Text = styled.p`
  font-size: 1.3vw;
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
