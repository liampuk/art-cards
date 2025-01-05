import { FC } from "react"
import styled from "styled-components"

export const PageNumber: FC = () => {
  return (
    <Container>
      <PageNumberText>③</PageNumberText>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: calc(100vw - 22vw);
  bottom: 5vh;
  display: flex;
  justify-content: center;
`

const PageNumberText = styled.p`
  font-size: 20px;
`
