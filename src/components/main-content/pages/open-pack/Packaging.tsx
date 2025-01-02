import { FC } from "react"
import styled from "styled-components"

export const Packaging: FC = () => {
  return (
    <Container>
      <PackagingImage src="packaging.png" />
      <Card src="back.jpg" />
      <PackagingImage src="packaging.png" />
      <PackagingFlap src="packaging-flap-down2.png" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
`

const PackagingImage = styled.img`
  top: 0;
  width: 20vw;
  position: absolute;
  border-radius: 8px;
`

const Card = styled.img`
  top: 0;
  width: 19.5vw;
  margin-left: 0.25vw;
  margin-top: 4px;
  position: absolute;
  border-radius: 8px;
`

const PackagingFlap = styled.img`
  top: 0;
  width: 20vw;
  position: absolute;
`
