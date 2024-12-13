import styled from "styled-components"
import { Cards } from "./components/Cards"
import { Sidebar } from "./components/Sidebar"

const BASE_URL = import.meta.env.BASE_URL

function App() {
  return (
    <>
      <Container>
        <Sidebar />
        <Cards />
      </Container>
      <Grain />
    </>
  )
}

const Grain = styled.div`
  z-index: 1;
  pointer-events: none;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 300px;
  background-image: url("${BASE_URL}grain.webp");
  opacity: 0.8;
  mix-blend-mode: color-dodge;
`

const Container = styled.div`
  display: flex;
  background-repeat: repeat;
  width: 100vw;
  background-color: #e8e2d0;
`

export default App
