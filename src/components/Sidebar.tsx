import { FC } from "react"
import styled from "styled-components"

export const Sidebar: FC = () => {
  return (
    <Container>
      <SidebarTopImage src="border.svg" />
      <SidebarMiddleImage src="middle.svg" />
      <SidebarBottomImage src="border.svg" />
    </Container>
  )
}

const SidebarTopImage = styled.img`
  height: 30%;
  object-fit: cover;
  object-position: top;
`

const SidebarMiddleImage = styled.img`
  object-fit: fill;
  flex: 1;
  width: 100%;
`

const SidebarBottomImage = styled.img`
  height: 30%;
  object-fit: cover;
  object-position: bottom;
`

const Container = styled.div`
  position: fixed;
  width: 23vw;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  left: 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    font-family: "Amarante", serif;
    font-weight: 400;
    font-style: normal;
    margin: 0;
  }
`
