import styled from "styled-components"
import { Cards } from "./components/Cards"
import { GrainOverlay } from "./components/Grain"
import { LeavesOverlay } from "./components/LeavesOverlay"
import { Sidebar } from "./components/Sidebar"

function App() {
  return (
    <Container>
      <Sidebar />
      <Cards />
      <GrainOverlay />
      <LeavesOverlay />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

export default App
