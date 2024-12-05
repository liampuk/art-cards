import { FC } from "react"
import styled from "styled-components"

export const Sidebar: FC = () => {
  return (
    <Container>
      {/* <h1>Art Cards</h1> */}
      {/* <ExLibris src="/block.jpg" /> */}
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 23vw;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  left: 0;

  border-image-slice: 316.5 321 316.5 321;
  border-image-width: 400px;
  border-image-outset: 0px 0px 0px 0px;
  border-image-repeat: stretch stretch;
  border-image-source: url("border3.svg");
  border-style: solid;

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

const ExLibris = styled.img`
  width: 100%;
`
