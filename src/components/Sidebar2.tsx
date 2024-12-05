import { FC } from "react"
import styled from "styled-components"

export const Sidebar: FC = () => {
  return (
    <Container>
      <h1>Art Cards</h1>
      <ExLibrisContainer>
        <ExLibris src="/exlibris.jpeg" />
        <Overlay />
      </ExLibrisContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  width: 20vw;
  height: 100%;
  border-right: 1px solid #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 4px;
    border-right: 1px solid #fff;
  }

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

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      110deg,
      #c929f1,
      #0dbde9,
      #21e985,
      #eedf10,
      #f80e35,
      #c929f1,
      #0dbde9,
      #21e985,
      #eedf10,
      #f80e35,
      #c929f1,
      #0dbde9,
      #21e985,
      #eedf10,
      #f80e35
    ),
    repeating-linear-gradient(90deg, #000 0, #000 1px, #666 1px, #666 2px);
  top: 0;
  left: 0;
  mix-blend-mode: exclusion;
  position: absolute;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
        30deg,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35,
        #c929f1,
        #0dbde9,
        #21e985,
        #eedf10,
        #f80e35
      ),
      repeating-linear-gradient(90deg, #000 0, #000 1px, #666 1px, #666 2px);
    top: 0;
    left: 0;
    mix-blend-mode: darken;
    position: absolute;
    filter: blur(30px);
  }
`

const ExLibrisContainer = styled.div`
  position: relative;
`

const ExLibris = styled.img`
  width: 100%;
`
