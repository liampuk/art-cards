import { FC } from "react"
import styled from "styled-components"

const BASE_URL = import.meta.env.BASE_URL

export const Sidebar: FC = () => {
  return (
    <Container>
      <SidebarTopImage src={`${BASE_URL}sidebar-top.svg`} />
      <SidebarMiddleImage src={`${BASE_URL}sidebar-middle.svg`} />
      <SidebarBottomImage src={`${BASE_URL}sidebar-bottom.svg`} />
    </Container>
  )
}

const SidebarTopImage = styled.img`
  width: 100%;
`

const SidebarMiddleImage = styled.img`
  width: 100%;
  flex: 1;
`

const SidebarBottomImage = styled.img`
  width: 100%;
`

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column; /* Or row, depending on stacking */
  align-items: center; /* Aligns items horizontally */
  justify-content: center; /* Aligns items vertically */
  top: 0;
  position: fixed;
  height: 100%;
  width: 400px;

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
