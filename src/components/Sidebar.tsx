import { FC } from "react"
import styled from "styled-components"

const BASE_URL = import.meta.env.BASE_URL

export const Sidebar: FC = () => {
  return (
    <>
      <Container2>
        <SidebarTopImage src={`${BASE_URL}sidebar-top.svg`} />
        <SidebarMiddleImage src={`${BASE_URL}sidebar-middle.svg`} />
        <SidebarBottomImage src={`${BASE_URL}sidebar-bottom.svg`} />
      </Container2>
      <Container>
        <SidebarTopImage2 src={`${BASE_URL}sidebar-top.svg`} />
        <SidebarMiddleImage src={`${BASE_URL}sidebar-middle.svg`} />
        <SidebarBottomImage2 src={`${BASE_URL}sidebar-bottom.svg`} />
      </Container>
    </>
  )
}

const SidebarTopImage2 = styled.img`
  width: 100%;
  filter: blur(7px) contrast(5) saturate(0.4) brightness(0.8);
  mask-image: url("${BASE_URL}sidebar-top.svg");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
`

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

const SidebarBottomImage2 = styled.img`
  width: 100%;
  filter: blur(7px) contrast(5) saturate(0.4) brightness(0.8);
  mask-image: url("${BASE_URL}sidebar-bottom.svg");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-position: center center;
  mask-position: center center;
`

const Container = styled.div`
  z-index: 1;
  padding: 24px;
  display: flex;
  flex-direction: column; /* Or row, depending on stacking */
  align-items: center; /* Aligns items horizontally */
  justify-content: center; /* Aligns items vertically */
  top: 0;
  position: absolute;
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

const Container2 = styled(Container)`
  filter: brightness(0.95);
`
