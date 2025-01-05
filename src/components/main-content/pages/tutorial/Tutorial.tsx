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

const TextLink = styled.a`
  color: #222;
  text-decoration: underline;
  font-weight: 600;
  margin-left: 8px;
`
